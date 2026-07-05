"use client";

import Link from "next/link";
import { cartCount, useCartStore } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const mounted = useHasMounted();

  const count = mounted ? cartCount(items) : 0;

  return (
    <Link
      href="/carrinho"
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg transition hover:bg-white/25"
      aria-label="Carrinho de compras"
    >
      🛒
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
