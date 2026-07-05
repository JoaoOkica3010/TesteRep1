import Link from "next/link";

export default function CanceladoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-5xl">😕</p>
      <h1 className="mt-4 text-2xl font-extrabold text-[#241b3a] sm:text-3xl">
        Pagamento cancelado
      </h1>
      <p className="mt-2 text-gray-600">
        O pagamento foi cancelado. O teu carrinho continua guardado, podes
        tentar novamente quando quiseres.
      </p>
      <Link
        href="/carrinho"
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
      >
        Voltar ao carrinho
      </Link>
    </div>
  );
}
