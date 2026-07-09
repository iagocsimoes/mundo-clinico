"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { saveLead } from "@/lib/leads";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type TicketModalData = {
  tier: string;
  whatsappUrl: string;
};

type TicketModalProps = {
  ticket: TicketModalData | null;
  onClose: () => void;
};

/** Máscara (11) 99999-9999 conforme o usuário digita. */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const inputClass =
  "w-full rounded-lg border border-line bg-ink/70 px-4 py-3.5 text-[0.95rem] text-lace placeholder:text-muted/50 outline-none transition-colors focus:border-gold/70 focus:ring-1 focus:ring-gold/40";

function LeadForm({ ticket, onClose }: { ticket: TicketModalData; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errs: typeof errors = {};
    if (name.trim().length < 3) errs.name = "Informe seu nome completo.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = "Informe um e-mail válido.";
    if (phone.replace(/\D/g, "").length < 10) errs.phone = "Informe um WhatsApp válido com DDD.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    saveLead({
      name: name.trim(),
      email: email.trim(),
      whatsapp: `+55 ${phone}`,
      tier: ticket.tier,
    });

    // Marca ?leadcoletado=1 na URL ANTES de disparar o Lead, para o evento do Pixel
    // já viajar com essa URL (permite filtrar por "URL contém leadcoletado" no Meta).
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("leadcoletado", "1");
      window.history.replaceState(null, "", url.toString());
    }

    // Lead só dispara após a validação passar, já com a URL marcada
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "Imersão Virada Clínica",
      });
    }

    window.open(ticket.whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-gold">
        Ingresso {ticket.tier}
      </span>

      <h3 className="mt-5 font-serif text-2xl leading-tight text-gold sm:text-3xl">
        Falta só mais um passo
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Preencha seus dados e vá direto para o WhatsApp garantir sua vaga.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="lead-name" className="mb-2 block text-sm font-semibold text-lace">
            Nome completo
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-2 block text-sm font-semibold text-lace">
            E-mail
          </label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-2 block text-sm font-semibold text-lace">
            WhatsApp
          </label>
          <div className="flex gap-2">
            <span className="grid flex-none place-items-center rounded-lg border border-line bg-ink/70 px-4 text-[0.95rem] text-muted">
              +55
            </span>
            <input
              id="lead-phone"
              type="tel"
              autoComplete="tel-national"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              className={inputClass}
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
        </div>
      </div>

      <button type="submit" className="btn-gold mt-8 w-full">
        Confirmar e ir para o WhatsApp →
      </button>
    </form>
  );
}

/** Modal de captura de lead antes de direcionar ao WhatsApp do ingresso. */
export default function TicketModal({ ticket, onClose }: TicketModalProps) {
  const reduce = useReducedMotion();
  const open = ticket !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {ticket && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Garantir ingresso ${ticket.tier}`}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-gold/25 bg-deep p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:p-10"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-gold/50 hover:text-gold"
            >
              ✕
            </button>

            <LeadForm key={ticket.tier} ticket={ticket} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
