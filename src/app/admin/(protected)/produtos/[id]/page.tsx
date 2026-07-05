import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProductAction } from "../../../actions";
import { ProductForm } from "../../ProductForm";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#241b3a]">
        Editar: {product.name}
      </h2>
      <ProductForm
        categories={categories}
        action={updateProductAction.bind(null, id)}
        initial={product}
        submitLabel="Guardar alterações"
      />
    </div>
  );
}
