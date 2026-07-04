import Image from "next/image";
import Reveal from "./Reveal";
import { SPEAKERS } from "@/lib/data";

// Grade com colunas duplas (cada card ocupa 2) para centralizar linhas incompletas dos 7 itens:
// mobile 2 col (2+2+2+1), tablet 3 col (3+3+1), desktop 4 col (4+3).
const GRID_POS: Record<number, string> = {
  4: "lg:col-start-2", // 5º item abre a última linha centralizada no desktop
  6: "col-start-2 sm:col-start-3 lg:col-start-auto", // 7º item centralizado no mobile/tablet
};

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
        {/* cabeçalho centralizado, como no mock */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">Palestrantes</p>
            <h2 className="font-serif text-[1.9rem] leading-[1.1] text-lace sm:text-[2.4rem]">
              Quem constrói <span className="gold-gradient-text">negócios de saúde</span> no Brasil
            </h2>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              Não são coaches genéricos. Trajetórias verificáveis, de quem entende CRM, equipe e
              paciente na recepção.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 text-[0.72rem] tracking-[0.14em] text-camel uppercase">
              <span className="h-px w-8 bg-camel/60" />
              7 especialistas
              <span className="h-px w-8 bg-camel/60" />
            </div>
          </div>
        </Reveal>

        {/* retratos — lista semântica: SR anuncia "lista, 7 itens" */}
        <ul className="mt-12 grid grid-cols-4 gap-3 sm:mt-14 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
          {SPEAKERS.map((s, i) => (
            <li key={s.name} className={["col-span-2", GRID_POS[i]].filter(Boolean).join(" ")}>
              <Reveal className="h-full" delay={(i % 4) * 0.08} y={24} duration={0.7}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
                  {/* retrato com moldura sutil — alt vazio: o nome já está no h3 adjacente */}
                  <div className="p-2 pb-0 sm:p-2.5 sm:pb-0">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-deep">
                      <Image
                        src={s.img}
                        alt=""
                        fill
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      {/* gradiente escuro fundindo a base do retrato ao card */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface via-surface/40 to-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col items-center px-3 pt-3.5 pb-5 text-center">
                    <h3 className="font-serif text-[1.02rem] leading-tight text-lace">{s.name}</h3>
                    <p className="mt-1.5 text-[0.65rem] leading-relaxed tracking-[0.16em] text-camel uppercase">
                      {s.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* linha de fechamento da grade, como no mock */}
        <Reveal delay={0.15}>
          <p className="mt-10 text-center font-serif text-[0.95rem] text-muted italic">
            + nomes e convidados especiais ao longo do dia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
