import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}
export function SectionShell({
  children,
  className,
  as: Tag = "div",
}: SectionShellProps) {
  return (
    <Tag className={cn("mx-auto max-w-6xl px-6 md:px-14", className)}>
      {children}
    </Tag>
  );
}
