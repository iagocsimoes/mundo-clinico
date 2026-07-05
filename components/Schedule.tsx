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
    gift: (
      <>
        <rect x="4.5" y="9.5" width="15" height="11" rx="1.5" {...p} />
        <path d="M3.5 9.5h17M12 9.5v11" {...p} />
        <path d="M12 9.5C11 6.8 9 5.4 7.7 6.5c-1.3 1.1-.1 3 4.3 3ZM12 9.5c1-2.7 3-4.1 4.3-3 1.3 1.1.1 3-4.3 3Z" {...p} />
      </>
    ),
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      {paths[name]}
    </svg>
  );
}

/** Nó da timeline — preenchido em gold quando o slot é uma Experiência. */
function Node({ slot }: { slot: ScheduleSlot }) {
  return (
    <div
      className={`z-10 grid h-11 w-11 flex-none place-items-center rounded-full border ${
        slot.tag
          ? "border-gold-light/70 bg-gold text-ink shadow-[0_0_28px_-6px_rgba(201,178,145,0.6)]"
          : "border-line bg-surface-2 text-camel"
      }`}
    >
      <Icon name={slot.icon} />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-gold/30 bg-gold/[0.07] px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-gold-light uppercase">
      {children}
    </span>
  );
}

/** Rótulo do período com "colchete" apontando para o grupo de slots (como no mock). */
function PeriodBracket({ label }: { label: string }) {
  return (
    <div className="relative mx-8 h-3 rounded-t-lg border-x border-t border-line">
      <p className="eyebrow absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-deep px-4">
        {label}
      </p>
    </div>
  );
}

// Divisão dos períodos pelo meio-dia: manhã (até 12h) e tarde (12h em diante)
const hourOf = (time: string) => parseInt(time, 10);
const GROUPS = [
  { label: "Manhã", slots: SCHEDULE.filter((s) => hourOf(s.time) < 12) },
  { label: "Tarde", slots: SCHEDULE.filter((s) => hourOf(s.time) >= 12) },
];

export default function Schedule() {
  return (
    <Section id="programacao" className="overflow-hidden">
      <SectionHead
        eyebrow="Programação"
        title="O dia que você vai viver"
        lead="Das 07h às 21h — conteúdo, conexões e experiências pensadas para durar o dia inteiro."
        center
      />

      {/* ---------- Desktop: timeline horizontal em dois períodos ---------- */}
      <div className="mt-16 hidden lg:block">
        {/* rótulos MANHÃ / TARDE */}
        <div className="flex gap-x-10">
          {GROUPS.map((g, gi) => (
            <div key={g.label} className="min-w-0 basis-0" style={{ flexGrow: g.slots.length }}>
              <Reveal delay={gi * 0.2} y={14} duration={0.6}>
                <PeriodBracket label={g.label} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* trilha: linha dourada contínua atravessando os dois períodos + nós com ícones */}
        <div className="relative mt-9">
          <div aria-hidden className="gold-rule absolute inset-x-0 top-[22px]" />
          <div className="flex gap-x-10">
            {GROUPS.map((g, gi) => {
              const offset = gi === 0 ? 0 : GROUPS[0].slots.length;
              return (
                <ol
                  key={g.label}
                  className="grid min-w-0 basis-0 auto-cols-fr grid-flow-col gap-x-3"
                  style={{ flexGrow: g.slots.length }}
                >
                  {g.slots.map((s, i) => (
                    <li key={s.time + s.label} className="min-w-0">
                      <Reveal delay={0.08 + (offset + i) * 0.07} y={18} duration={0.6}>
                        <div className="flex flex-col items-center px-1 text-center">
                          <Node slot={s} />
                          <p className="mt-4 font-serif text-[1.05rem] text-gold">{s.time}</p>
                          <h3 className="mt-1 font-serif text-[0.95rem] leading-snug text-lace">
                            {s.label}
                          </h3>
                          {s.desc && (
                            <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{s.desc}</p>
                          )}
                          {s.tag && (
                            <div className="mt-2.5">
                              <Tag>{s.tag}</Tag>
                            </div>
                          )}
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Mobile/tablet: timeline vertical com linha à esquerda ---------- */}
      <div className="mx-auto mt-12 max-w-2xl lg:hidden">
        {GROUPS.map((g, gi) => (
          <div key={g.label} className={gi > 0 ? "mt-10" : undefined}>
            <Reveal y={14} duration={0.55}>
              <div className="mb-6 flex items-center gap-4">
                <p className="eyebrow">{g.label}</p>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
              </div>
            </Reveal>

            <ol>
              {g.slots.map((s, i) => {
                const last = i === g.slots.length - 1;
                return (
                  <li key={s.time + s.label}>
                    <Reveal delay={0.05 + i * 0.05} y={16} duration={0.55} className="flex gap-4 sm:gap-6">
                      {/* horário */}
                      <div className="w-12 flex-none pt-2 text-right font-serif text-sm text-gold sm:w-16 sm:text-base">
                        {s.time}
                      </div>

                      {/* trilha + nó/ícone */}
                      <div className="relative flex flex-none flex-col items-center">
                        <Node slot={s} />
                        {!last && (
                          <div
                            aria-hidden
                            className="my-1 w-px flex-1 bg-gradient-to-b from-line via-line to-transparent"
                          />
                        )}
                      </div>

                      {/* conteúdo */}
                      <div className={last ? "pb-1 pt-2" : "pb-8 pt-2"}>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-serif text-lg text-lace sm:text-xl">{s.label}</h3>
                          {s.tag && <Tag>{s.tag}</Tag>}
                        </div>
                        {s.desc && <p className="mt-1 text-[0.9rem] text-muted">{s.desc}</p>}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-[0.78rem] tracking-wide text-muted">
        Programação sujeita a pequenos ajustes · a essência do dia está mantida.
      </p>
    </Section>
  );
}
