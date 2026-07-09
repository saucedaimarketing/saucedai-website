import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Button } from "@/components/ui/button";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";

const GLOW_PROPS = {
  variant: "gold" as const,
  spread: 40,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
  borderWidth: 2,
};

const TITLE = "Pricing — Sauced";
const DESCRIPTION =
  "One system, everything included. No production agency on the side.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/pricing",
    type: "website",
    images: [{ url: "/hero-poster.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-poster.jpg"],
  },
};

export default function Pricing() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Pricing"
          title="Everything included. No production agency on the side."
          subhead="Research, strategy, and content — one monthly engagement, not three separate vendors."
        />

        <div className="relative">
          <BackgroundPaths />

          <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              Now accepting 5 founding partners this quarter
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Founding offer card */}
              <TiltCard
                maxTilt={4}
                className="relative rounded-3xl border border-gold/60 bg-panel p-8 sm:p-10"
              >
                <GlowingEffect {...GLOW_PROPS} />
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-4 py-1 text-[10px] font-semibold tracking-[0.15em] text-void uppercase">
                  Founding offer
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-fg">
                  First month
                </h2>
                <div className="mt-6 flex items-baseline gap-3">
                  <CountUp
                    value={1500}
                    prefix="$"
                    className="font-display text-5xl font-bold tracking-tight text-gold"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  Full research pipeline, complete growth strategy, 10 scripts,
                  and a full content calendar — everything included.
                </p>
                <p className="mt-3 text-xs font-medium text-gold">
                  Founding pricing — ends once this cohort is full.
                </p>
                <ButtonColorful asChild size="sm" className="mt-8">
                  <Link href="/apply">Apply now</Link>
                </ButtonColorful>
              </TiltCard>

              {/* Ongoing card */}
              <TiltCard
                maxTilt={4}
                className="relative rounded-3xl border border-edge bg-panel p-8 sm:p-10"
              >
                <GlowingEffect {...GLOW_PROPS} />
                <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                  Ongoing
                </h2>
                <div className="mt-6 flex items-baseline gap-2">
                  <CountUp
                    value={500}
                    prefix="$"
                    className="font-display text-5xl font-bold tracking-tight text-fg"
                  />
                  <span className="text-sm text-fg-dim">/month</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  The same complete system, every month — refreshed research,
                  a new strategy pass, and 10 new shoot-ready scripts.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-8">
                  <Link href="/apply">Apply now</Link>
                </Button>
              </TiltCard>
            </div>

            {/* Add-ons */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <TiltCard className="relative rounded-3xl border border-edge bg-panel p-8">
                <GlowingEffect {...GLOW_PROPS} />
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                  Add-on
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-fg">
                  Extra location
                </h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold tracking-tight text-fg">
                    $1,200
                  </span>
                  <span className="text-sm text-fg-dim">first month</span>
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-xl font-bold tracking-tight text-fg">
                    $400
                  </span>
                  <span className="text-sm text-fg-dim">/month after</span>
                </p>
                <p className="mt-3 text-xs font-medium text-gold">
                  20% off both, for every location beyond your first.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  Run the full system for each additional location — its own
                  research, strategy, and scripts.
                </p>
              </TiltCard>

              <TiltCard className="relative rounded-3xl border border-edge bg-panel p-8">
                <GlowingEffect {...GLOW_PROPS} />
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                  Add-on
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-fg">
                  Influencer activation
                </h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold tracking-tight text-fg">
                    $1,400
                  </span>
                  <span className="text-sm text-fg-dim">/month</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  Plug into our LA creator network for influencer and
                  user-generated content built on the same strategy.
                </p>
              </TiltCard>
            </div>
          </div>
        </section>

          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
              <TypewriterHeading
                as="h2"
                text="Ready to see what we'd find for your restaurant?"
                className="font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl"
              />
              <ButtonColorful asChild className="mt-8">
                <Link href="/apply">Apply now</Link>
              </ButtonColorful>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
