import { TypewriterHeading } from "@/components/ui/typewriter-heading";

export default function PageHero({
  eyebrow,
  title,
  subhead,
  typewriter = true,
}: {
  eyebrow: string;
  title: string;
  subhead?: string;
  typewriter?: boolean;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pt-40 pb-16 text-center lg:px-10 lg:pt-48 lg:pb-20">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
          {eyebrow}
        </p>
        {typewriter ? (
          <TypewriterHeading
            as="h1"
            text={title}
            className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl"
          />
        ) : (
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        )}
        {subhead && (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-dim sm:text-lg">
            {subhead}
          </p>
        )}
      </div>
    </section>
  );
}
