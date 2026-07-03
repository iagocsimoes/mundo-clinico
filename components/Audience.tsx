import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { AUDIENCE } from "@/lib/data";

export default function Audience() {
  return (
    <Section id="para-quem" bg="surface">
      <SectionHead
        eyebrow="Para quem é"
        title="Quem está na sala no dia 01 de agosto"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {AUDIENCE.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-line bg-deep/50 p-8">
              <h3 className="font-serif text-xl leading-snug text-gold">{group.title}</h3>
              <div className="gold-rule my-6 opacity-40" />
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-lace/90">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
