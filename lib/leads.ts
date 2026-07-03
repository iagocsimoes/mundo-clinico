// ── Leads capturados pelo formulário de ingressos ──────────────────
// Sem backend: os leads ficam no localStorage do navegador e são
// lidos pelo dashboard em /admin (mesmo navegador/dispositivo).

export type Lead = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  tier: string;
  createdAt: string; // ISO
};

const STORAGE_KEY = "virada-clinica:leads";

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(data: Omit<Lead, "id" | "createdAt">): Lead {
  const lead: Lead = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const leads = [lead, ...getLeads()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return lead;
}

export function deleteLead(id: string): Lead[] {
  const leads = getLeads().filter((l) => l.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return leads;
}

export function clearLeads() {
  window.localStorage.removeItem(STORAGE_KEY);
}
