"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** True only for mouse/trackpad input — gates hover-driven motion off touch devices. */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
