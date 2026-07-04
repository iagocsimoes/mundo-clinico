"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { EVENT } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-deep/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Logo />
        {/* 5 links + CTA não cabem em 768px — menu só a partir de lg */}
        <nav className="hidden items-center gap-8 text-[0.8rem] font-medium tracking-wide text-muted lg:flex">
          <a href="#imersao" className="transition-colors hover:text-gold">
            A imersão
          </a>
          <a href="#palestrantes" className="transition-colors hover:text-gold">
            Palestrantes
          </a>
          <a href="#programacao" className="transition-colors hover:text-gold">
            Programação
          </a>
          <a href="#ingressos" className="transition-colors hover:text-gold">
            Ingressos
          </a>
          <a href="#faq" className="transition-colors hover:text-gold">
            FAQ
          </a>
        </nav>
        <a href={EVENT.checkoutUrl} className="btn-gold !px-5 !py-3 !text-[0.7rem]">
          Garantir vaga
        </a>
      </div>
    </header>
  );
}
