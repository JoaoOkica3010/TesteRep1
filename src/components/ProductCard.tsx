import Link from "next/link";
import { ProductTile } from "./ProductTile";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageEmoji: string;
  imageColor: string;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/produto/${product.slug}`}>
        <ProductTile
          emoji={product.imageEmoji}
          color={product.imageColor}
          className="h-40 w-full text-5xl transition group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-semibold leading-snug text-[#241b3a] transition group-hover:text-fuchsia-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-[#241b3a]">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </div>
  );
}
