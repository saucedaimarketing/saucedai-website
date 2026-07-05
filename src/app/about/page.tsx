import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { TypewriterHeading } from "@/components/ui/typewriter-heading";

const TITLE = "About — Sauced";
const DESCRIPTION = "Why Sauced exists, and the LA creator network behind it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
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

export default function About() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero eyebrow="About" title="We build the sauce behind your brand." />

        <div className="relative">
          <BackgroundPaths />

          {/* ── Founder story ── */}
          <section className="relative">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
              Founder story
            </p>
            <TypewriterHeading
              as="h2"
              text="I've spent 12+ years in restaurants — back of house and front of house — before I ever wrote a line of marketing strategy."
              className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl"
            />
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-fg-dim">
              <p>
                I&apos;ve run the line during a Friday night rush. I&apos;ve
                stood at the host stand watching a full dining room and an
                empty one, sometimes in the same week, for reasons that had
                nothing to do with the food. I&apos;ve built menus, trained
                staff, managed margins that don&apos;t forgive mistakes. What
                I learned from all of it is simple: most restaurants
                don&apos;t lose because the food isn&apos;t good enough. They
                lose because nobody has the time, or the system, to tell
                people why it&apos;s worth showing up.
              </p>
              <p>
                That&apos;s the gap Sauced is built to close. I built an AI
                research system that does what I used to do by instinct and
                long nights — dig into what actually makes a restaurant&apos;s
                food different, who its real customer is, what makes them
                come back — and pairs it with a production engine that turns
                that thinking into 10 shoot-ready scripts every single month,
                not a strategy deck that sits in a drawer. I&apos;m not a
                marketing agency that learned about food. I&apos;m a
                restaurant person who built the system I wish I&apos;d had
                behind the pass and out front, every single service.
              </p>
            </div>
          </div>
        </section>

          {/* ── LA creator network ── */}
          <section className="relative border-t border-edge">
            <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                The creator network
              </p>
              <TypewriterHeading
                as="h2"
                text="Strategy and production, under one roof."
                className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-fg sm:text-4xl"
              />
              <p className="mt-6 text-[15px] leading-relaxed text-fg-dim">
                Most restaurant marketing breaks down at the handoff — a
                strategy deck goes to one vendor, the content goes to another,
                and nothing quite matches by the time it&apos;s posted.
                Sauced is built out of Los Angeles with direct access to a
                network of local food creators and UGC talent, so the same
                strategy that identifies your angle can also get it filmed
                — without a separate production agency in between.
              </p>
              <p className="mt-6 text-[15px] leading-relaxed text-fg-dim">
                For restaurants that want it, that network becomes the
                influencer and UGC activation layer on top of the core
                content system — real people, briefed on the same research,
                telling the same story from the outside in.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
