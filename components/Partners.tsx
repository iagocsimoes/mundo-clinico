import Image from "next/image";
import Reveal from "./Reveal";

// ── Faixa de realização (logo abaixo do hero) ──────────────────────
// Assina o evento com a marca O Mundo Clínico (lockup dourado sobre a
// faixa escura). Substituiu a antiga faixa de "marcas e parceiros".
export default function Partners() {
  return (
    <section
      aria-label="Uma realização O Mundo Clínico"
      className="border-y border-line bg-ink py-11 sm:py-14"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        {/* eyebrow centralizado, flanqueado por hairlines douradas */}
        <Reveal y={16} duration={0.6}>
          <div className="flex items-center justify-center sm:gap-6">
            <span aria-hidden className="gold-rule hidden w-16 flex-none opacity-60 sm:block" />
            <p className="eyebrow text-center">Uma realização</p>
            <span aria-hidden className="gold-rule hidden w-16 flex-none opacity-60 sm:block" />
          </div>
        </Reveal>

        {/* lockup O Mundo Clínico — monograma + wordmark (fundo já recortado) */}
        <Reveal y={16} delay={0.12} duration={0.6}>
          <Image
            src="/img/omc-lockup.png"
            alt="O Mundo Clínico"
            width={1000}
            height={428}
            priority={false}
            className="mt-6 h-16 w-auto object-contain sm:mt-7 sm:h-20"
          />
        </Reveal>
      </div>
    </section>
  );
}
