import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "Todos os Produtos | DiverStore",
};

export default async function ProdutosPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
        Todos os Produtos
      </h1>
      <p className="mt-2 text-gray-600">
        Explora o catálogo completo de cosméticos, brinquedos e higiene.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#241b3a] px-4 py-2 text-sm font-semibold text-white">
          Todos
        </span>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.slug}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#241b3a] shadow-sm transition hover:bg-fuchsia-50"
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
