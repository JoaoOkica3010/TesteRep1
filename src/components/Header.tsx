import Link from "next/link";
import { CartButton } from "./CartButton";

const NAV_LINKS = [
  { href: "/produtos", label: "Todos os Produtos" },
  { href: "/categoria/cosmeticos", label: "Cosméticos" },
  { href: "/categoria/brinquedos", label: "Brinquedos" },
  { href: "/categoria/higiene", label: "Higiene" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="text-2xl">✨</span>
          DiverStore
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="opacity-90 transition hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartButton />
      </div>
    </header>
  );
}
