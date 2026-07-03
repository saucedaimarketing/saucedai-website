"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is this really AI-generated content?",
    a: "The research, strategy, and scripts are built by an AI system — but it's trained specifically on what makes restaurant marketing work, not a general-purpose writing tool. Every script is grounded in real research about your restaurant and your market, and it's reviewed before it reaches you. You're not getting generic AI copy; you're getting a research process that happens to run on AI, with production-ready output at the end.",
  },
  {
    q: "Does this replace a videographer?",
    a: "No. We give you shoot-ready scripts — the hook, the shot list, the dialogue, the caption — but someone still needs to point a camera and shoot it. If you already have someone who films content for you, this is what they'll work from. If you don't, our LA creator network is available as an add-on to handle production too.",
  },
  {
    q: "How fast is turnaround?",
    a: "Your first full deliverable — research, strategy, and 10 scripts — is typically ready within the first couple of weeks of starting. After that, it's a monthly cadence: a fresh batch of scripts and a content calendar every month, so you're never waiting on ideas.",
  },
  {
    q: "What happens after the first month?",
    a: "You move to the ongoing monthly plan. We don't start over each month — the strategy builds on what we learned, and each new batch of scripts reflects what's actually working. You can add extra locations or influencer activation at any point, or stop at any time.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border bg-panel transition-colors ${
              isOpen ? "border-edge-strong" : "border-edge"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7"
            >
              <span className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-2xl text-gold transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="max-w-2xl px-6 pb-6 text-[14.5px] leading-relaxed text-fg-dim sm:px-7 sm:pb-7">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
