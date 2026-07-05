import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

export async function createAdminSession() {
  const token = expectedToken();
  if (!token) throw new Error("ADMIN_PASSWORD não está configurada no .env.");

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const token = expectedToken();
  if (!token) return false;

  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === token;
}
