import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#241b3a]">
          Produtos ({products.length})
        </h2>
        <Link
          href="/admin/produtos/novo"
          className="rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
        >
          + Novo produto
        </Link>
      </div>

      {error === "has-orders" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          Não foi possível apagar: este produto já tem encomendas associadas.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Destaque</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <span className="mr-2">{product.imageEmoji}</span>
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {product.category.icon} {product.category.name}
                </td>
                <td className="px-4 py-3 font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-3">{product.featured ? "Sim" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/produtos/${product.id}`}
                      className="font-semibold text-fuchsia-600 hover:text-fuchsia-700"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
