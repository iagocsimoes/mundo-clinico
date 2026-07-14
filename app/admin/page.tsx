"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  clearLeads,
  deleteLead,
  fetchLeads,
  login,
  logout,
  type Lead,
} from "@/lib/leads";
import { TICKETS } from "@/lib/data";
import Logo from "@/components/Logo";

const inputClass =
  "w-full rounded-lg border border-line bg-ink/70 px-4 py-3.5 text-[0.95rem] text-lace placeholder:text-muted/50 outline-none transition-colors focus:border-gold/70 focus:ring-1 focus:ring-gold/40";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportCsv(leads: Lead[]) {
  const header = "Nome;E-mail;WhatsApp;Ingresso;Data";
  const rows = leads.map((l) =>
    [l.name, l.email, l.whatsapp, l.tier, formatDate(l.createdAt)]
      .map((v) => `"${v.replaceAll('"', '""')}"`)
      .join(";")
  );
  const blob = new Blob(["﻿" + [header, ...rows].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads-virada-clinica.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function LoginScreen({ onLogin }: { onLogin: (leads: Lead[]) => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      if (await login(user.trim(), pass)) {
        onLogin((await fetchLeads()) ?? []);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-deep px-6 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-gold/25 bg-white/[0.02] p-8 sm:p-10">
        <Logo />
        <p className="eyebrow mt-8 mb-2">Área restrita</p>
        <h1 className="font-serif text-2xl leading-tight text-gold">
          Dashboard de leads
        </h1>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
          <div>
            <label htmlFor="admin-user" className="mb-2 block text-sm font-semibold text-lace">
              Usuário
            </label>
            <input
              id="admin-user"
              type="text"
              autoComplete="username"
              placeholder="Usuário"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setError(false);
              }}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="admin-pass" className="mb-2 block text-sm font-semibold text-lace">
              Senha
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
              }}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">Usuário ou senha incorretos.</p>
          )}

          <button type="submit" disabled={sending} className="btn-gold w-full disabled:opacity-60">
            {sending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({
  initialLeads,
  onLogout,
}: {
  initialLeads: Lead[];
  onLogout: () => void;
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  async function handleDelete(id: string) {
    try {
      setLeads(await deleteLead(id));
    } catch {
      window.alert("Falha ao remover o lead. Tente novamente.");
    }
  }

  async function handleClear() {
    if (!window.confirm("Apagar todos os leads? Essa ação não pode ser desfeita.")) return;
    try {
      await clearLeads();
      setLeads([]);
    } catch {
      window.alert("Falha ao limpar os leads. Tente novamente.");
    }
  }

  const byTier = (tier: string) => leads.filter((l) => l.tier === tier).length;

  return (
    <main className="min-h-screen bg-deep px-6 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Logo />
            <p className="eyebrow mt-6 mb-2">Dashboard</p>
            <h1 className="font-serif text-3xl leading-tight text-gold sm:text-4xl">
              Leads dos ingressos
            </h1>
            <p className="mt-3 max-w-lg text-sm text-muted">
              Dados capturados pelo formulário antes do direcionamento ao WhatsApp,
              salvos no servidor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => exportCsv(leads)}
              disabled={leads.length === 0}
              className="btn-ghost !px-5 !py-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Exportar CSV
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={leads.length === 0}
              className="btn-ghost !border-red-900 !px-5 !py-3 !text-red-400 hover:!border-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Limpar tudo
            </button>
            <button type="button" onClick={onLogout} className="btn-ghost !px-5 !py-3">
              Sair
            </button>
          </div>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gold/40 bg-gold/[0.07] p-5">
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-camel">
              Total de leads
            </p>
            <p className="mt-2 font-serif text-4xl leading-none text-gold">{leads.length}</p>
          </div>
          {TICKETS.map((t) => (
            <div key={t.tier} className="rounded-2xl border border-line bg-white/[0.02] p-5">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-camel">
                {t.tier}
              </p>
              <p className="mt-2 font-serif text-4xl leading-none text-lace">{byTier(t.tier)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
          {leads.length === 0 ? (
            <p className="p-12 text-center text-sm text-muted">
              Nenhum lead capturado ainda. Eles aparecem aqui assim que alguém preencher o
              formulário de ingresso.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-camel">
                    <th className="px-5 py-4">Nome</th>
                    <th className="px-5 py-4">E-mail</th>
                    <th className="px-5 py-4">WhatsApp</th>
                    <th className="px-5 py-4">Ingresso</th>
                    <th className="px-5 py-4">Data</th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr
                      key={l.id}
                      className="border-b border-line/50 last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4 font-medium text-lace">{l.name}</td>
                      <td className="px-5 py-4 text-muted">{l.email}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-muted">{l.whatsapp}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.68rem] font-semibold tracking-wide uppercase text-gold">
                          {l.tier}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-muted">
                        {formatDate(l.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(l.id)}
                          aria-label={`Remover lead ${l.name}`}
                          className="text-muted transition-colors hover:text-red-400"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [screen, setScreen] = useState<"checking" | "login" | "dashboard">("checking");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads()
      .then((data) => {
        if (data === null) {
          setScreen("login");
        } else {
          setLeads(data);
          setScreen("dashboard");
        }
      })
      .catch(() => setScreen("login"));
  }, []);

  async function handleLogout() {
    await logout();
    setScreen("login");
  }

  if (screen === "checking") return <main className="min-h-screen bg-deep" />;
  if (screen === "login")
    return (
      <LoginScreen
        onLogin={(data) => {
          setLeads(data);
          setScreen("dashboard");
        }}
      />
    );
  return <Dashboard initialLeads={leads} onLogout={handleLogout} />;
}
