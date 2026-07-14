import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  createSessionToken,
} from "@/lib/admin-auth";

/** Login do dashboard: valida credenciais e grava o cookie de sessão. */
export async function POST(request: Request) {
  let body: { user?: string; pass?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!checkCredentials(String(body.user ?? ""), String(body.pass ?? ""))) {
    return Response.json({ error: "Usuário ou senha incorretos." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return new Response(null, { status: 204 });
}

/** Logout: remove o cookie de sessão. */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return new Response(null, { status: 204 });
}
