"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TextTypewriter } from "@/components/ui/text-typewriter";

interface TypewriterHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  speed?: number;
}

export function TypewriterHeading({
  text,
  as = "h2",
  className,
  speed = 25,
}: TypewriterHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <TextTypewriter ref={ref} as={as} className={className} trigger={inView} speed={speed}>
      {text}
    </TextTypewriter>
  );
}
