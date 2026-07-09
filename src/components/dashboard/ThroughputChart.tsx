"use client";

import { fadeUpSmall } from "@/lib/motion";
import { motion } from "framer-motion";
import { memo } from "react";

type Props = {
  bars: readonly number[];
};
export const ThroughputChart = memo(function ThroughputChart({ bars }: Props) {
  return (
    <motion.div
      variants={fadeUpSmall}
      className="rounded-lg border border-(--hairline) p-4">
      <p className="font-label text-[11px] uppercase tracking-wider text-(--fg-2)">
        Insight throughput
      </p>
      <div className="mt-4 flex h-32 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              delay: 0.15 + i * 0.03,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ backgroundColor: "var(--signal)" }}
            className="flex-1 rounded-sm bg-(--ink-3)"
          />
        ))}
      </div>
    </motion.div>
  );
});
