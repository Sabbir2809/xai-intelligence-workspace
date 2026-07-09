"use client";

import type { ProgressRef } from "@/types/motion";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type RefObject } from "react";

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;

interface Options {
  offset?: UseScrollOptions["offset"];
  remap?: [number, number];
}

export function useScrollProgressRef(
  target: RefObject<HTMLElement | null>,
  { offset = ["start start", "end start"], remap }: Options = {},
) {
  const progressRef = useRef<number>(0);
  const { scrollYProgress } = useScroll({ target, offset });

  const [inputStart, inputEnd] = remap ?? [0, 1];
  const shaped: MotionValue<number> = useTransform(
    scrollYProgress,
    [inputStart, inputEnd],
    [0, 1],
  );

  useMotionValueEvent(shaped, "change", (v) => {
    progressRef.current = Math.min(1, Math.max(0, v));
  });

  return { progressRef: progressRef as ProgressRef, scrollYProgress };
}
