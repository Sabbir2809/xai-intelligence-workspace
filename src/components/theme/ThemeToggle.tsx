"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const MotionSun = motion.create(Sun);
const MotionMoon = motion.create(Moon);

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted ? theme === "dark" : true;
  const Icon = isDark ? MotionMoon : MotionSun;

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted ? isDark : undefined}
      suppressHydrationWarning
      className="relative flex h-8 w-8 items-center justify-center rounded border border-(--hairline) text-(--fg-1) transition-colors hover:border-(--fg-2) hover:text-(--fg-0) cursor-pointer">
      <Icon
        key={mounted ? theme : "init"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
