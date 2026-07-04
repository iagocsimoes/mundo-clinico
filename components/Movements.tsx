import Section from "./Section";
import Reveal from "./Reveal";
import { MOVEMENTS, EVENT } from "@/lib/data";

export default function Movements() {
  return (
    <Section id="o-que-e" className="overflow-hidden">
      {/* ---------- Cabeçalho centralizado ---------- */}
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mb-7 flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-12 bg-gradient-to-r from-transparent to-camel" />
            <p className="eyebrow">O que é a Virada Clínica</p>
            <span aria-hidden className="h-px w-12 bg-gradient-to-l from-transparent to-camel" />
          </div>
          <h2 className="font-serif text-[2.1rem] leading-[1.08] text-lace sm:text-[3rem]">
            Uma imersão. Três movimentos.
            <br />
            <span className="gold-gradient-text">Uma decisão.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-relaxed text-muted">
            Não é sobre acumular conteúdo. É um caminho: do diagnóstico do que trava o crescimento
            até a decisão do próximo passo.
          </p>
        </Reveal>
      </div>

      {/* ---------- Régua dos três movimentos — numerais gigantes + divisores ---------- */}
      <ol className="mt-14 grid divide-y divide-line border-t border-line pt-2 sm:mt-16 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:pt-12">
        {MOVEMENTS.map((m, i) => (
          <li
            key={m.n}
            className="py-9 first:pt-8 last:pb-0 lg:px-9 lg:py-0 lg:first:pl-0 lg:first:pt-0 lg:last:pr-0"
          >
            <Reveal delay={0.12 + i * 0.12} y={26} duration={0.8}>
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="shrink-0 font-serif text-6xl leading-[0.85] gold-gradient-text sm:text-7xl">
                  {m.n}
                </span>
                <div className="pt-0.5">
                  <h3 className="font-serif text-xl leading-snug text-lace sm:text-[1.35rem]">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* ---------- Fecho: payoff + CTA ---------- */}
      <Reveal delay={0.45}>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:mt-16">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2 text-[0.78rem] tracking-wide text-gold-light">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            Você sai com o próximo passo definido
          </div>
          <a href={EVENT.checkoutUrl} className="btn-ghost">
            Garantir minha vaga
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
