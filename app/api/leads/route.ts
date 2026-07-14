import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import type { Lead } from "@/lib/leads";
import { addLead, clearAllLeads, listLeads, removeLead } from "@/lib/leads-store";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

const unauthorized = () => Response.json({ error: "Não autorizado." }, { status: 401 });

function cleanText(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

/** Captura de lead do formulário de ingressos (público). */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 160);
  const whatsapp = cleanText(body.whatsapp, 30);
  const tier = cleanText(body.tier, 60);

  if (
    name.length < 3 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    whatsapp.replace(/\D/g, "").length < 10 ||
    tier.length === 0
  ) {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }

  // id/createdAt do cliente são aceitos para o backfill de leads antigos
  // (localStorage); o id repetido é ignorado no store, então reenvio é seguro.
  const id = typeof body.id === "string" && body.id.length <= 64 ? body.id : randomUUID();
  const createdAtRaw = typeof body.createdAt === "string" ? new Date(body.createdAt) : null;
  const createdAt =
    createdAtRaw && !Number.isNaN(createdAtRaw.getTime())
      ? createdAtRaw.toISOString()
      : new Date().toISOString();

  const lead: Lead = { id, name, email, whatsapp, tier, createdAt };
  await addLead(lead);
  return Response.json(lead, { status: 201 });
}

/** Lista os leads (dashboard; requer sessão). */
export async function GET() {
  if (!(await isAuthed())) return unauthorized();
  return Response.json(await listLeads());
}

/** Remove um lead (?id=...) ou todos (sem id). Requer sessão. */
export async function DELETE(request: Request) {
  if (!(await isAuthed())) return unauthorized();

  const id = new URL(request.url).searchParams.get("id");
  if (id) return Response.json(await removeLead(id));

  await clearAllLeads();
  return Response.json([]);
}
