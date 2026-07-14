// ── Autenticação do dashboard (server-side) ────────────────────────
// Credenciais vêm de variáveis de ambiente (.env na VPS); nada vai
// para o bundle do cliente. A sessão é um token HMAC com validade,
// guardado em cookie httpOnly.

import { createHmac, timingSafeEqual } from "node:crypto";

// Sem fallback: com env ausente o auth falha fechado (login sempre rejeita),
// em vez de cair em credenciais conhecidas do repositório.
const USER = process.env.ADMIN_USER ?? "";
const PASS = process.env.ADMIN_PASS ?? "";
const SECRET = process.env.ADMIN_SECRET ?? "";
const CONFIGURED = USER.length > 0 && PASS.length > 0 && SECRET.length > 0;

export const SESSION_COOKIE = "vc_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkCredentials(user: string, pass: string): boolean {
  if (!CONFIGURED) return false;
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
  if (!CONFIGURED || !token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() || !sig) return false;
  return safeEqual(sig, sign(exp));
}
