"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false // server snapshot
  );
}

/**
 * Brand video hero background: the gold particle-transformation clip,
 * compressed to a 2.7MB seamless ping-pong loop. The poster frame paints
 * instantly; the video fades in when it can play. Visitors who prefer
 * reduced motion get the still poster only.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setPlaying(true);
    v.addEventListener("playing", onPlaying);
    // Autoplay can be blocked in odd embeds; try explicitly.
    v.play().catch(() => {});
    return () => v.removeEventListener("playing", onPlaying);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Poster paints immediately (also the reduced-motion fallback) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!reducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Legibility scrim: keeps the centered headline crisp over the
          bright gold column, and eases the video into the page void at
          the bottom edge. */}
      <div className="absolute inset-0 bg-void/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
