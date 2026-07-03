import Section from "./Section";
import Reveal from "./Reveal";
import { EVENT } from "@/lib/data";

export default function ValueProp() {
  return (
    <Section id="imersao" bg="surface" className="overflow-hidden">
      {/* marca d'água */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center pt-4"
      >
        <span className="select-none font-serif text-[22vw] leading-none text-lace/[0.018]">
          virada
        </span>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* eyebrow com filetes */}
        <Reveal>
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-camel" />
            <span className="eyebrow">A Virada Clínica</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-camel" />
          </div>
        </Reveal>

        <Reveal delay={0.05} y={14} scale={0.97} duration={0.8}>
          <h2 className="text-center font-serif text-[1.9rem] leading-[1.12] text-lace sm:text-[2.6rem]">
            É o ambiente onde a <span className="gold-gradient-text">virada acontece.</span>
          </h2>
        </Reveal>

        {/* dois painéis: o ponto × a experiência */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          <Reveal delay={0.12} x={-36} y={0} duration={0.85} className="bg-deep/60">
            <div className="flex h-full flex-col p-8 sm:p-9">
              <div className="mb-5 flex items-center gap-2.5">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-camel" />
                <p className="eyebrow">O ponto da carreira</p>
              </div>
              <p className="font-serif text-xl leading-relaxed text-muted sm:text-[1.35rem]">
                Médicos que chegaram a um ponto específico:{" "}
                <span className="text-lace">ocupados, mas sem crescer.</span> Atendendo, mas{" "}
                <span className="text-lace">sem escalar.</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={36} y={0} duration={0.85} className="relative bg-gold/[0.05]">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-[3px] bg-gradient-to-b from-gold to-camel md:block"
            />
            <div className="flex h-full flex-col p-8 sm:p-9">
              <div className="mb-5 flex items-center gap-2.5">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                <p className="eyebrow text-gold">O que você vive aqui</p>
              </div>
              <p className="font-serif text-xl leading-relaxed text-lace/95 sm:text-[1.35rem]">
                Um dia inteiro de conteúdo real, conexões de alto nível e decisões concretas.{" "}
                <span className="text-muted">Não é congresso. Não é palestra motivacional.</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3">
            <a href={EVENT.checkoutUrl} className="btn-gold">
              Garantir minha vaga
            </a>
            <p className="text-[0.78rem] tracking-wide text-muted">
              Apenas {EVENT.seats} vagas · {EVENT.date} · {EVENT.city}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
