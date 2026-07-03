import Section from "./Section";
import Reveal from "./Reveal";
import { MOVEMENTS, EVENT } from "@/lib/data";

export default function Movements() {
  return (
    <Section id="o-que-e" className="overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* ---------- Coluna esquerda — cabeçalho ---------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-6">O que é a Virada Clínica</p>
            <h2 className="font-serif text-[2.1rem] leading-[1.08] text-lace sm:text-[3rem]">
              Uma imersão.
              <br />
              Três movimentos.
              <br />
              <span className="gold-gradient-text">Uma decisão.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-sm text-[0.98rem] leading-relaxed text-muted">
              Não é sobre acumular conteúdo. É um caminho: do diagnóstico do que trava o crescimento
              até a decisão do próximo passo.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href={EVENT.checkoutUrl} className="btn-ghost mt-9">
              Garantir minha vaga
            </a>
          </Reveal>
        </div>

        {/* ---------- Coluna direita — a jornada ---------- */}
        <ol>
          {MOVEMENTS.map((m, i) => {
            const last = i === MOVEMENTS.length - 1;
            return (
              <Reveal key={m.n} delay={i * 0.12} x={28} y={0} duration={0.8}>
                <li className="group flex gap-5 sm:gap-8">
                  {/* trilha: numeral + fio */}
                  <div className="flex flex-col items-center self-stretch">
                    <span className="font-serif text-4xl leading-none gold-gradient-text sm:text-5xl">
                      {m.n}
                    </span>
                    {!last && (
                      <span className="mt-4 w-px flex-1 bg-gradient-to-b from-gold/45 via-gold/15 to-transparent" />
                    )}
                  </div>

                  {/* conteúdo */}
                  <div className={last ? "pb-2" : "pb-12"}>
                    <h3 className="font-serif text-2xl text-lace sm:text-[1.7rem]">{m.title}</h3>
                    <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-muted">
                      {m.text}
                    </p>
                    {last && (
                      <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2 text-[0.78rem] tracking-wide text-gold-light">
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                        Você sai com o próximo passo definido
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
