import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { OBJECTIONS } from "@/lib/data";

export default function Objections() {
  return (
    <Section id="objecoes">
      <SectionHead eyebrow="Antes de decidir" title="O que costuma passar pela cabeça" />

      <div className="mt-12 space-y-5">
        {OBJECTIONS.map((o, i) => (
          <Reveal key={o.q} delay={i * 0.08}>
            <div className="rounded-2xl border border-line bg-white/[0.02] p-7 sm:p-8">
              <p className="font-serif text-lg text-gold sm:text-xl">{o.q}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{o.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
