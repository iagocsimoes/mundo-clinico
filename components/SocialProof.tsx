import Section from "./Section";
import Reveal from "./Reveal";
import { STATS, TESTIMONIAL } from "@/lib/data";

/** Aspas decorativas douradas do depoimento (estilo “66” do mock). */
function IconQuote() {
  return (
    <svg
      width="34"
      height="26"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-gold"
    >
      <path
        d="M10.8 0C4.6 1.7 1 6.3 1 13v11h12V13H7.2c.3-3.7 2.3-6.2 6-7.5L10.8 0Z"
        fill="currentColor"
      />
      <path
        d="M28.6 0c-6.2 1.7-9.8 6.3-9.8 13v11h12V13h-5.8c.3-3.7 2.3-6.2 6-7.5L28.6 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <Section bg="ink">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ---------- Números (esquerda no desktop) ---------- */}
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div>
                {/* lg: colunas ~166px (metade do container ÷ 3) — numeral menor para não cortar */}
                <div className="gold-gradient-text font-serif text-5xl leading-none sm:text-[3.4rem] lg:text-[2.75rem]">
                  {s.n}
                </div>
                <p className="mt-4 max-w-[15rem] text-sm leading-relaxed text-muted">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- Depoimento (direita no desktop) ---------- */}
        <Reveal delay={0.2} x={28}>
          <figure className="relative rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <div className="flex items-start gap-4 sm:gap-5">
              <IconQuote />
              <blockquote className="font-serif text-lg leading-relaxed text-lace sm:text-xl">
                {TESTIMONIAL.quote}
              </blockquote>
            </div>

            <figcaption className="mt-7 flex items-center gap-4">
              {/* Avatar placeholder com iniciais — trocar quando a foto oficial chegar.
                  Com a foto em public/img/ (ex.: /img/testimonial-juliana.jpg), importar
                  Image de "next/image" e substituir o <span> por:
                  <Image
                    src="/img/testimonial-juliana.jpg"
                    alt={TESTIMONIAL.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 shrink-0 rounded-full border border-gold/50 object-cover"
                  /> */}
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-surface-2 font-serif text-sm tracking-wide text-gold"
              >
                {/* iniciais derivadas do nome (sem título "Dra.") para não dessincronizar dos dados */}
                {TESTIMONIAL.name
                  .replace(/^Dra?\.\s*/i, "")
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-lace">{TESTIMONIAL.name}</p>
                <p className="mt-0.5 text-xs text-muted">{TESTIMONIAL.role}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
