"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PRIMARY_NAV, SITE } from "@/data/site";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SectionShell } from "../ui/SectionShell";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-(--ink-0)/70 backdrop-blur-md">
      <SectionShell className="flex items-center justify-between py-4">
        <a
          href="#main-content"
          aria-label={`${SITE.name} home`}
          className="flex items-center">
          <Image
            src="/logo-dark.png"
            alt={SITE.name}
            width={104}
            height={58}
            priority
            className="logo-dark h-6 w-auto"
          />
          <Image
            src="/logo-light.png"
            alt={SITE.name}
            width={104}
            height={58}
            priority
            className="logo-light h-6 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-8 font-label text-xs text-(--fg-2) md:flex">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-(--fg-0)">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="hidden rounded border border-(--hairline) px-4 py-2 text-xs font-medium text-(--fg-0) transition hover:border-(--fg-2) md:inline-block cursor-pointer">
            Sign in
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded border border-(--hairline) text-(--fg-0) md:hidden cursor-pointer">
            {open ? (
              <X size={14} aria-hidden="true" />
            ) : (
              <Menu size={14} aria-hidden="true" />
            )}
          </button>
        </div>
      </SectionShell>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-(--hairline) font-label text-sm text-(--fg-1) md:hidden">
            <SectionShell className="flex flex-col gap-1 py-4">
              {PRIMARY_NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-2 py-2.5 transition-colors hover:bg-(--ink-2) hover:text-(--fg-0)">
                  {item.label}
                </a>
              ))}
              <button className="mt-2 rounded border border-(--hairline) px-4 py-2 text-left text-xs font-medium text-(--fg-0) cursor-pointer w-20">
                Sign in
              </button>
            </SectionShell>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
