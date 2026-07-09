"use client";

import { motion } from "framer-motion";
import { Ban, SearchCheck, ChefHat, type LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TiltCard } from "@/components/ui/tilt-card";

const ICONS: Record<string, LucideIcon> = {
  ban: Ban,
  "search-check": SearchCheck,
  "chef-hat": ChefHat,
};

interface WhySaucedCardProps {
  icon: keyof typeof ICONS;
  title: string;
  index: number;
  children: React.ReactNode;
}

/**
 * "Why Sauced" pillar card: fades/slides in on scroll, staggered by index,
 * then tilts toward the cursor with a gold spotlight on hover — louder
 * than a static card without introducing a new visual language.
 *
 * `icon` is a string key, not a component reference — lucide-react icons
 * aren't "use client" themselves, so they're looked up and rendered here,
 * inside the client boundary, rather than passed in from the Server
 * Component page as a prop (component references aren't serializable
 * across that boundary).
 */
export function WhySaucedCard({ icon, title, index, children }: WhySaucedCardProps) {
  const Icon = ICONS[icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.15, ease: "easeOut" }}
    >
      <TiltCard
        maxTilt={8}
        className="group relative rounded-2xl border border-edge bg-panel p-8 transition-colors hover:border-gold/50"
      >
        <GlowingEffect
          variant="gold"
          spread={55}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-fg">
          {title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-fg-dim">
          {children}
        </p>
      </TiltCard>
    </motion.div>
  );
}
