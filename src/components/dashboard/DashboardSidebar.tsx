"use client";

import { DASHBOARD_NAV, type DashboardTabKey } from "@/data/dashboard";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  Database,
  LayoutDashboard,
  Settings,
  Zap,
  type LucideIcon,
} from "lucide-react";

const NAV_ICONS: Record<DashboardTabKey, LucideIcon> = {
  overview: LayoutDashboard,
  signals: Activity,
  automations: Zap,
  sources: Database,
  settings: Settings,
};

type DashboardSidebarProps = {
  activeTab: DashboardTabKey;
  onSelect: (tab: DashboardTabKey) => void;
};

export function DashboardSidebar({
  activeTab,
  onSelect,
}: DashboardSidebarProps) {
  return (
    <div className="border-b border-(--hairline) p-4 md:border-b-0 md:border-r">
      <div className="mb-4 flex items-center gap-2 px-2 md:mb-6">
        <span className="h-2 w-2 rounded-full bg-(--signal)" />
        <span className="font-label text-xs tracking-widest text-(--fg-0)">
          {SITE.name.toUpperCase()}
        </span>
      </div>
      <nav
        className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible"
        role="tablist"
        aria-label="Workspace sections">
        {DASHBOARD_NAV.map((n) => {
          const Icon = NAV_ICONS[n.key];
          return (
            <button
              key={n.key}
              role="tab"
              aria-selected={activeTab === n.key}
              onClick={() => onSelect(n.key)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors cursor-pointer",
                activeTab === n.key
                  ? "text-(--fg-0)"
                  : "text-(--fg-2) hover:text-(--fg-1)",
              )}>
              {activeTab === n.key && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-md bg-(--ink-2)"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <Icon
                size={15}
                strokeWidth={2}
                className="relative shrink-0"
                aria-hidden="true"
              />
              <span className="relative">{n.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
