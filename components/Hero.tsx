"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EVENT } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="topo"
      className="relative isolate h-[100svh] max-h-[920px] min-h-[600px] overflow-hidden bg-deep"
    >
      {/* brilho de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(760px 460px at 50% 6%, rgba(2,80,51,0.45), transparent 62%)",
        }}
      />

      {/* ---------- BG HERO — flare dourado ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0">
        <Image
          src="/img/bg-hero.png"
          alt=""
          width={1080}
          height={962}
          priority
          className="h-auto w-full object-cover opacity-80 mix-blend-screen"
        />
      </div>

      {/* ---------- PARTICIPANTES — preenchendo a tela ---------- */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease }}
        className="absolute inset-x-0 bottom-0 top-14 z-[1] sm:top-16"
      >
        <Image
          src="/img/participantes.png"
          alt="Palestrantes da Imersão Virada Clínica"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-contain sm:object-top"
        />
      </motion.div>

      {/* gradiente para legibilidade do texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,32,32,0.55) 0%, rgba(14,32,32,0) 14%, rgba(14,32,32,0) 38%, rgba(14,32,32,0.72) 60%, rgba(14,32,32,0.94) 80%, #0e2020 100%)",
        }}
      />

      {/* ---------- CONTEÚDO (base) ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-8 text-center sm:pb-10">
        <motion.h1
          {...rise(0.1)}
          className="font-serif leading-[1.08] text-lace drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
          style={{ fontSize: "clamp(1.35rem, 2.9vw, 2.35rem)" }}
        >
          A maior imersão de negócios para médicos do{" "}
          <span className="gold-gradient-text">Espírito Santo.</span>
        </motion.h1>

        {/* meta: data + local */}
        <motion.div
          {...rise(0.22)}
          className="mt-5 flex flex-col items-center justify-center gap-2 text-[0.82rem] sm:flex-row sm:gap-6 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <IconCalendar />
            <span className="font-semibold text-lace">{EVENT.date}</span>
            <span className="text-lace/70">
              · {EVENT.weekday} {EVENT.time}
            </span>
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span className="inline-flex items-center gap-2">
            <IconPin />
            <span className="font-semibold text-lace">{EVENT.venue}</span>
            <span className="text-lace/70">· {EVENT.city}</span>
          </span>
        </motion.div>

        <motion.div
          {...rise(0.28)}
          className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a href={EVENT.checkoutUrl} className="btn-gold w-full sm:w-auto">
            Garantir minha vaga →
          </a>
          <a href="#programacao" className="btn-ghost w-full sm:w-auto">
            Ver programação
          </a>
        </motion.div>

        <motion.p {...rise(0.36)} className="mt-4 text-[0.75rem] tracking-wide text-lace/60">
          Apenas <span className="text-gold">{EVENT.seats} vagas</span> · vagas limitadas para esta
          edição
        </motion.p>
      </div>
    </section>
  );
}
