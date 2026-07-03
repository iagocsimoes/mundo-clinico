"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section, { SectionHead } from "./Section";
import { FAQ } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" bg="surface">
      <SectionHead eyebrow="Perguntas frequentes" title="Tudo que você precisa saber" />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`rounded-xl border bg-deep/40 transition-colors ${
                isOpen ? "border-gold/40" : "border-line"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-base text-lace sm:text-lg">{f.q}</span>
                <span
                  aria-hidden
                  className={`flex-none text-2xl leading-none text-gold transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[0.92rem] leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
