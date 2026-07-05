import { prisma } from "@/lib/prisma";
import { createProductAction } from "../../../actions";
import { ProductForm } from "../../ProductForm";

export default async function NovoProdutoPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#241b3a]">Novo produto</h2>
      <ProductForm
        categories={categories}
        action={createProductAction}
        submitLabel="Criar produto"
      />
    </div>
  );
}
