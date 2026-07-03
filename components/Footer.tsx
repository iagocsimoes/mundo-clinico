import Logo from "./Logo";
import { EVENT } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <Logo />
        <div className="gold-rule w-24 opacity-40" />
        <p className="max-w-md text-[0.82rem] leading-relaxed text-muted">
          {EVENT.name} · {EVENT.tagline}
          <br />
          {EVENT.date} · {EVENT.venue} · {EVENT.address}
        </p>
        <p className="text-[0.7rem] tracking-wide text-muted/60">
          © {EVENT.name.replace("Imersão ", "")} · O Mundo Clínico. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
