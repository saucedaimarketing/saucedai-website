"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CountUp } from "@/components/ui/count-up";
import { ScrollRevealCard } from "@/components/ui/scroll-reveal-card";
import { cn } from "@/lib/utils";

const GLOW_PROPS = {
  variant: "gold" as const,
  spread: 40,
  glow: true,
  disabled: false,
  proximity: 64,
  inactiveZone: 0.01,
  borderWidth: 2,
};

/* ── Deck layout gate: the full-screen sticky deck needs room to breathe.
      Small screens get the stacked reveal instead. ── */
const DECK_QUERY = "(min-width: 1024px) and (min-height: 640px)";

function subscribeDeck(callback: () => void) {
  const mq = window.matchMedia(DECK_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useDeckLayout() {
  return useSyncExternalStore(
    subscribeDeck,
    () => window.matchMedia(DECK_QUERY).matches,
    () => false
  );
}

/* ── Content data ── */

const STATS = [
  { value: 45, label: "pages of strategy" },
  { value: 8, label: "research steps" },
  { value: 5, label: "named customer avatars" },
  { value: 10, label: "angles scored & ranked" },
  { value: 10, label: "shoot-ready scripts" },
];

const RESEARCH_PIPELINE = [
  {
    n: "Step 0",
    title: "Why Marketing Matters",
    note: "Locking the taste-first, plant-based-second thesis.",
  },
  {
    n: "Step 1",
    title: "Product Overview",
    note: "Founder, patty truth, and the real differentiator: the cook.",
  },
  {
    n: "Step 2",
    title: "Desire Research",
    note: "Crave + Trust lead; the “wait, this is vegan?” reversal is the hook.",
  },
  {
    n: "Step 3",
    title: "Market Sophistication",
    note: "Level 5 SoHo — claims are dead, reframes win.",
  },
  {
    n: "Step 4",
    title: "New Mechanism",
    note: "7 ownable mechanisms built on technique, sauce, and founder.",
  },
  {
    n: "Step 4.5",
    title: "Avatar Builder",
    note: "5 named non-vegan and flexitarian profiles.",
  },
  {
    n: "Step 5",
    title: "New Information",
    note: "Fake meat collapses while smash burgers surge — backlash is our tailwind.",
  },
  {
    n: "Step 6",
    title: "Angle Identifier",
    note: "10 angles ranked, top 3 sequenced into a persuasion arc.",
  },
  {
    n: "Step 7",
    title: "Copy Development",
    note: "10 production-ready scripts, captions, ads, and influencer briefs.",
  },
];

const AVATARS = [
  {
    name: "Marcus Deleon",
    role: "The Burger Loyalist",
    stats: "31 · Fort Greene · $118K",
    hook: "“This has more sear than the $17 burger you had for lunch.”",
  },
  {
    name: "Priya Ramaswamy",
    role: "Flexitarian Date-Nighter",
    stats: "28 · LES · $92K",
    hook: "“The date-night burger you don’t have to feel weird about ordering.”",
  },
  {
    name: "Dani Kowalski",
    role: "Anti-Processed Skeptic",
    stats: "36 · West Village · $135K",
    hook: "“Isn’t Impossible meat just ultra-processed junk? Let’s actually read the label.”",
  },
  {
    name: "Toby Fenwick",
    role: "Crave-Content Creator",
    stats: "26 · Bushwick · $55K",
    hook: "“A meat-eater built this vegan burger. Watch my honest reaction.”",
  },
  {
    name: "Jordan Mitchell",
    role: "Mixed-Group Organizer",
    stats: "34 · Chelsea · $105K",
    hook: "“The one NYC spot where the vegan AND the meat-eater both actually want to eat.”",
  },
];

const ANGLES = [
  {
    rank: "#1",
    score: "48/50",
    title: "It’s Not the Patty, It’s the Cook",
    note: "Radical honesty disarms the skeptic and clears the trust barrier before we sell crave.",
  },
  {
    rank: "#2",
    score: "47/50",
    title: "The Cross-Section",
    note: "Credibility established — hammer crave with high-frequency seared-crust reveal content.",
  },
  {
    rank: "#3",
    score: "46/50",
    title: "The Burger a Meat-Eater Orders on Purpose",
    note: "Convert warm audiences with the identity reframe: you’re not settling, you’re choosing better.",
  },
];

const SCRIPT_BEATS = [
  {
    time: "0–3s",
    beat: "Two burgers side by side on butcher paper. On-screen: “Shake Shack vs. the vegan one. No, seriously.”",
  },
  {
    time: "3–8s",
    beat: "Host, direct to camera: “I’m from Chicago. I do not lose burger arguments. Watch this.”",
  },
  {
    time: "8–16s",
    beat: "Cut both burgers in half, point at each crust. “Same char. Same crust. Same pull. The difference isn’t the meat — it’s that both of these got smashed and seared right.”",
  },
  {
    time: "16–26s",
    beat: "Bite both, genuine reaction. “The crust wins either way.” Host: “One of these is beef. One isn’t. And I had to think about it.”",
  },
  {
    time: "26–35s",
    beat: "Point to Jerrell’s. “The one you’d order on purpose is $13.50. Go find out which one this is.”",
  },
];

const DO_NOT_SAY = [
  "“healthier than”",
  "“better for you”",
  "“plant-based”",
  "“even a vegan”",
];

/* ── Shared card pieces ── */

function ProofLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">
      {children}
    </p>
  );
}

