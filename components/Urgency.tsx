import Reveal from "./Reveal";
import { EVENT } from "@/lib/data";

export default function Urgency() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 340px at 50% -10%, rgba(2,80,51,0.5), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Urgência</p>
          <h2 className="font-serif text-3xl leading-tight text-lace sm:text-5xl">
            100 vagas. 15 no Experience. <span className="gold-gradient-text">Sem segunda chamada.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            A curadoria do público é parte do produto. Quando as vagas esgotam, esgotam.{" "}
            <span className="text-lace">{EVENT.date}. O dia está marcado.</span>
          </p>
          <a href={EVENT.checkoutUrl} className="btn-gold mt-9">
            Garantir minha vaga agora
          </a>
        </Reveal>
      </div>
    </section>
  );
}
