import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "How It Works — Sauced",
  description:
    "Research, strategy, and shoot-ready scripts — the Sauced system, every month.",
};

const STEPS = [
  {
    n: "01",
    title: "Deep research",
    body: "We study your restaurant, your local market, and the customer who's already deciding between you and the place next door — real reviews, real competitors, real gaps.",
  },
  {
    n: "02",
    title: "A complete growth strategy",
    body: "The mechanisms that make your food genuinely different, the specific customers who'll respond to them, and the angles that connect the two into content worth making.",
  },
  {
    n: "03",
    title: "10 shoot-ready scripts + a content calendar",
    body: "Every month, you get ten production-ready scripts and a full calendar — hooks, shot lists, captions, all mapped to the strategy. Hand it to whoever's holding the camera.",
  },
  {
    n: "04",
    title: "Influencer & UGC activation",
    body: "Optional. Once the content system is running, we can plug you into our LA-based network of creators and everyday customers for influencer and user-generated content.",
    optional: true,
  },
];

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="How it works"
          title="Research first. Everything else follows."
          subhead="We don't start with a camera. We start by figuring out exactly why someone should choose you — then build the content around it."
        />

        <div className="relative">
          <BackgroundPaths />

          <section className="relative">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
              <div className="flex flex-col gap-5">
                {STEPS.map((step) => (
                  <TiltCard
                    key={step.n}
                    maxTilt={2}
                    className="relative grid gap-4 rounded-2xl border border-edge bg-panel p-7 sm:grid-cols-[90px_1fr] sm:gap-8 sm:p-9"
                  >
                    <GlowingEffect
                      variant="gold"
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <span className="font-display text-sm font-semibold tracking-widest text-gold">
                      {step.n}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                          {step.title}
                        </h2>
                        {step.optional && (
                          <span className="rounded-full border border-edge-strong px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-fg-dim uppercase">
                            Optional add-on
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-fg-dim">
                        {step.body}
                      </p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>

          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
              <TypewriterHeading
                as="h2"
                text="Want to see this system applied to a real restaurant?"
                className="font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl"
              />
              <ButtonColorful asChild className="mt-8">
                <Link href="/case-study">See a real example</Link>
              </ButtonColorful>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
