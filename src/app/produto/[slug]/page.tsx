import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductTile } from "@/components/ProductTile";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/produtos" className="hover:text-fuchsia-600">
          Produtos
        </Link>{" "}
        /{" "}
        <Link
          href={`/categoria/${product.category.slug}`}
          className="hover:text-fuchsia-600"
        >
          {product.category.name}
        </Link>{" "}
        / <span className="text-[#241b3a]">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductTile
          emoji={product.imageEmoji}
          color={product.imageColor}
          className="h-80 rounded-3xl text-8xl shadow-md"
        />

        <div>
          <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
            {product.category.icon} {product.category.name}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-[#241b3a]">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-6 text-3xl font-bold text-[#241b3a]">
            {formatPrice(product.price)}
          </p>

          <div className="mt-8 max-w-xs">
            <AddToCartButton product={product} />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            {product.stock > 0
              ? `Em stock — envio em 24h úteis.`
              : "Produto esgotado no momento."}
          </p>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-extrabold text-[#241b3a]">
            Também pode gostar
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
