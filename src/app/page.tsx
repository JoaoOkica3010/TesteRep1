import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";

const CATEGORY_META = [
  {
    slug: "cosmeticos",
    name: "Cosméticos",
    description:
      "Maquilhagem, perfumes e cuidados de beleza para brilhares todos os dias.",
    icon: "💄",
    accent: "from-pink-400 to-fuchsia-500",
  },
  {
    slug: "brinquedos",
    name: "Brinquedos",
    description:
      "Diversão garantida para todas as idades, de jogos a peluches e muito mais.",
    icon: "🧸",
    accent: "from-orange-400 to-amber-500",
  },
  {
    slug: "higiene",
    name: "Higiene",
    description:
      "Produtos de higiene pessoal e familiar com qualidade e bem-estar.",
    icon: "🧴",
    accent: "from-teal-400 to-cyan-500",
  },
];

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
    take: 6,
  });

  return (
    <>
      <section className="bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 pb-24 pt-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            Cor, diversão e cuidado em cada produto.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
            Cosméticos, brinquedos e produtos de higiene escolhidos a pensar em
            ti e na tua família, com entrega rápida em todo o país.
          </p>

          <div className="mt-8 grid gap-5 text-left sm:grid-cols-3">
            {CATEGORY_META.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/produtos"
              className="rounded-full bg-white px-8 py-3 font-semibold text-fuchsia-700 shadow-md transition hover:bg-white/90"
            >
              Ver todos os produtos
            </Link>
            <Link
              href="#destaques"
              className="rounded-full border border-white/50 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver destaques
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
              Porquê comprar na DiverStore
            </h2>
            <p className="mt-4 text-gray-600">
              Selecionamos cada produto com cuidado para garantir qualidade,
              segurança e muita diversão em cada compra, do cosmético ao
              brinquedo.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Produtos selecionados e testados",
                "Preços justos e promoções frequentes",
                "Entrega rápida e embalagens seguras",
                "Suporte próximo antes e depois da compra",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-500 text-5xl shadow-md">
              💄
            </div>
            <div className="mt-8 flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-5xl shadow-md">
              🧸
            </div>
            <div className="flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-5xl shadow-md">
              🧴
            </div>
            <div className="mt-8 flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 text-5xl shadow-md">
              🎁
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fdf1f8] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="order-2 flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 text-7xl shadow-lg md:order-1">
            🚚
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
              Entrega e atendimento rápidos
            </h2>
            <p className="mt-4 text-gray-600">
              A nossa equipa acompanha o teu pedido do carrinho à porta de
              casa. Encomendas processadas em 24h úteis e suporte disponível
              para qualquer dúvida sobre os teus produtos.
            </p>
            <Link
              href="/produtos"
              className="mt-6 inline-block rounded-full bg-[#241b3a] px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-600"
            >
              Começar a comprar
            </Link>
          </div>
        </div>
      </section>

      <section id="destaques" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
              Produtos em destaque
            </h2>
            <p className="mt-2 text-gray-600">
              Uma seleção divertida das nossas três categorias.
            </p>
          </div>
          <Link
            href="/produtos"
            className="hidden text-sm font-semibold text-fuchsia-600 sm:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Pronto para diversão garantida?
          </h2>
          <p className="mt-3 text-white/90">
            Explora o catálogo completo e encontra o produto perfeito para ti
            ou para quem mais gostas.
          </p>
          <Link
            href="/produtos"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-fuchsia-700 shadow-md transition hover:bg-white/90"
          >
            Ver todos os produtos
          </Link>
        </div>
      </section>
    </>
  );
}
