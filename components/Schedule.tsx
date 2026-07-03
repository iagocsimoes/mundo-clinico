import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { SCHEDULE } from "@/lib/data";
import type { ScheduleSlot } from "@/lib/data";

function Icon({ name }: { name: ScheduleSlot["icon"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<ScheduleSlot["icon"], React.ReactNode> = {
    badge: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" {...p} />
        <path d="M9 3v3h6V3M9 12h6M9 16h4" {...p} />
      </>
    ),
    star: <path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.2l5.4-.8L12 3.5Z" {...p} />,
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" {...p} />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" {...p} />
      </>
    ),
    plate: (
      <>
        <circle cx="12" cy="12" r="7.5" {...p} />
        <circle cx="12" cy="12" r="3" {...p} />
      </>
    ),
    glass: (
      <>
        <path d="M6 4h9l-1 4a4 4 0 0 1-4 3.2A4 4 0 0 1 6 7.4V4Z" {...p} />
        <path d="M15 6h2.5a2 2 0 0 1 0 4H14M10 12v6M7.5 21h5" {...p} />
      </>
    ),
    cheers: (
      <>
        <path d="M7 3l2.2 6.5a3 3 0 0 1-5.7 1.9L3 5M17 3l-2.2 6.5a3 3 0 0 0 5.7 1.9L21 5" {...p} />
        <path d="M6.2 20l3-3M17.8 20l-3-3M9 20h6" {...p} />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" {...p} />
        <path d="M8.5 12.5l2.3 2.3 4.7-5" {...p} />
      </>
    ),
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export default function Schedule() {
  return (
    <Section id="programacao" className="overflow-hidden">
      <SectionHead
        eyebrow="Programação"
        title="O dia que você vai viver"
        lead="Das 08h às 21h — conteúdo, conexões e experiências pensadas para durar o dia inteiro."
        center
      />

      <ol className="mx-auto mt-14 max-w-2xl">
        {SCHEDULE.map((s, i) => {
          const last = i === SCHEDULE.length - 1;
          return (
            <Reveal key={s.time + s.label} delay={i * 0.06} y={18} duration={0.6}>
              <li className="flex gap-4 sm:gap-6">
                {/* horário */}
                <div className="w-12 flex-none pt-2 text-right font-serif text-sm text-gold sm:w-16 sm:text-base">
                  {s.time}
                </div>

                {/* trilha + nó/ícone */}
                <div className="relative flex flex-none flex-col items-center">
                  <div
                    className={`z-10 grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                      s.tag
                        ? "border-gold/60 bg-gold/15 text-gold"
                        : "border-line bg-surface-2 text-camel"
                    }`}
                  >
                    <Icon name={s.icon} />
                  </div>
                  {!last && (
                    <div className="my-1 w-px flex-1 bg-gradient-to-b from-line via-line to-transparent" />
                  )}
                </div>

                {/* conteúdo */}
                <div className={last ? "pb-1 pt-2" : "pb-8 pt-2"}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-serif text-lg text-lace sm:text-xl">{s.label}</h3>
                    {s.tag && (
                      <span className="rounded-full border border-gold/30 bg-gold/[0.07] px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-gold-light uppercase">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  {s.desc && <p className="mt-1 text-[0.9rem] text-muted">{s.desc}</p>}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>

      <p className="mt-10 text-center text-[0.78rem] tracking-wide text-muted">
        Programação sujeita a pequenos ajustes · a essência do dia está mantida.
      </p>
    </Section>
  );
}
