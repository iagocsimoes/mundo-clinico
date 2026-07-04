import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { SPONSOR_BENEFITS, EVENT } from "@/lib/data";

export default function Sponsorship() {
  return (
    <Section id="patrocinio" bg="surface">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead
            eyebrow="Patrocínio · 8 posições"
            title="Leve sua marca para dentro da maior imersão de negócios para clínicas do ES"
            lead="Uma oportunidade de colocar sua marca em frente a 100 profissionais da saúde com clínica ativa, poder de decisão e disposição de investir."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-start gap-3">
              <a href={EVENT.sponsorUrl} className="btn-gold">
                Quero informações sobre patrocínio
              </a>
              <p className="text-[0.78rem] tracking-wide text-muted">
                Vagas limitadas · solicite a proposta pelo botão acima
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-line bg-deep/50 p-8">
            <p className="eyebrow mb-5">O que está incluso na cota</p>
            <ul className="space-y-3.5">
              {SPONSOR_BENEFITS.map((b) => (
                <li key={b} className="flex gap-3 text-[0.9rem] leading-snug text-lace/90">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
