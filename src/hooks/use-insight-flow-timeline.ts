"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export function useInsightFlowTimeline(stageCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [active, setActive] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion) {
        gsap.set(panels, { clearProps: "all" });
        panels.forEach((panel) => {
          panel.style.position = "static";
          panel.style.marginBottom = "3rem";
        });
        lineRefs.current.forEach((line) => gsap.set(line, { scaleX: 1 }));
        setActive(-1);
        return;
      }

      panels.forEach((panel, i) => {
        gsap.set(panel, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
      });
      lineRefs.current.forEach((line, i) => {
        gsap.set(line, { scaleX: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const idx = Math.min(
              stageCount - 1,
              Math.floor(self.progress * stageCount),
            );
            setActive(idx);
          },
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -24, duration: 0.5 }, i - 0.5)
          .fromTo(
            panel,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            i - 0.5,
          )
          .to(lineRefs.current[i - 1], { scaleX: 0, duration: 0.5 }, i - 0.5)
          .fromTo(
            lineRefs.current[i],
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5 },
            i - 0.5,
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, stageCount]);

  const jumpTo = useCallback(
    (i: number) => {
      const st = scrollTriggerRef.current;
      if (!st || prefersReducedMotion) return;
      const fraction = (i + 0.5) / stageCount;
      const y = st.start + (st.end - st.start) * fraction;
      gsap.to(window, { duration: 0.9, scrollTo: y, ease: "power2.inOut" });
    },
    [prefersReducedMotion, stageCount],
  );

  const setPanelRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      panelRefs.current[i] = el;
    },
    [],
  );
  const setLineRef = useCallback(
    (i: number) => (el: SVGLineElement | null) => {
      lineRefs.current[i] = el;
    },
    [],
  );

  return {
    containerRef,
    setPanelRef,
    setLineRef,
    active,
    jumpTo,
    reducedMotion: prefersReducedMotion,
  };
}
