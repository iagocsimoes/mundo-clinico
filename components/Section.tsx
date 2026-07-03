import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** cor de fundo da seção */
  bg?: "base" | "surface" | "ink";
};

const BG: Record<string, string> = {
  base: "bg-deep",
  surface: "bg-surface",
  ink: "bg-ink",
};

export default function Section({ id, children, className = "", bg = "base" }: SectionProps) {
  return (
    <section id={id} className={`relative ${BG[bg]} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

/** Cabeçalho padrão de seção (eyebrow + título serif + lead opcional). */
export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-serif text-3xl leading-tight text-gold sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lead && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
    </div>
  );
}
