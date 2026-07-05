import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import ApplyForm from "./ApplyForm";

const TITLE = "Apply — Sauced";
const DESCRIPTION = "Tell us about your restaurant and we'll be in touch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/apply" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/apply",
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

export default function Apply() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Apply"
          title="Tell us about your restaurant."
          subhead="A few details, then we'll reach out to talk through what we'd find."
        />

        <div className="relative">
          <BackgroundPaths />

          <section className="relative">
            <div className="mx-auto max-w-xl px-6 pb-20 lg:px-10 lg:pb-24">
              <div className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                Now accepting 5 founding partners this quarter
              </div>
              <ApplyForm />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
