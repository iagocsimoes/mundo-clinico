import Reveal from "./Reveal";
import { EVENT } from "@/lib/data";

export default function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-deep py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 420px at 50% 120%, rgba(2,80,51,0.55), transparent 60%)," +
            "radial-gradient(600px 300px at 50% -10%, rgba(201,178,145,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-6">O próximo nível começa com uma decisão</p>
          <h2 className="font-serif text-3xl leading-[1.12] text-lace sm:text-5xl">
            Profissionais da saúde que chegaram onde você quer chegar não chegaram lá trabalhando
            mais.
            <br className="hidden sm:block" />{" "}
            <span className="gold-gradient-text">Chegaram lá enxergando diferente.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted">
            A Virada Clínica é a maior imersão de negócios para clínicas do Espírito Santo. E
            acontece uma vez.
          </p>
          <p className="mt-4 font-serif text-lg text-gold">
            {EVENT.date}. {EVENT.venue}. {EVENT.city}.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <a href={EVENT.checkoutUrl} className="btn-gold mt-9">
            Quero minha vaga na Imersão Virada Clínica
          </a>
        </Reveal>
      </div>
    </section>
  );
}
