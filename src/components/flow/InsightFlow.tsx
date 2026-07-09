"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { INSIGHT_STAGES } from "@/data/insightFlow";
import { useInsightFlowTimeline } from "@/hooks/use-insight-flow-timeline";
import { cn } from "@/lib/utils";
import { StagePanels } from "./StagePanels";
import { StageRail } from "./StageRail";

export function InsightFlow() {
  const {
    containerRef,
    setPanelRef,
    setLineRef,
    active,
    jumpTo,
    reducedMotion,
  } = useInsightFlowTimeline(INSIGHT_STAGES.length);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative bg-(--ink-1)",
        reducedMotion ? "h-auto py-24" : "h-screen",
      )}>
      <SectionShell
        as="div"
        className={cn(
          "flex flex-col",
          reducedMotion ? "h-auto justify-start" : "h-full justify-center",
        )}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr]">
          <StageRail
            stages={INSIGHT_STAGES}
            active={active}
            onJump={jumpTo}
            setLineRef={setLineRef}
          />
          <StagePanels
            stages={INSIGHT_STAGES}
            reducedMotion={reducedMotion}
            setPanelRef={setPanelRef}
          />
        </div>
      </SectionShell>
    </section>
  );
}
