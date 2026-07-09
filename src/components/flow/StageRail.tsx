import type { InsightStage } from "@/data/insightFlow";

type StageRailProps = {
  stages: readonly InsightStage[];
  active: number;
  onJump: (index: number) => void;
  setLineRef: (index: number) => (el: SVGLineElement | null) => void;
};

export function StageRail({
  stages,
  active,
  onJump,
  setLineRef,
}: StageRailProps) {
  return (
    <div className="flex flex-row gap-6 md:flex-col md:gap-8">
      {stages.map((s, i) => (
        <button
          key={s.tag}
          onClick={() => onJump(i)}
          aria-current={active === i ? "step" : undefined}
          className="group flex flex-col gap-2 text-left">
          <span
            className={`font-label text-xs tracking-widest transition-colors duration-300 ${
              active === i
                ? "text-(--signal)"
                : "text-(--fg-2) group-hover:text-(--fg-1)"
            }`}>
            {s.tag}
          </span>
          <svg
            width="100%"
            height="2"
            className="hidden md:block"
            aria-hidden="true">
            <line
              ref={setLineRef(i)}
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="var(--signal)"
              strokeWidth={2}
              style={{ transformOrigin: "left center" }}
            />
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="var(--hairline)"
              strokeWidth={1}
              className="transition-colors duration-300 group-hover:stroke-(--fg-2)"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
