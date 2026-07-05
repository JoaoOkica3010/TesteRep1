import Link from "next/link";

export function CategoryCard({
  slug,
  name,
  description,
  icon,
  accent,
}: {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
}) {
  return (
    <Link
      href={`/categoria/${slug}`}
      className="group flex flex-col rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-2xl`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#241b3a]">{name}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <span className="mt-4 text-sm font-semibold text-fuchsia-600 opacity-0 transition group-hover:opacity-100">
        Ver produtos →
      </span>
    </Link>
  );
}
