"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterTag = "h1" | "h2" | "h3" | "p" | "span";

interface TextTypewriterProps {
  children: string;
  as?: TypewriterTag;
  className?: string;
  speed?: number;
  trigger?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export function TextTypewriter({
  children,
  as: Tag = "p",
  className,
  speed = 35,
  trigger = true,
  ref,
}: TextTypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const startedRef = useRef(false);
  const text = children;

  useEffect(() => {
    if (!trigger || startedRef.current) return;

    startedRef.current = true;
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const content = (
    <>
      {displayText}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.05em] bg-current align-middle"
        style={{ opacity: trigger && displayText.length < text.length ? 1 : 0 }}
      />
    </>
  );

  switch (Tag) {
    case "h1":
      return (
        <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {content}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
          {content}
        </h3>
      );
    case "span":
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={className}>
          {content}
        </span>
      );
    default:
      return (
        <p ref={ref as React.Ref<HTMLParagraphElement>} className={className}>
          {content}
        </p>
      );
  }
}
