import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BackgroundPaths } from "@/components/ui/background-paths";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply — Sauced",
  description: "Tell us about your restaurant and we'll be in touch.",
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
              <ApplyForm />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
