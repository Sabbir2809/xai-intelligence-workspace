"use client";

import { Button, LinkButton } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { StatusPill } from "@/components/ui/StatusPill";
import { HERO_CONTENT as C } from "@/data/hero";
import { useScrollProgressRef } from "@/hooks/use-scroll-progress";
import { motion, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progressRef, scrollYProgress } = useScrollProgressRef(sectionRef, {
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroScene progress={progressRef} />

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--ink-0)_92%)]" />

        <SectionShell
          as="div"
          className="relative z-10 flex h-full flex-col justify-between pt-24 pb-10 md:pt-28 md:pb-14">
          <div className="flex items-center justify-between font-label text-xs uppercase tracking-widest text-(--fg-2)">
            <StatusPill label={C.liveStatus} pulse />
            <span className="hidden md:inline">{C.scrollHint}</span>
          </div>

          <motion.div style={{ opacity, y }} className="max-w-3xl">
            <p className="mb-4 font-label text-xs uppercase tracking-[0.2em] text-(--signal)">
              {C.eyebrow}
            </p>
            <h1 className="text-4xl font-medium leading-[1.05] tracking-tighter text-(--fg-0) md:text-6xl">
              {C.headline.before}
              <span className="text-(--signal)">{C.headline.emphasis}</span>
              {C.headline.after}
            </h1>
            <p className="mt-6 max-w-xl text-base text-(--fg-1) md:text-lg">
              {C.body}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button className="shadow-[0_8px_28px_-8px_var(--signal-soft)] hover:shadow-[0_12px_32px_-8px_var(--signal-soft)]">
                {C.primaryCta}
              </Button>
              <LinkButton href="#flow">{C.secondaryCta}</LinkButton>
            </div>
          </motion.div>

          <div className="font-label text-[11px] text-(--fg-2)">
            {C.footnote}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
