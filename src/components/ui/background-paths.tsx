"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Animated flowing-path background (from the BackgroundPaths block).
 * Restyled for the Sauced system: gold strokes over the void instead of
 * slate/white, and `preserveAspectRatio: slice` so the drawing covers
 * tall multi-section containers instead of letterboxing.
 */
export function FloatingPaths({ position }: { position: number }) {
  // Fewer, thinner, fainter lines than the original 36 — every other
  // path index is kept so the curves stay spread across the same area.
  const paths = Array.from({ length: 18 }, (_, n) => {
    const i = n * 2;
    return {
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.3 + i * 0.015,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-gold"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.008}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              // Deterministic per-path spread over 20-30s — same visual
              // variety as the original's Math.random(), but pure, so
              // re-renders don't reshuffle every animation.
              duration: 20 + ((path.id * 7919) % 100) / 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Full-bleed decorative layer: both path directions overlaid. Drop inside
 * any `relative` container. The paths render in a viewport-fixed layer
 * (so the drawing stays at its intended scale instead of stretching over
 * the whole container height) and fade in only while the host container
 * is on screen — which keeps the effect out of the hero above it.
 */
export function BackgroundPaths() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sentinelRef} aria-hidden="true" className="absolute inset-0">
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {visible && (
          <>
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </>
        )}
      </div>
    </div>
  );
}
