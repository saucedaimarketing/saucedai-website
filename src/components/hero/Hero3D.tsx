"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

// Lazy-load the WebGL scene so it never blocks initial page load —
// the hero copy renders immediately; particles fade in when ready.
const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => null,
});

// Sauced palette: a warm gold core breathing out of the void — the CSS
// analogue of the rising-light effect from the brand video. Inner stops
// are faint gold washes; everything past ~70% settles into the page void
// so the gradient blends seamlessly into the rest of the site.
const GOLD_GRADIENT_COLORS = [
  "rgba(201, 168, 76, 0.16)",
  "rgba(201, 168, 76, 0.07)",
  "rgba(46, 37, 16, 0.45)",
  "#0d0c08",
  "#0a0a0c",
];
const GOLD_GRADIENT_STOPS = [4, 14, 30, 52, 78];

export default function Hero3D() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"full" | "lite" | "static" | null>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer both device detection and canvas mount until the browser is
    // idle, so the text/LCP paint always wins over the WebGL work.
    const detect = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const smallScreen = window.matchMedia("(max-width: 767px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setMode(reducedMotion ? "static" : smallScreen || coarse ? "lite" : "full");
      setReady(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timerId: number | undefined;
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(detect, { timeout: 1200 });
    } else {
      timerId = window.setTimeout(detect, 350);
    }

    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  // Pause/unmount the GPU work entirely once the hero scrolls away.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {/* Breathing gold gradient — instant, no WebGL needed. Doubles as
          the static fallback and the loading state. Breathing is disabled
          when the visitor prefers reduced motion. */}
      <AnimatedGradientBackground
        Breathing={mode !== "static"}
        gradientColors={GOLD_GRADIENT_COLORS}
        gradientStops={GOLD_GRADIENT_STOPS}
        startingGap={110}
        breathingRange={10}
        animationSpeed={0.015}
        topOffset={30}
      />

      {mode && mode !== "static" && ready && inView && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <ParticleField
            count={mode === "lite" ? 1800 : 6000}
            animate={mode === "full"}
          />
        </div>
      )}
    </div>
  );
}
