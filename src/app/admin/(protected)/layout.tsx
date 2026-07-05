import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAction } from "../actions";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-extrabold text-[#241b3a]">
          Painel admin
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm font-semibold text-gray-500 hover:text-fuchsia-600"
          >
            Sair
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
