"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

type OrderDetails = {
  id: string;
  total: number;
  status: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: { name: string; imageEmoji: string };
  }[];
};

export default function SucessoPage() {
  return (
    <Suspense fallback={null}>
      <SucessoContent />
    </Suspense>
  );
}

function SucessoContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const isDemo = searchParams.get("demo") === "1";
  const clear = useCartStore((state) => state.clear);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.order ?? null))
      .catch(() => setOrder(null));
  }, [orderId]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-5xl">🎉</p>
      <h1 className="mt-4 text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
        Encomenda confirmada!
      </h1>
      <p className="mt-2 text-gray-600">
        Obrigado pela tua compra. Vais receber uma confirmação em breve.
      </p>

      {isDemo && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Modo demonstração: nenhum pagamento real foi processado. Configura a
          tua chave <code>STRIPE_SECRET_KEY</code> no ficheiro <code>.env</code>{" "}
          para ativar pagamentos reais.
        </p>
      )}

      {order && (
        <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-sm">
          <h2 className="mb-4 font-semibold text-[#241b3a]">
            Resumo da encomenda #{order.id.slice(-8)}
          </h2>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.product.imageEmoji} {item.product.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-bold text-[#241b3a]">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <Link
        href="/produtos"
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
      >
        Continuar a comprar
      </Link>
    </div>
  );
}
