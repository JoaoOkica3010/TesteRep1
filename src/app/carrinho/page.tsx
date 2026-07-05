"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cartTotal, useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { ProductTile } from "@/components/ProductTile";
import { useHasMounted } from "@/lib/use-has-mounted";

export default function CarrinhoPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const mounted = useHasMounted();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Não foi possível iniciar o pagamento.");
        setLoading(false);
        return;
      }

      router.push(data.url);
    } catch {
      setError("Ocorreu um erro de rede. Tenta novamente.");
      setLoading(false);
    }
  }

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-extrabold text-[#241b3a]">
          O teu carrinho está vazio
        </h1>
        <p className="mt-2 text-gray-600">
          Adiciona produtos ao carrinho para começares a tua compra.
        </p>
        <Link
          href="/produtos"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
        O teu carrinho
      </h1>

      <div className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-4">
            <ProductTile
              emoji={item.imageEmoji}
              color={item.imageColor}
              className="h-16 w-16 flex-none rounded-xl text-2xl"
            />
            <div className="flex-1">
              <Link
                href={`/produto/${item.slug}`}
                className="font-semibold text-[#241b3a] hover:text-fuchsia-600"
              >
                {item.name}
              </Link>
              <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <p className="w-24 flex-none text-right font-semibold text-[#241b3a]">
              {formatPrice(item.price * item.quantity)}
            </p>

            <button
              onClick={() => removeItem(item.productId)}
              className="flex-none text-gray-400 hover:text-red-500"
              aria-label="Remover item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-xl font-bold text-[#241b3a]">
          Total: {formatPrice(cartTotal(items))}
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "A processar..." : "Finalizar compra"}
        </button>
      </div>
    </div>
  );
}
