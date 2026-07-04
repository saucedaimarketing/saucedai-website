"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Subtle per-element scroll reveal: un-tilts from a slight 3D angle and
 * settles into place as the element scrolls into view. Tuned deliberately
 * small (6deg / 3% scale) — a hint of physicality, not a hero-card zoom.
 */
export function ScrollRevealCard({ children, className }: ScrollRevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 45%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, scale, opacity, y, transformPerspective: 1200 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
