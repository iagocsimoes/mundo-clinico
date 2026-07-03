"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENT } from "@/lib/data";

export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-deep/90 px-4 py-3 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.72rem] text-muted">
                {EVENT.dateShort} · {EVENT.city}
              </p>
              <p className="text-[0.78rem] font-semibold text-gold">
                Apenas {EVENT.seats} vagas
              </p>
            </div>
            <a href={EVENT.checkoutUrl} className="btn-gold !px-5 !py-3 !text-[0.68rem]">
              Garantir vaga
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
