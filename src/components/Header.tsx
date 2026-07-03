"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { AnimatedText } from "@/components/ui/animated-shiny-text";

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-study", label: "Case study" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-void/70 py-2 pr-2 pl-5 backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={40}
              className="h-6 w-auto"
              priority
            />
            <AnimatedText
              text="SAUCED"
              hoverEffect
              textClassName="font-display text-base font-bold tracking-[0.08em]"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[13px] text-fg-dim transition-colors hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonColorful asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/apply">Apply now</Link>
            </ButtonColorful>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-white/5 md:hidden"
            >
              <span
                className={`h-px w-5 bg-fg transition-transform ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-fg transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-px w-5 bg-fg transition-transform ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-void/85 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col p-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-[15px] text-fg transition-colors hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <ButtonColorful asChild className="mt-2 w-full">
                <Link href="/apply" onClick={() => setOpen(false)}>
                  Apply now
                </Link>
              </ButtonColorful>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
