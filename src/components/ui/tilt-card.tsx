"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !isFinePointer) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
