"use client";

import type { DASHBOARD_METRICS } from "@/data/dashboard";
import { fadeUpSmall, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { memo } from "react";

type Metric = (typeof DASHBOARD_METRICS)[number];

const MetricCard = memo(function MetricCard({ label, value, delta }: Metric) {
  const isUp = delta.trim().startsWith("+");
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <motion.div
      variants={fadeUpSmall}
      whileHover={{
        borderColor: "var(--fg-2)",
        backgroundColor: "var(--ink-2)",
        y: -2,
      }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-(--hairline) p-4 cursor-pointer">
      <p className="font-label text-[11px] uppercase tracking-wider text-(--fg-2)">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium text-(--fg-0)">{value}</p>
      <p className="mt-1 inline-flex items-center gap-1 font-label text-xs text-(--signal)">
        <TrendIcon size={12} strokeWidth={2.25} aria-hidden="true" />
        {delta}
      </p>
    </motion.div>
  );
});

export function MetricsGrid({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </motion.div>
  );
}
