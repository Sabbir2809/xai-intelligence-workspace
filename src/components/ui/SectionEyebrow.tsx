import { cn } from "@/lib/utils";

type SectionEyebrowProps = {
  children: string;
  className?: string;
};

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "font-label text-xs uppercase tracking-widest text-(--signal)",
        className,
      )}>
      {children}
    </p>
  );
}
