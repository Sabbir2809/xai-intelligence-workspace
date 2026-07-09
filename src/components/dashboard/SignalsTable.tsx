"use client";

import type { DASHBOARD_SIGNALS } from "@/data/dashboard";
import { fadeUpSmall } from "@/lib/motion";
import { motion } from "framer-motion";
import { memo } from "react";

type Signal = (typeof DASHBOARD_SIGNALS)[number];

type RowsProps = {
  rows: readonly Signal[];
};
export const SignalsTable = memo(function SignalsTable({ rows }: RowsProps) {
  return (
    <motion.div
      variants={fadeUpSmall}
      className="rounded-lg border border-(--hairline) p-4">
      <p className="font-label text-[11px] uppercase tracking-wider text-(--fg-2)">
        Latest signals
      </p>
      <div className="mt-3 flex flex-col">
        {rows.map((r) => (
          <div
            key={r.entity}
            className="flex items-center justify-between border-b border-(--hairline) py-2 text-xs last:border-0">
            <div>
              <p className="text-(--fg-0)">{r.signal}</p>
              <p className="mt-0.5 font-label text-[10px] text-(--fg-2)">
                {r.source} · {r.entity}
              </p>
            </div>
            <span className="font-label text-(--signal)">{r.confidence}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});
