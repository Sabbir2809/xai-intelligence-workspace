"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionShell } from "@/components/ui/SectionShell";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  DASHBOARD_CHART_BARS,
  DASHBOARD_METRICS,
  DASHBOARD_NAV,
  DASHBOARD_SIGNALS,
  type DashboardTabKey,
} from "@/data/dashboard";
import { EASE_OUT, staggerContainer } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { MetricsGrid } from "./MetricsGrid";
import { SignalsTable } from "./SignalsTable";
import { ThroughputChart } from "./ThroughputChart";

export function DashboardPreview() {
  const [tab, setTab] = useState<DashboardTabKey>("overview");

  const activeLabel = useMemo(
    () => DASHBOARD_NAV.find((n) => n.key === tab)?.label,
    [tab],
  );

  return (
    <section className="bg-(--ink-0) py-24">
      <SectionShell>
        <SectionEyebrow>04 — Product</SectionEyebrow>
        <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tighter text-(--fg-0) md:text-4xl">
          One workspace, not another tab to check.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-10 overflow-hidden rounded-xl border border-(--hairline) bg-(--ink-1) shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            <DashboardSidebar activeTab={tab} onSelect={setTab} />

            <div className="min-h-[440px] p-4 md:p-6">
              <div className="mb-6 flex flex-col gap-2 border-b border-(--hairline) pb-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-label text-[11px] uppercase tracking-widest text-(--fg-2)">
                  Workspace /{" "}
                  <span className="text-(--fg-0)">{activeLabel}</span>
                </p>
                <StatusPill label="Synced 4s ago" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}>
                  <MetricsGrid metrics={DASHBOARD_METRICS} />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
                    <ThroughputChart bars={DASHBOARD_CHART_BARS} />
                    <SignalsTable rows={DASHBOARD_SIGNALS} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </SectionShell>
    </section>
  );
}
