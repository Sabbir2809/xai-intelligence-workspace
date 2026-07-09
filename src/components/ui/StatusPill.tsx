import { cn } from "@/lib/utils";

type StatusPillProps = {
  label: string;
  /** Adds a soft pulsing ring around the dot — use for "this is live right now" states. */
  pulse?: boolean;
  className?: string;
};

export function StatusPill({ label, pulse = false, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-(--hairline) bg-(--ink-2) px-2.5 py-1 font-label text-[10px] uppercase tracking-widest text-(--fg-2)",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--signal) opacity-60" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-(--signal)" />
      </span>
      {label}
    </span>
  );
}
