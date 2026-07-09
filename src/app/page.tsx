import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { CountUp } from "@/components/ui/count-up";
import { WhySaucedCard } from "@/components/WhySaucedCard";

const TITLE = "Sauced — AI-Powered Restaurant Growth";
const DESCRIPTION =
  "Sauced turns your restaurant's story into content people crave — deep research, a full growth strategy, and shoot-ready scripts, every month.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
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

const STEPS = [
  {
    n: "01",
    title: "Deep research",
    body: "Into your restaurant, your market, and the customer who's already deciding whether to choose you or the place next door.",
  },
  {
    n: "02",
    title: "A complete growth strategy",
    body: "The mechanisms that make your food genuinely different, the customers who'll respond to them, and the angles that connect the two.",
  },
  {
    n: "03",
    title: "10 shoot-ready scripts",
    body: "Plus a full content calendar — every month. Hand it to whoever's holding the camera and go.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ── Hero: scroll to expand the brand video ── */}
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc="/hero-bg.mp4"
          posterSrc="/hero-poster.jpg"
          bgImageSrc="/hero-poster.jpg"
          title="We turn your restaurant's story|into content people crave."
          date="AI-powered restaurant growth"
          scrollToExpand="Scroll to expand"
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <p className="text-base leading-relaxed text-fg-dim sm:text-lg">
              Research, strategy, and shoot-ready scripts — built by an AI
              engine trained on what actually makes restaurants worth talking
              about, delivered by a team that knows food.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <ButtonColorful asChild className="w-full sm:w-auto">
                <Link href="/apply">Apply now</Link>
              </ButtonColorful>
              <Link
                href="/case-study"
                className="text-sm font-medium text-fg-dim transition-colors hover:text-fg"
              >
                See a real example →
              </Link>
            </div>
          </div>
        </ScrollExpandMedia>

        {/* ── Post-hero sections over the flowing-paths background ── */}
        <div className="relative">
          <BackgroundPaths />

          {/* ── Why Sauced ── */}
          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                Why Sauced
              </p>
              <h2 className="mt-4 max-w-xl font-display text-5xl font-bold tracking-[-0.02em] text-fg sm:text-6xl">
                Not another agency retainer.
              </h2>

              <div className="mt-16 grid gap-5 sm:grid-cols-3">
                <WhySaucedCard
                  icon="ban"
                  title="Skip the agency retainer"
                  index={0}
                >
                  Most owners have already paid thousands for a marketing
                  company that didn&apos;t move the needle. Sauced gives
                  you the same research and strategy for a fraction of
                  that cost, plus scripts you can shoot yourself.
                </WhySaucedCard>

                <WhySaucedCard
                  icon="search-check"
                  title="Real research, not generic AI"
                  index={1}
                >
                  This isn&apos;t a prompt that spits out generic captions.
                  It&apos;s a research process that digs into your actual
                  menu, your market, and your customer before a single
                  script gets written.
                </WhySaucedCard>

                <WhySaucedCard
                  icon="chef-hat"
                  title="Built by restaurant people"
                  index={2}
                >
                  We spent years behind the pass and out front before we
                  built this. Sauced exists because we lived the problem
                  first.{" "}
                  <Link
                    href="/about"
                    className="text-gold underline-offset-4 hover:underline"
                  >
                    Read our story →
                  </Link>
                </WhySaucedCard>
              </div>
            </div>
          </section>

          {/* ── How it works preview ── */}
          <section className="relative border-t border-edge">
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                  How it works
                </p>
                <h2 className="mt-4 max-w-lg font-display text-4xl font-bold tracking-[-0.02em] text-fg sm:text-5xl">
                  Three steps. Every month.
                </h2>
              </div>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-fg-dim transition-colors hover:text-fg"
              >
                See the full system →
              </Link>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-3">
              {STEPS.map((step) => (
                <TiltCard
                  key={step.n}
                  className="relative rounded-2xl border border-edge bg-panel p-7"
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
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-fg">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-fg-dim">
                    {step.body}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

          {/* ── Pricing teaser ── */}
          <section className="relative border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10 lg:py-28">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              Pricing
            </p>
            <TypewriterHeading
              as="h2"
              text="Everything included. No production agency on the side."
              className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-[-0.02em] text-fg sm:text-5xl"
            />

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="text-2xl text-fg-faint line-through sm:text-3xl">
                $2,800
              </span>
              <CountUp
                value={1500}
                prefix="$"
                className="font-display text-6xl font-bold tracking-tight text-gold sm:text-7xl"
              />
              <span className="text-sm text-fg-dim">
                first month, founding offer
              </span>
            </div>
            <p className="mt-4 text-sm text-fg-dim">Then $500/month ongoing.</p>
            <p className="mx-auto mt-5 max-w-md text-[13px] font-medium tracking-wide text-gold/80">
              Deep research · A complete growth strategy · 10 shoot-ready scripts · A full content calendar
            </p>

            <ButtonColorful asChild className="mt-10">
              <Link href="/pricing">See full pricing</Link>
            </ButtonColorful>
          </div>
        </section>

          {/* ── Case study teaser ── */}
          <section className="relative border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32">
            <TiltCard
              maxTilt={3}
              className="relative rounded-3xl border border-edge bg-panel p-8 sm:p-12"
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
              <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                Current partner
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl">
                Jerrell&apos;s Betr Brgr — SoHo, NYC
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg-dim">
                A plant-based burger spot competing against every other
                &ldquo;vegan restaurant&rdquo; in the city for a shrinking
                audience. Our research found the real opportunity: stop
                competing as a vegan restaurant, and start competing as the
                burger a meat-eater orders on purpose.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["The Double-Take", "Order It Over Beef", "Real Char. Real Crust. No Beef."].map(
                  (angle) => (
                    <span
                      key={angle}
                      className="rounded-full border border-edge-strong bg-panel-2 px-4 py-2 text-xs font-medium text-fg"
                    >
                      {angle}
                    </span>
                  )
                )}
              </div>

              <p className="mt-8 text-xs text-fg-faint italic">
                This partnership is in progress — results tracking will be
                added here as the content goes live.
              </p>

              <Link
                href="/case-study"
                className="mt-8 inline-block text-sm font-medium text-fg-dim transition-colors hover:text-fg"
              >
                Read the full case study →
              </Link>
            </TiltCard>
          </div>
        </section>

          {/* ── Closing CTA ── */}
          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10 lg:py-28">
              <TypewriterHeading
                as="h2"
                text="The research is done. We execute with specificity."
                className="font-display text-4xl font-bold tracking-[-0.02em] text-fg sm:text-5xl"
              />
              <ButtonColorful asChild className="mt-10">
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
