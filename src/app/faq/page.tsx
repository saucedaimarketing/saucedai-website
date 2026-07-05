import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ButtonColorful } from "@/components/ui/button-colorful";
import FaqAccordion from "./FaqAccordion";

const TITLE = "FAQ — Sauced";
const DESCRIPTION = "Answers to the questions restaurant owners ask most.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/faq",
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

export default function Faq() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero eyebrow="FAQ" title="Questions restaurant owners actually ask." />

        <div className="relative">
          <BackgroundPaths />

          <section className="relative">
            <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-10 lg:pb-20">
              <FaqAccordion />
            </div>
          </section>

          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10 lg:py-24">
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl">
                Still have questions?
              </h2>
              <p className="mt-4 text-fg-dim">
                Apply and we&apos;ll walk through everything on a call.
              </p>
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
