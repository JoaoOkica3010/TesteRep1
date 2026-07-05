import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    slug: "cosmeticos",
    name: "Cosméticos",
    description: "Maquilhagem, perfumes e cuidados de beleza para brilhares todos os dias.",
    icon: "💄",
  },
  {
    slug: "brinquedos",
    name: "Brinquedos",
    description: "Diversão garantida para todas as idades, de jogos a peluches e muito mais.",
    icon: "🧸",
  },
  {
    slug: "higiene",
    name: "Higiene",
    description: "Produtos de higiene pessoal e familiar com qualidade e bem-estar.",
    icon: "🧴",
  },
] as const;

const products = [
  // Cosméticos
  {
    slug: "paleta-sombras-arco-iris",
    name: "Paleta de Sombras Arco-Íris",
    description:
      "18 tons vibrantes e altamente pigmentados, do mate ao brilhante, para criares qualquer look.",
    price: 2490,
    imageEmoji: "🎨",
    imageColor: "from-pink-500 to-purple-500",
    category: "cosmeticos",
    featured: true,
  },
  {
    slug: "batom-liquido-matte-coral",
    name: "Batom Líquido Matte Coral",
    description: "Longa duração, acabamento matte aveludado e não resseca os lábios.",
    price: 1250,
    imageEmoji: "💋",
    imageColor: "from-red-400 to-pink-500",
    category: "cosmeticos",
    featured: false,
  },
  {
    slug: "base-fluida-cobertura-total",
    name: "Base Fluida Cobertura Total",
    description: "Cobertura uniforme com toque leve e acabamento natural durante todo o dia.",
    price: 1990,
    imageEmoji: "✨",
    imageColor: "from-amber-300 to-pink-300",
    category: "cosmeticos",
    featured: false,
  },
  {
    slug: "mascara-pestanas-volume-extremo",
    name: "Máscara de Pestanas Volume Extremo",
    description: "Fórmula à prova de água que multiplica o volume sem criar grumos.",
    price: 1490,
    imageEmoji: "👁️",
    imageColor: "from-purple-500 to-indigo-500",
    category: "cosmeticos",
    featured: false,
  },
  {
    slug: "kit-pinceis-maquilhagem",
    name: "Kit Pincéis de Maquilhagem",
    description: "Conjunto de 12 pincéis profissionais com cerdas macias e estojo incluído.",
    price: 2990,
    imageEmoji: "🖌️",
    imageColor: "from-fuchsia-400 to-rose-400",
    category: "cosmeticos",
    featured: false,
  },
  {
    slug: "perfume-floral-doce",
    name: "Perfume Floral Doce",
    description: "Fragrância floral e adocicada com notas de baunilha e flor de laranjeira.",
    price: 3490,
    imageEmoji: "🌸",
    imageColor: "from-pink-300 to-fuchsia-400",
    category: "cosmeticos",
    featured: true,
  },
  // Brinquedos
  {
    slug: "carrinho-corrida-radical",
    name: "Carrinho de Corrida Radical",
    description: "Carrinho telecomandado de alta velocidade com bateria recarregável incluída.",
    price: 1890,
    imageEmoji: "🏎️",
    imageColor: "from-orange-400 to-red-500",
    category: "brinquedos",
    featured: true,
  },
  {
    slug: "peluche-urso-gigante",
    name: "Peluche Urso Gigante",
    description: "Peluche super macio de 80cm, perfeito para abraçar e decorar o quarto.",
    price: 2290,
    imageEmoji: "🧸",
    imageColor: "from-amber-300 to-orange-400",
    category: "brinquedos",
    featured: true,
  },
  {
    slug: "puzzle-500-pecas-aventura",
    name: "Puzzle 500 Peças Aventura",
    description: "Desafio divertido para toda a família, com imagem exclusiva de aventura.",
    price: 1690,
    imageEmoji: "🧩",
    imageColor: "from-teal-400 to-cyan-500",
    category: "brinquedos",
    featured: false,
  },
  {
    slug: "boneca-fashion-style",
    name: "Boneca Fashion Style",
    description: "Boneca articulada com guarda-roupa e acessórios trocáveis incluídos.",
    price: 2590,
    imageEmoji: "👗",
    imageColor: "from-purple-400 to-pink-400",
    category: "brinquedos",
    featured: false,
  },
  {
    slug: "drone-mini-voador",
    name: "Drone Mini Voador",
    description: "Drone compacto fácil de pilotar, com estabilização automática de voo.",
    price: 3990,
    imageEmoji: "🚁",
    imageColor: "from-slate-400 to-blue-500",
    category: "brinquedos",
    featured: true,
  },
  {
    slug: "jogo-tabuleiro-familia",
    name: "Jogo de Tabuleiro Família",
    description: "Serões garantidos com este jogo de estratégia para 2 a 6 jogadores.",
    price: 2190,
    imageEmoji: "🎲",
    imageColor: "from-emerald-400 to-teal-500",
    category: "brinquedos",
    featured: false,
  },
  // Higiene
  {
    slug: "kit-escova-pasta-dentes",
    name: "Kit Escova e Pasta de Dentes Divertido",
    description: "Escova com design colorido e pasta de dentes com sabor a fruta, sem flúor forte.",
    price: 990,
    imageEmoji: "🪥",
    imageColor: "from-cyan-400 to-blue-400",
    category: "higiene",
    featured: false,
  },
  {
    slug: "gel-banho-frutas-tropicais",
    name: "Gel de Banho Frutas Tropicais",
    description: "Limpeza suave com aroma tropical e fórmula hidratante para todos os dias.",
    price: 790,
    imageEmoji: "🧴",
    imageColor: "from-lime-400 to-green-500",
    category: "higiene",
    featured: true,
  },
  {
    slug: "champo-suave-camomila",
    name: "Champô Suave de Camomila",
    description: "Fórmula sem lágrimas, ideal para uso diário em toda a família.",
    price: 850,
    imageEmoji: "🧴",
    imageColor: "from-yellow-300 to-amber-400",
    category: "higiene",
    featured: false,
  },
  {
    slug: "toalhitas-humidas-bebe",
    name: "Toalhitas Húmidas Bebé",
    description: "Pacote com 80 toalhitas hipoalergénicas, suaves para a pele sensível.",
    price: 690,
    imageEmoji: "🧻",
    imageColor: "from-sky-300 to-blue-300",
    category: "higiene",
    featured: false,
  },
  {
    slug: "desodorizante-roll-on-fresh",
    name: "Desodorizante Roll-On Fresh",
    description: "Proteção 48 horas com fragrância fresca e leve, sem álcool.",
    price: 590,
    imageEmoji: "🌿",
    imageColor: "from-teal-300 to-emerald-400",
    category: "higiene",
    featured: false,
  },
  {
    slug: "kit-higiene-viagem",
    name: "Kit Higiene de Viagem",
    description: "Conjunto compacto com os essenciais de higiene, ideal para levar contigo.",
    price: 1390,
    imageEmoji: "🎒",
    imageColor: "from-indigo-400 to-purple-400",
    category: "higiene",
    featured: false,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.category },
    });

    const data = {
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      imageEmoji: product.imageEmoji,
      imageColor: product.imageColor,
      featured: product.featured,
      categoryId: category.id,
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: data,
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
