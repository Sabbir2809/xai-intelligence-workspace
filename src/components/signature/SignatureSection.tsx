"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionShell } from "@/components/ui/SectionShell";
import { FORMATIONS } from "@/data/signature";
import { useScrollProgressRef } from "@/hooks/use-scroll-progress";
import { useTheme } from "@/hooks/use-theme";
import { Canvas } from "@react-three/fiber";
import { motion, useTransform } from "framer-motion";
import { Circle, Dna, Infinity as InfinityIcon, Move } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const DataConstellation = dynamic(
  () => import("./DataConstellation").then((m) => m.DataConstellation),
  { ssr: false },
);

const FORMATION_ICONS = [Circle, Dna, InfinityIcon];

export function SignatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const [formationIndex, setFormationIndex] = useState(0);

  const { progressRef, scrollYProgress } = useScrollProgressRef(sectionRef, {
    offset: ["start end", "end start"],
    remap: [0.15, 0.6],
  });

  const tagOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0.3, 1]);
  const fogColor = theme === "light" ? "#f7f8fa" : "#08090b";

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-(--ink-0)">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="pt-16">
          <SectionShell>
            <SectionEyebrow>05 — Signature</SectionEyebrow>
            <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight tracking-tighter text-(--fg-0) md:text-4xl">
              Drag it. Scroll past it. Reshape it on command.
            </h2>
          </SectionShell>
        </div>

        <div className="relative flex-1">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 42 }}
            dpr={[1, 1.75]}
            className="!absolute inset-0 cursor-grab active:cursor-grabbing">
            <fog attach="fog" args={[fogColor, 5, 13]} />
            <DataConstellation
              progress={progressRef}
              formationIndex={formationIndex}
            />
          </Canvas>

          <motion.div
            style={{ opacity: tagOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-10">
            <SectionShell className="flex flex-col items-start gap-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-(--hairline) bg-(--ink-1) p-1">
                {FORMATIONS.map((formation, i) => {
                  const Icon = FORMATION_ICONS[i];
                  const active = formationIndex === i;
                  return (
                    <button
                      key={formation.name}
                      onClick={() => setFormationIndex(i)}
                      aria-pressed={active}
                      aria-label={`Morph into ${formation.name} formation`}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-label text-[11px] transition-colors ${
                        active
                          ? "bg-(--signal) text-(--on-signal)"
                          : "text-(--fg-2) hover:text-(--fg-0)"
                      }`}>
                      <Icon size={12} strokeWidth={2} aria-hidden="true" />
                      {formation.name}
                    </button>
                  );
                })}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-(--hairline) px-2.5 py-1 font-label text-[11px] text-(--fg-2)">
                <Move size={12} strokeWidth={2} aria-hidden="true" />
                drag to orbit
              </span>
            </SectionShell>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
