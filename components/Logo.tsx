/** Marca O Mundo Clínico — monograma + wordmark. */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-full border border-gold-deep font-serif text-sm text-gold"
        style={{ letterSpacing: "-0.06em" }}
      >
        MC
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[0.95rem] tracking-wide text-lace">O MUNDO</span>
          <span className="font-serif text-[0.95rem] tracking-[0.15em] text-gold">CLÍNICO</span>
        </span>
      )}
    </div>
  );
}