function StepHeading({
  n,
  title,
  badge,
  body,
  expanded,
  onToggle,
}: {
  n: string;
  title: string;
  badge?: string;
  body: string;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-display text-sm font-semibold tracking-widest text-gold">
          {n}
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {badge && (
          <span className="rounded-full border border-edge-strong px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-fg-dim uppercase">
            {badge}
          </span>
        )}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Hide details" : "Show details"}
            className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-edge-strong px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-fg-dim uppercase transition-colors hover:border-gold hover:text-gold"
          >
            {expanded ? "Less" : "More"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                expanded && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-fg-dim lg:text-base">
        {body}
      </p>
    </div>
  );
}

interface StepContentProps {
  expanded?: boolean;
  onToggle?: () => void;
}

function Step0Content({ expanded = true, onToggle }: StepContentProps) {
  return (
    <div>
      <StepHeading
        n="01"
        title="The research pipeline"
        body="Before a single script gets written, your restaurant goes through an 8-step research system — the same one that produced everything on the following pages."
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded && (
        <div className="mt-8 border-t border-edge pt-8">
          <ProofLabel>The full pipeline, in order</ProofLabel>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH_PIPELINE.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-edge bg-panel-2/60 p-5 lg:p-6"
              >
                <p className="text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
                  {step.n}
                </p>
                <p className="mt-1.5 font-display text-[15px] font-bold tracking-tight text-fg lg:text-base">
                  {step.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-dim">
                  {step.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step1Content({ expanded = true, onToggle }: StepContentProps) {
  return (
    <div>
      <StepHeading
        n="02"
        title="Deep research"
        body="We study your restaurant, your local market, and the customer who's already deciding between you and the place next door — real reviews, real competitors, real gaps."
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded && (
        <div className="mt-8 border-t border-edge pt-8">
          <ProofLabel>Five named customer profiles it produced</ProofLabel>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AVATARS.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-edge bg-panel-2/60 p-5 lg:p-7"
              >
                <p className="font-display text-base font-bold tracking-tight text-fg lg:text-lg">
                  {a.name}
                </p>
                <p className="mt-1 text-[11px] font-semibold tracking-[0.15em] text-gold uppercase">
                  {a.role}
                </p>
                <p className="mt-1 text-xs text-fg-faint">{a.stats}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg-dim italic">
                  {a.hook}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step2Content({ expanded = true, onToggle }: StepContentProps) {
  return (
    <div>
      <StepHeading
        n="03"
        title="A complete growth strategy"
        body="The mechanisms that make your food genuinely different, the specific customers who'll respond to them, and the angles that connect the two into content worth making."
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded && (
        <div className="mt-8 border-t border-edge pt-8">
          <ProofLabel>The one sentence the strategy is built on</ProofLabel>
          <p className="mt-5 max-w-3xl border-l-2 border-gold pl-6 font-display text-xl font-bold leading-snug tracking-tight text-fg sm:text-2xl lg:text-3xl">
            A burger a meat-eater orders on purpose &mdash; the plant-based
            part is the twist, not the pitch.
          </p>
          <p className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-fg-faint uppercase">
            Ten angles scored &mdash; top three sequenced into a persuasion
            arc
          </p>
          <div className="mt-5 space-y-4">
            {ANGLES.map((a) => (
              <div
                key={a.rank}
                className="rounded-2xl border border-edge bg-panel-2/60 p-5 lg:p-7"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-display text-sm font-bold tracking-widest text-gold">
                    {a.rank}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-fg lg:text-xl">
                    {a.title}
                  </h3>
                  <span className="ml-auto rounded-full border border-edge-strong px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-fg-dim uppercase">
                    Scored {a.score}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">
                  {a.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step3Content({ expanded = true, onToggle }: StepContentProps) {
  return (
    <div>
      <StepHeading
        n="04"
        title="10 shoot-ready scripts + a content calendar"
        body="Every month, you get ten production-ready scripts and a full calendar — hooks, shot lists, captions, all mapped to the strategy. Hand it to whoever's holding the camera."
        expanded={expanded}
        onToggle={onToggle}
      />
      {expanded && (
      <div className="mt-8 border-t border-edge pt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <ProofLabel>
            Script 02 of 10 &mdash; &ldquo;I Put It Next to a Shake
            Shack&rdquo;
          </ProofLabel>
          <p className="text-xs tracking-wide text-fg-faint">
            Comparison / Contrast &middot; 35 seconds &middot; Avatar:
            Marcus, the Burger Loyalist
          </p>
        </div>
        <div className="mt-5 space-y-0">
          {SCRIPT_BEATS.map((b, i) => (
            <div
              key={b.time}
              className={`grid gap-1 py-4 sm:grid-cols-[88px_1fr] sm:gap-6 ${
                i < SCRIPT_BEATS.length - 1 ? "border-b border-edge/70" : ""
              }`}
            >
              <span className="font-display text-sm font-bold tracking-widest text-gold">
                {b.time}
              </span>
              <p className="text-sm leading-relaxed text-fg-dim lg:text-[15px]">
                {b.beat}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-edge pt-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-fg-faint uppercase">
            Do not say
          </span>
          {DO_NOT_SAY.map((phrase) => (
            <span
              key={phrase}
              className="rounded-full border border-edge-strong px-3 py-1 text-sm text-fg-dim line-through decoration-fg-faint/60"
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

function Step4Content({ expanded = true, onToggle }: StepContentProps) {
  return (
    <div>
      <StepHeading
        n="05"
        title="Influencer & UGC activation"
        badge="Optional add-on"
        expanded={expanded}
        onToggle={onToggle}
        body="Once the content system is running, we can plug you into our LA-based network of creators and everyday customers for influencer and user-generated content — real people, briefed on the same research, telling the same story from the outside in."
      />
      {expanded && (
        <div className="mt-8 border-t border-edge pt-8">
          <ProofLabel>How it plugs into the system</ProofLabel>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-fg-dim lg:text-base">
            For Jerrell&apos;s, the plan calls for a burger reviewer, a
            date-night creator, and a real-food creator &mdash; each opening
            on the mechanism, never the word &ldquo;vegan.&rdquo; Same
            strategy, same angles, told from the outside in.
          </p>
        </div>
      )}
    </div>
  );
}

const STEP_CARDS = [
  Step0Content,
  Step1Content,
  Step2Content,
  Step3Content,
  Step4Content,
];

/* ── Deck card: enters tilted from below, exits up and away ── */

function DeckCard({
  index,
  count,
  progress,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const seg = 1 / count;
  const w = seg * 0.45;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // All offsets must stay within [0,1]: framer-motion hardware-accelerates
  // scroll-linked values via WAAPI, which rejects out-of-range offsets.
  // The last card "never exits" by using a flat output over a tail sliver.
  const enterA = isFirst ? 0 : index * seg - w / 2;
  const enterB = isFirst ? seg * 0.45 : index * seg + w / 2;
  const exitA = isLast ? 0.998 : (index + 1) * seg - w / 2;
  const exitB = isLast ? 1 : (index + 1) * seg + w / 2;

  const range = [enterA, enterB, exitA, exitB];

  const opacity = useTransform(
    progress,
    range,
    isLast ? [0, 1, 1, 1] : isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    range,
    isLast ? [380, 0, 0, 0] : isFirst ? [0, 0, 0, -300] : [380, 0, 0, -300]
  );
  const rotateX = useTransform(
    progress,
    range,
    isLast ? [26, 0, 0, 0] : isFirst ? [18, 0, 0, -12] : [26, 0, 0, -12]
  );
  const scale = useTransform(
    progress,
    range,
    isLast ? [0.94, 1, 1, 1] : isFirst ? [1.04, 1, 1, 0.95] : [0.94, 1, 1, 0.95]
  );

  const [active, setActive] = useState(isFirst);
  useMotionValueEvent(progress, "change", (v) => {
    setActive(v >= enterA - 0.02 && v <= exitB + 0.02);
  });

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-4 lg:p-6",
        !active && "invisible"
      )}
      style={{ zIndex: index + 1, pointerEvents: active ? "auto" : "none" }}
    >
      <motion.div
        style={{
          opacity,
          y,
          rotateX,
          scale,
          transformPerspective: 1400,
          boxShadow:
            "0 24px 48px rgba(0,0,0,0.45), 0 80px 120px rgba(0,0,0,0.35)",
        }}
        className="relative h-[76vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-edge bg-panel p-8 sm:p-10 lg:p-14"
      >
        <GlowingEffect {...GLOW_PROPS} />
        {children}
      </motion.div>
    </div>
  );
}

/* ── Desktop: full-screen sticky deck ── */

function StepsDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const count = STEP_CARDS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  function goToStep(i: number) {
    const el = containerRef.current;
    if (!el) return;
    const seg = 1 / count;
    const containerTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + scrollable * (i * seg + seg / 2),
      behavior: "smooth",
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${count * 110}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {STEP_CARDS.map((Content, i) => (
          <DeckCard
            key={i}
            index={i}
            count={count}
            progress={smoothProgress}
          >
            <Content />
          </DeckCard>
        ))}

        {/* Step indicator */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3">
          {STEP_CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToStep(i)}
              aria-label={`Go to step ${i + 1}`}
              aria-current={i === activeIndex}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "rounded-full transition-all duration-300 group-hover:bg-gold-hover",
                  i === activeIndex
                    ? "h-2 w-6 bg-gold"
                    : "h-2 w-2 bg-edge-strong group-hover:scale-125"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Small screens: stacked reveal ── */

function StepsStack() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5">
      {STEP_CARDS.map((Content, i) => (
        <ScrollRevealCard
          key={i}
          className="relative rounded-3xl border border-edge bg-panel p-6 sm:p-8"
        >
          <GlowingEffect {...GLOW_PROPS} />
          <Content
            expanded={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </ScrollRevealCard>
      ))}
    </div>
  );
}

export default function HowItWorksSteps() {
  const deck = useDeckLayout();

  return (
    <div>
      {/* Dossier header + stat strip — stays within the page's reading width */}
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-fg-dim uppercase">
            Sauced &middot; Partner System &middot; Jerrell&apos;s Betr Brgr
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
            <span className="h-1 w-1 rounded-full bg-gold" />
            Month one deliverable
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp
                value={stat.value}
                duration={1}
                className="font-display text-4xl font-bold tracking-tight text-gold sm:text-5xl"
              />
              <p className="mt-2 text-[11px] font-semibold tracking-[0.15em] text-fg-dim uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deck breaks out to full viewport width; stacked fallback stays contained */}
      <div className="mt-12">
        {deck ? (
          <StepsDeck />
        ) : (
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <StepsStack />
          </div>
        )}
      </div>
    </div>
  );
}
