import Image from "next/image";
import Section, { SectionHead } from "./Section";
import Reveal from "./Reveal";
import { EVENT, VENUE } from "@/lib/data";

/* ícones — traço fino dourado, mesmo estilo do Hero */
function IconPin({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-gold"
    >
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconImage() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-gold/70"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="10.2" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5.5 16.5 9.5 12l3 3 3-3 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Área de fotos ----------
 * Adapta-se à quantidade em VENUE.photos (lib/data.ts):
 *   0 → placeholder · 1 → painel único · 2 → lado a lado · 3+ → 1 largo + 2 menores.
 * Novas fotos: adicione os arquivos em public/img/venue/ e liste em VENUE.photos.
 */
function PhotoFrame({
  src,
  index,
  sizes,
  className = "",
}: {
  src: string;
  index: number;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden border border-line bg-surface-2 ${className}`}>
      <Image
        src={src}
        alt={`${EVENT.venue} — foto do espaço ${index + 1}`}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function PhotoGrid() {
  const photos = VENUE.photos;

  // Sem fotos: placeholder discreto mantendo a proporção do painel.
  if (photos.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-line bg-surface-2 p-4">
        <IconImage />
        {/* camel (não muted): contraste AA sobre surface-2 para texto pequeno */}
        <p className="text-center text-xs text-camel">Foto do espaço · em breve</p>
      </div>
    );
  }

  // Uma foto: painel único preenchendo a coluna.
  if (photos.length === 1) {
    return (
      <PhotoFrame
        src={photos[0]}
        index={0}
        sizes="(max-width: 1024px) 100vw, 44vw"
        className="aspect-[3/2] w-full rounded-2xl"
      />
    );
  }

  // Duas fotos: lado a lado.
  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {photos.map((src, i) => (
          <PhotoFrame key={i} src={src} index={i} sizes="(max-width: 1024px) 50vw, 22vw" className="aspect-[4/5] rounded-xl" />
        ))}
      </div>
    );
  }

  // Três ou mais: 1 painel largo + 2 menores (fotos além do 3º slot são ignoradas).
  return (
    <div className="grid grid-cols-2 gap-4">
      <PhotoFrame src={photos[0]} index={0} sizes="(max-width: 1024px) 100vw, 44vw" className="col-span-2 aspect-[16/10] rounded-xl" />
      <PhotoFrame src={photos[1]} index={1} sizes="(max-width: 1024px) 50vw, 22vw" className="aspect-[4/3] rounded-xl" />
      <PhotoFrame src={photos[2]} index={2} sizes="(max-width: 1024px) 50vw, 22vw" className="aspect-[4/3] rounded-xl" />
    </div>
  );
}

/* Prévia decorativa de mapa (traçado abstrato), como no mock.
 * Pode ser trocada por um screenshot real do Google Maps quando disponível. */
function MapPreview() {
  return (
    <div
      aria-hidden
      className="relative mt-5 aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-2/70"
    >
      <svg
        className="absolute inset-0 h-full w-full text-gold/15"
        viewBox="0 0 200 150"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 38c58-10 122 16 200 4" stroke="currentColor" strokeWidth="1" />
        <path d="M0 98c70 12 140-14 200 2" stroke="currentColor" strokeWidth="1" />
        <path d="M52 0c8 52-6 100 8 150" stroke="currentColor" strokeWidth="1" />
        <path d="M138 0c-8 56 6 96-4 150" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
        <IconPin size={20} />
        <span className="rounded-full border border-gold/40 bg-deep/85 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {EVENT.venue}
        </span>
      </div>
    </div>
  );
}

export default function Venue() {
  return (
    <Section id="local" bg="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
        {/* ---------- Título + bullets ---------- */}
        <Reveal x={-24} y={0} className="lg:col-span-4">
          <SectionHead eyebrow="Onde acontece" title={VENUE.title} />

          <ul className="mt-8 space-y-4">
            {VENUE.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3.5 text-[0.95rem] leading-relaxed text-lace/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold" />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Fotos do espaço ---------- */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <PhotoGrid />
        </Reveal>

        {/* ---------- Card do local ---------- */}
        <Reveal delay={0.2} x={24} y={0} className="lg:col-span-3">
          <div className="rounded-2xl border border-line bg-deep/60 p-6 sm:p-7 lg:p-6">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/25 bg-gold/[0.06]"
              >
                <IconPin size={16} />
              </span>
              <div>
                <h3 className="font-serif text-xl leading-snug text-gold">{EVENT.venue}</h3>
                <p className="mt-0.5 text-sm text-muted">{EVENT.city}</p>
              </div>
            </div>

            <div className="gold-rule my-5 opacity-40" />

            <p className="flex items-center gap-2.5 text-sm font-semibold text-lace">
              <IconCalendar />
              {EVENT.date}
            </p>

            <MapPreview />

            <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">{EVENT.address}</p>

            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noopener"
              className="btn-ghost mt-6 w-full"
            >
              Ver no mapa <IconExternal />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
