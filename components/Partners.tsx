import Reveal from "./Reveal";
import { PARTNERS } from "@/lib/data";

// ── Faixa "Marcas e parceiros confirmados" (logo abaixo do hero) ────
// Enquanto os logos oficiais não chegam, cada parceiro é renderizado como
// wordmark tipográfica. As variações abaixo ciclam por índice para que os
// nomes tenham pesos/tamanhos levemente diferentes, como logos reais.
const WORDMARK_STYLES = [
  "font-serif text-lg tracking-[0.06em] sm:text-xl",
  "text-[0.72rem] font-bold uppercase tracking-[0.3em] sm:text-[0.78rem]",
  "font-serif text-base uppercase tracking-[0.16em] sm:text-lg",
  "text-[0.8rem] font-semibold uppercase tracking-[0.22em] sm:text-sm",
];

export default function Partners() {
  return (
    <section
      aria-label="Marcas e parceiros confirmados"
      className="border-y border-line bg-ink py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* eyebrow centralizado, flanqueado por hairlines douradas (como no mock) */}
        <Reveal y={16} duration={0.6}>
          <div className="flex items-center justify-center sm:gap-6">
            {/* hairlines só a partir de sm — em 360px o eyebrow ocupa a linha inteira */}
            <span aria-hidden className="gold-rule hidden w-16 flex-none opacity-60 sm:block" />
            <p className="eyebrow text-center">Marcas e parceiros confirmados</p>
            <span aria-hidden className="gold-rule hidden w-16 flex-none opacity-60 sm:block" />
          </div>
        </Reveal>

        {/*
          QUANDO OS LOGOS CHEGAREM em public/img/partners/:
          troque o <span> de cada item pelo componente <Image> do next/image
          (adicione `import Image from "next/image";` no topo):

            <Image
              src="/img/partners/enjoy-business.png"  // nome do arquivo em kebab-case
              alt={name}
              width={220}                              // use as dimensões reais do arquivo
              height={64}
              className="h-7 w-auto object-contain opacity-75 transition-opacity
                         duration-300 hover:opacity-100 sm:h-8"
            />

          Altura fixa (h-7/h-8) + w-auto + object-contain mantém logos paisagem na
          proporção natural, sem zoom. Ideal: evoluir PARTNERS em lib/data.ts para
          { name, img } e mapear direto, sem derivar slug do nome aqui.
        */}
        <Reveal y={16} delay={0.12} duration={0.6}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:mt-9 sm:gap-x-14">
            {PARTNERS.map((name, i) => (
              <li key={name}>
                <span
                  className={`block select-none whitespace-nowrap text-muted transition-colors duration-300 hover:text-gold ${
                    WORDMARK_STYLES[i % WORDMARK_STYLES.length]
                  }`}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
