"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-extrabold text-[#241b3a]">Painel admin</h1>
      <p className="mt-2 text-sm text-gray-600">
        Introduz a password para gerir os produtos.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-fuchsia-400"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
