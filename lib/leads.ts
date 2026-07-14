// ── Leads capturados pelo formulário de ingressos ──────────────────
// Os leads são enviados para POST /api/leads e ficam salvos num
// arquivo JSON no servidor (ver lib/leads-store.ts). O dashboard em
// /admin lê da mesma API, autenticado por cookie de sessão.

export type Lead = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  tier: string;
  createdAt: string; // ISO
};

export type LeadInput = Omit<Lead, "id" | "createdAt">;

// Chave usada pela versão antiga (leads presos no navegador do visitante).
const LEGACY_STORAGE_KEY = "virada-clinica:leads";

/**
 * Envia o lead ao servidor sem bloquear o redirect para o WhatsApp.
 * sendBeacon sobrevive à navegação; fetch keepalive é o fallback.
 */
export function sendLead(data: LeadInput) {
  const payload = JSON.stringify(data);
  if (navigator.sendBeacon?.("/api/leads", new Blob([payload], { type: "application/json" }))) {
    return;
  }
  void fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Backfill: se este navegador tem leads da versão antiga (localStorage),
 * envia todos ao servidor e limpa a chave. O servidor deduplica por id,
 * então rodar mais de uma vez é seguro.
 */
export async function syncLegacyLeads() {
  let leads: Lead[];
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return;
    leads = JSON.parse(raw) as Lead[];
  } catch {
    return;
  }

  try {
    for (const lead of leads) {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) return; // tenta de novo na próxima visita
    }
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // offline/erro de rede: mantém no localStorage para a próxima visita
  }
}

// ── API do dashboard (/admin) ───────────────────────────────────────

/** Lista os leads; retorna null se a sessão não está autenticada. */
export async function fetchLeads(): Promise<Lead[] | null> {
  const res = await fetch("/api/leads");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Falha ao carregar leads.");
  return res.json();
}

export async function deleteLead(id: string): Promise<Lead[]> {
  const res = await fetch(`/api/leads?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao remover lead.");
  return res.json();
}

export async function clearLeads(): Promise<void> {
  const res = await fetch("/api/leads", { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao limpar leads.");
}

export async function login(user: string, pass: string): Promise<boolean> {
  const res = await fetch("/api/admin/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
  });
  return res.ok;
}

export async function logout(): Promise<void> {
  await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {});
}
