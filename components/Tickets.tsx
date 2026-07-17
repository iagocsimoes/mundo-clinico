"use client";

import { useState } from "react";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import TicketModal, { type TicketModalData } from "./TicketModal";
import { TICKETS, EVENT } from "@/lib/data";

function Check() {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-gold/15 text-[0.7rem] font-bold text-gold"
    >
      ✓
    </span>
  );
}

export default function Tickets() {
  const [selected, setSelected] = useState<TicketModalData | null>(null);

  return (
    <Section id="ingressos">
      <SectionHead
        eyebrow="Ingressos"
        title="Escolha como você quer viver a imersão"
        center
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {TICKETS.map((t, i) => (
          <Reveal key={t.tier} delay={i * 0.1}>
            <article
              className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                t.featured
                  ? "border-gold/60 bg-gradient-to-b from-gold/[0.09] to-white/[0.01] shadow-[0_30px_80px_-30px_rgba(201,178,145,0.35)] lg:-mt-4 lg:mb-4"
                  : "border-line bg-white/[0.02]"
              }`}
            >
              {t.note && (
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[0.62rem] font-semibold tracking-[0.1em] uppercase ${
                    t.featured
                      ? "bg-gold text-base"
                      : "border border-line text-camel"
                  }`}
                >
                  {t.featured ? t.note : "Exclusivo"}
                </span>
              )}

              <p className="eyebrow">{t.tier}</p>
              <div className="mt-4 flex items-end gap-1.5">
                <span className="mb-1.5 text-sm text-muted">12x de R$</span>
                <span className="font-serif text-5xl leading-none text-gold">{t.installment}</span>
              </div>
              <p className="mt-2 text-sm text-camel">ou R$ {t.price} à vista</p>
              <p className="mt-3 text-sm text-muted">{t.lead}</p>

              <div className="gold-rule my-6 opacity-30" />

              <ul className="mb-8 flex-1 space-y-3">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9rem] leading-snug text-lace/90">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setSelected({ tier: t.tier, whatsappUrl: t.whatsappUrl })}
                className={t.featured ? "btn-gold w-full" : "btn-ghost w-full"}
              >
                {t.cta}
              </button>

              {!t.featured && t.note && (
                <p className="mt-4 text-center text-[0.72rem] leading-relaxed text-camel">
                  {t.note}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        {EVENT.seats} vagas no total · {EVENT.date} · {EVENT.venue}, {EVENT.city}
      </p>

      <TicketModal ticket={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
