"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  /** escala inicial (ex.: 0.96 para um leve zoom-in) */
  scale?: number;
  duration?: number;
  className?: string;
};

/** Fade + deslize/zoom suave quando o elemento entra na viewport (via useInView). */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  x = 0,
  scale = 1,
  duration = 0.75,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y, x, scale };
  const shown = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
