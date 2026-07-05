import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, categories] = await Promise.all([
    prisma.category.findUnique({
      where: { slug },
      include: { products: { orderBy: { createdAt: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{category.icon}</span>
        <h1 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
          {category.name}
        </h1>
      </div>
      <p className="mt-2 max-w-2xl text-gray-600">{category.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/produtos"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#241b3a] shadow-sm transition hover:bg-fuchsia-50"
        >
          Todos
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/categoria/${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              c.slug === slug
                ? "bg-[#241b3a] text-white"
                : "bg-white text-[#241b3a] hover:bg-fuchsia-50"
            }`}
          >
            {c.icon} {c.name}
          </Link>
        ))}
      </div>

      {category.products.length === 0 ? (
        <p className="mt-10 text-gray-500">
          Ainda não há produtos nesta categoria.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
