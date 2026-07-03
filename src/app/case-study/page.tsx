import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "Case Study — Jerrell's Betr Brgr — Sauced",
  description:
    "How we're repositioning a plant-based burger spot in SoHo away from the vegan category and into the burger category.",
};

const ANGLES = [
  {
    title: "The Double-Take",
    body: "A meat-eater takes a bite, reacts, then finds out what he just ate. The surprise is the proof.",
  },
  {
    title: "Order It Over Beef",
    body: "Not the vegan option — the option. Positioned as a straight-up better burger, full stop.",
  },
  {
    title: "Real Char. Real Crust. No Beef.",
    body: "Leads with the sear and the texture — the parts of a great burger people actually taste first.",
  },
];

export default function CaseStudy() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Current partner"
          title="Jerrell's Betr Brgr — SoHo, NYC"
          subhead="This is an active engagement, not a finished result. Here's the thinking so far."
          typewriter={false}
        />

        <div className="relative">
          <BackgroundPaths />

          <section className="relative">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              The situation
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">
              Jerrell&apos;s Betr Brgr makes a plant-based burger in one of the
              most competitive burger markets in the world. Like most
              plant-based spots, it was being marketed as a vegan
              restaurant — which meant it was competing for a small,
              already-loyal audience, against every other vegan restaurant
              in the city, for a shrinking slice of attention.
            </p>

            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              What our research found
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">
              The real opportunity wasn&apos;t to market harder to vegans —
              it was to stop competing in that category entirely.
              We reframed the strategy around one idea:
            </p>
            <TypewriterHeading
              as="p"
              text="Stop competing as a vegan restaurant. Start competing as the burger a meat-eater orders on purpose."
              className="mt-6 border-l-2 border-gold pl-6 font-display text-xl font-bold leading-snug tracking-tight text-fg sm:text-2xl"
            />
            <p className="mt-6 text-[15px] leading-relaxed text-fg-dim">
              That single shift changes who the content is for, what it
              says, and what it proves — the plant-based part becomes a
              reveal, not the headline.
            </p>

            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              The launch angles
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-fg-dim">
              A few of the angles that came out of the strategy work:
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {ANGLES.map((angle) => (
                <TiltCard
                  key={angle.title}
                  maxTilt={4}
                  className="rounded-2xl border border-edge bg-panel p-6 transition-colors hover:border-edge-strong"
                >
                  <h3 className="font-display text-lg font-bold tracking-tight text-fg">
                    {angle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-dim">
                    {angle.body}
                  </p>
                </TiltCard>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-dashed border-edge-strong bg-panel/60 p-6">
              <p className="text-sm leading-relaxed text-fg-dim italic">
                This partnership is in progress. As content goes live and
                results come in, we&apos;ll add real performance numbers
                here — not projections, actual results.
              </p>
            </div>
          </div>
        </section>

          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
              <TypewriterHeading
                as="h2"
                text="Want a research pass like this on your restaurant?"
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
