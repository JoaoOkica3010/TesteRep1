import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 bg-[#241b3a] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold text-white">
            <span className="text-2xl">✨</span>
            DiverStore
          </div>
          <p className="mt-3 max-w-xs text-sm">
            Cosméticos, brinquedos e produtos de higiene com cor, diversão e qualidade
            para toda a família.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Categorias
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="transition hover:text-white" href="/categoria/cosmeticos">
                Cosméticos
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/categoria/brinquedos">
                Brinquedos
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/categoria/higiene">
                Higiene
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-white" href="/produtos">
                Todos os produtos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Contacto
          </h3>
          <ul className="space-y-2 text-sm">
            <li>ola@diverstore.pt</li>
            <li>+351 900 000 000</li>
            <li>Entregas em todo o país</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} DiverStore. Todos os direitos reservados.{" "}
        <Link href="/admin" className="hover:text-white/80">
          Admin
        </Link>
      </div>
    </footer>
  );
}
