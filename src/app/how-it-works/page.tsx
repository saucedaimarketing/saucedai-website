import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";
import HowItWorksSteps from "@/components/HowItWorksSteps";

const TITLE = "How It Works — Sauced";
const DESCRIPTION =
  "Research, strategy, and shoot-ready scripts — the Sauced system, every month.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/how-it-works",
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

          <section id="month-one" className="relative scroll-mt-24 py-16 lg:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                Inside a real engagement
              </p>
              <TypewriterHeading
                as="h2"
                text="What month one actually looks like."
                className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl"
              />
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-dim">
                Every step of the system, next to what it actually produced
                for Jerrell&apos;s Betr Brgr in the first 30 days.
              </p>
            </div>
            <div className="mt-16">
              <HowItWorksSteps />
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
