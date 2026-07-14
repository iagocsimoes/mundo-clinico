// ── Persistência de leads no servidor (arquivo JSON) ───────────────
// Os leads ficam em data/leads.json (configurável via LEADS_FILE).
// Escritas são serializadas em fila e feitas de forma atômica
// (tmp + rename) para não corromper o arquivo com requisições simultâneas.

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Lead } from "./leads";

const FILE =
  process.env.LEADS_FILE ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "leads.json");

let queue: Promise<unknown> = Promise.resolve();

function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(leads: Lead[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export function listLeads(): Promise<Lead[]> {
  return serialize(readAll);
}

/** Insere um lead; ignora se o id já existir (reenvio/backfill). */
export function addLead(lead: Lead): Promise<Lead> {
  return serialize(async () => {
    const leads = await readAll();
    if (!leads.some((l) => l.id === lead.id)) {
      leads.unshift(lead);
      await writeAll(leads);
    }
    return lead;
  });
}

export function removeLead(id: string): Promise<Lead[]> {
  return serialize(async () => {
    const leads = (await readAll()).filter((l) => l.id !== id);
    await writeAll(leads);
    return leads;
  });
}

export function clearAllLeads(): Promise<void> {
  return serialize(async () => {
    await writeAll([]);
  });
}
