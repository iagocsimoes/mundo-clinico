import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { AUDIENCE } from "@/lib/data";

/* ícones dos dois perfis — traço fino dourado, mesma ordem de AUDIENCE */
function IconClinic() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <path
        d="M5 20.5V6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 20.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 8v4M10 10h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 20.5V17h5v3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <path
        d="M4 13a8 8 0 0 1 7 7 6 6 0 0 0 3-5 9 9 0 0 0 6-8 3 3 0 0 0-3-3 9 9 0 0 0-8 6 6 6 0 0 0-5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 14a6 6 0 0 0-3 6 6 6 0 0 0 6-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="9" r="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const AUDIENCE_ICONS = [IconClinic, IconRocket];

export default function Audience() {
  return (
    <Section id="para-quem" bg="surface">
      <SectionHead
        eyebrow="Para quem é"
        title="Quem está na sala no dia 01 de agosto"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {AUDIENCE.map((group, i) => {
          const Icon = AUDIENCE_ICONS[i] ?? IconClinic;
          return (
            <Reveal key={group.title} delay={i * 0.12}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-deep/50 p-8 sm:p-9">
                {/* ícone circular no topo, como no mock */}
                <span
                  aria-hidden
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06]"
                >
                  <Icon />
                </span>

                <h3 className="mt-5 text-center font-serif text-xl leading-snug text-gold sm:text-[1.35rem]">
                  {group.title}
                </h3>

                <div className="gold-rule my-6 w-full opacity-40" />

                <ul className="w-full space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3.5 text-[0.95rem] leading-relaxed text-lace/90"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
