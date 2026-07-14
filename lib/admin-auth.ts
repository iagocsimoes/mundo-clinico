// ── Autenticação do dashboard (server-side) ────────────────────────
// Credenciais vêm de variáveis de ambiente (.env na VPS); nada vai
// para o bundle do cliente. A sessão é um token HMAC com validade,
// guardado em cookie httpOnly.

import { createHmac, timingSafeEqual } from "node:crypto";

const USER = process.env.ADMIN_USER ?? "admin";
const PASS = process.env.ADMIN_PASS ?? "viradaclinica2026";
// Segredo estável entre restarts; defina ADMIN_SECRET no .env em produção.
const SECRET = process.env.ADMIN_SECRET ?? `virada-clinica:${USER}:${PASS}`;

export const SESSION_COOKIE = "vc_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkCredentials(user: string, pass: string): boolean {
  return safeEqual(user, USER) && safeEqual(pass, PASS);
}

function sign(exp: number): string {
  return createHmac("sha256", SECRET).update(`admin:${exp}`).digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  return `${exp}.${sign(exp)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() || !sig) return false;
  return safeEqual(sig, sign(exp));
}
