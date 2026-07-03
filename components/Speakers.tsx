import Image from "next/image";
import Reveal from "./Reveal";
import { SPEAKERS } from "@/lib/data";

export default function Speakers() {
  return (
    <section id="palestrantes" className="relative overflow-hidden bg-deep py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(900px 420px at 50% -8%, rgba(201,178,145,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {/* célula de cabeçalho (parte da grade) */}
          <div className="col-span-2 flex flex-col justify-center py-4 sm:col-span-3 lg:col-span-1 lg:pr-2">
            <Reveal>
              <p className="eyebrow mb-4">Palestrantes</p>
              <h2 className="font-serif text-[1.9rem] leading-[1.1] text-lace sm:text-[2.4rem] lg:text-[2rem]">
                Quem constrói <span className="gold-gradient-text">negócios de saúde</span> no Brasil
              </h2>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
                Não são coaches genéricos. Trajetórias verificáveis, de quem entende CRM, equipe e
                paciente na recepção.
              </p>
              <div className="mt-5 hidden items-center gap-2 text-[0.72rem] tracking-[0.14em] text-camel uppercase lg:flex">
                <span className="h-px w-8 bg-camel" /> 7 especialistas
              </div>
            </Reveal>
          </div>

          {/* retratos */}
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.08} y={24} duration={0.7}>
              <article className="group relative overflow-hidden rounded-2xl border border-gold/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep via-deep/15 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-1.5 h-px w-6 bg-gold/50 transition-all duration-300 group-hover:w-10" />
                    <h3 className="font-serif text-[1.05rem] leading-tight text-lace">{s.name}</h3>
                    <p className="mt-1 text-[0.62rem] tracking-[0.12em] text-camel uppercase">
                      {s.role}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
