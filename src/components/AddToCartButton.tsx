"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { ProductCardData } from "./ProductCard";

export function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
}: {
  product: ProductCardData;
  quantity?: number;
  compact?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageEmoji: product.imageEmoji,
        imageColor: product.imageColor,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241b3a] text-white transition hover:bg-fuchsia-600"
        aria-label={`Adicionar ${product.name} ao carrinho`}
      >
        {added ? "✓" : "+"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:opacity-90"
    >
      {added ? "Adicionado ao carrinho ✓" : "Adicionar ao carrinho"}
    </button>
  );
}
