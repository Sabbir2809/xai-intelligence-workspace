"use client";

import { cn } from "@/lib/utils";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-(--fg-0) text-(--ink-0) hover:bg-(--signal) hover:text-(--on-signal)",
  secondary:
    "border border-(--hairline) text-(--fg-0) hover:border-(--fg-2) hover:bg-(--ink-2)",
};

//
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

// Link Button
type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({
  variant = "secondary",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
