import Section from "./Section";
import Reveal from "./Reveal";
import { STATS } from "@/lib/data";

export default function SocialProof() {
  return (
    <Section bg="ink">
      <div className="grid gap-10 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1}>
            <div className="text-center">
              <div className="font-serif text-5xl leading-none text-gold sm:text-6xl">{s.n}</div>
              <p className="mx-auto mt-4 max-w-[15rem] text-sm leading-relaxed text-muted">
                {s.l}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
