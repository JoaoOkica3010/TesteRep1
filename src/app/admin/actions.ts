"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import {
  checkPassword,
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function loginAction(_prevState: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    return "Password incorreta.";
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceEuros = String(formData.get("price") ?? "0").replace(",", ".");
  const imageEmoji = String(formData.get("imageEmoji") ?? "").trim();
  const imageColor = String(formData.get("imageColor") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const featured = formData.get("featured") === "on";
  const stock = Number(formData.get("stock") ?? 100);

  const slug = slugify(rawSlug || name);
  const price = Math.round(parseFloat(priceEuros || "0") * 100);

  return { name, slug, description, price, imageEmoji, imageColor, categoryId, featured, stock };
}

export async function createProductAction(_prevState: string | null, formData: FormData) {
  await requireAdmin();
  const data = parseProductForm(formData);

  if (!data.name || !data.slug || !data.categoryId) {
    return "Preenche pelo menos o nome, categoria e slug.";
  }

  try {
    await prisma.product.create({ data });
  } catch {
    return "Não foi possível criar o produto. Verifica se o slug já existe.";
  }

  redirect("/admin");
}

export async function updateProductAction(
  id: string,
  _prevState: string | null,
  formData: FormData
) {
  await requireAdmin();
  const data = parseProductForm(formData);

  if (!data.name || !data.slug || !data.categoryId) {
    return "Preenche pelo menos o nome, categoria e slug.";
  }

  try {
    await prisma.product.update({ where: { id }, data });
  } catch {
    return "Não foi possível guardar. Verifica se o slug já existe.";
  }

  redirect("/admin");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();

  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    redirect("/admin?error=has-orders");
  }

  redirect("/admin");
}
