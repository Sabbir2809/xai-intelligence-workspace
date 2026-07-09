import type { InsightStage } from "@/data/insightFlow";
import { cn } from "@/lib/utils";
import { memo } from "react";

type StagePanelsProps = {
  stages: readonly InsightStage[];
  reducedMotion: boolean;
  setPanelRef: (index: number) => (el: HTMLDivElement | null) => void;
};

export const StagePanels = memo(function StagePanels({
  stages,
  reducedMotion,
  setPanelRef,
}: StagePanelsProps) {
  return (
    <div className={cn("relative", reducedMotion ? "h-auto" : "min-h-[320px]")}>
      {stages.map((s, i) => (
        <div
          key={s.title}
          ref={setPanelRef(i)}
          className={
            reducedMotion
              ? "flex flex-col"
              : "absolute inset-0 flex flex-col justify-center"
          }>
          <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--hairline) font-label text-xs text-(--signal)">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-tighter text-(--fg-0) md:text-5xl">
            {s.title}
          </h2>
          <p className="mt-6 max-w-lg text-base text-(--fg-1) md:text-lg">
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
});
