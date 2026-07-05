import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

type CheckoutRequestItem = {
  productId: string;
  quantity: number;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestedItems: CheckoutRequestItem[] = Array.isArray(body?.items)
    ? body.items
    : [];

  if (requestedItems.length === 0) {
    return NextResponse.json({ error: "O carrinho está vazio." }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: requestedItems.map((item) => item.productId) } },
  });

  const orderItemsData = requestedItems
    .map((requested) => {
      const product = products.find((p) => p.id === requested.productId);
      if (!product) return null;
      const quantity = Math.max(1, Math.min(99, Math.floor(requested.quantity)));
      return { product, quantity };
    })
    .filter((item): item is { product: (typeof products)[number]; quantity: number } => item !== null);

  if (orderItemsData.length === 0) {
    return NextResponse.json(
      { error: "Nenhum produto válido encontrado." },
      { status: 400 }
    );
  }

  const total = orderItemsData.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      total,
      status: "pending",
      items: {
        create: orderItemsData.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  const origin = request.nextUrl.origin;
  const stripe = getStripe();

  if (!stripe) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "paid" },
    });

    return NextResponse.json({
      url: `/sucesso?orderId=${order.id}&demo=1`,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: orderItemsData.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: item.product.price,
        product_data: { name: item.product.name },
      },
    })),
    success_url: `${origin}/sucesso?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancelado?orderId=${order.id}`,
    metadata: { orderId: order.id },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
