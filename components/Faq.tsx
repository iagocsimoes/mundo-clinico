"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import Reveal from "./Reveal";
import { FAQ } from "@/lib/data";

// Distribuição das colunas no desktop (5 itens → 3 + 2), preenchidas em ordem
const COLUMNS = [FAQ.slice(0, 3), FAQ.slice(3)];

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        // painel só existe no DOM quando aberto (AnimatePresence) — não referenciar id inexistente
        aria-controls={isOpen ? `faq-panel-${index}` : undefined}
      >
        <span className="font-serif text-base text-lace transition-colors group-hover:text-gold-light sm:text-lg">
          {item.q}
        </span>
        {/* Ícone + / − (a barra vertical some quando aberto) */}
        <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none text-gold" aria-hidden>
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`origin-center transition-transform duration-300 ${
              isOpen ? "scale-y-0" : ""
            }`}
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-[0.92rem] leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" bg="surface">
      {/* Cabeçalho compacto: eyebrow centralizado entre filetes dourados */}
      <Reveal>
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="gold-rule flex-1" />
          <p className="eyebrow text-center">Perguntas frequentes</p>
          <div className="gold-rule flex-1" />
        </div>
        <h2 className="mt-6 text-center font-serif text-2xl leading-tight text-gold sm:text-3xl">
          Tudo que você precisa saber
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-x-12 sm:mt-12 md:grid-cols-2 lg:gap-x-16">
        {COLUMNS.map((column, c) => (
          <Reveal key={c} delay={c * 0.1} className="min-w-0">
            {column.map((item, j) => {
              // índice global do item (colunas preenchidas em sequência: 3 + 2)
              const index = c * COLUMNS[0].length + j;
              return (
                <FaqItem
                  key={item.q}
                  item={item}
                  index={index}
                  isOpen={open === index}
                  onToggle={() => setOpen(open === index ? null : index)}
                />
              );
            })}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
