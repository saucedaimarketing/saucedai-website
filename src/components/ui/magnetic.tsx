"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 14, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !isFinePointer) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
