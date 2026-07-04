import Section from "./Section";
import Reveal from "./Reveal";
import { EVENT, FEATURES } from "@/lib/data";

/* ícones das três entregas — traço fino dourado, mesma ordem de FEATURES */
function IconDoc() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <path
        d="M7 3.5h7L18.5 8v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 12.5h7M8.5 16h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconPeople() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 5.9a3 3 0 1 1 0 5.2M17 14.6c2.1.5 3.5 2.2 3.5 4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <path
        d="M3.5 4v15a1.5 1.5 0 0 0 1.5 1.5h15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m7 15.5 4-4.5 3 2.5 5.5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8 7.5h3.7v3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURE_ICONS = [IconDoc, IconPeople, IconChart];

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
                Profissionais da saúde que chegaram a um ponto específico:{" "}
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

        {/* três entregas centrais (FEATURES) — cards no estilo do mock */}
        <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? IconDoc;
            return (
              <Reveal key={feature.title} delay={0.16 + i * 0.08} y={22} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-deep/60 p-6 sm:p-7">
                  <Icon />
                  <h3 className="mt-5 font-serif text-lg leading-snug text-lace">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.text}</p>
                </article>
              </Reveal>
            );
          })}
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
