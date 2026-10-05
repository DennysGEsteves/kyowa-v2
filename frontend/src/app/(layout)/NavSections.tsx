"use client";

import { getActiveNavSectionTitle } from "@/app/(layout)/navigation";
import { navSections } from "@routes";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "kyowa_admin_nav_sections";

function buildDefaultExpanded(): Record<string, boolean> {
  return Object.fromEntries(
    navSections().map((section) => [section.title, false]),
  );
}

function readStoredExpanded(): Record<string, boolean> {
  const defaults = buildDefaultExpanded();

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    const merged = { ...defaults, ...parsed };
    const openTitles = navSections()
      .map((section) => section.title)
      .filter((title) => merged[title]);

    if (openTitles.length <= 1) {
      return merged;
    }

    const normalized = buildDefaultExpanded();
    normalized[openTitles[0]] = true;
    return normalized;
  } catch {
    return defaults;
  }
}

type AdminNavSectionsProps = {
  onNavigate?: () => void;
};

export function AdminNavSections({ onNavigate }: AdminNavSectionsProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] =
    useState<Record<string, boolean>>(buildDefaultExpanded);

  useEffect(() => {
    setTimeout(() => {
      setExpanded(readStoredExpanded());
    }, 0);
  }, []);

  useEffect(() => {
    const activeSection = getActiveNavSectionTitle(pathname);
    if (!activeSection) return;

    setTimeout(() => {
      setExpanded((current) => {
        const onlyActiveOpen = navSections().every(
          (section) =>
            (current[section.title] ?? false) ===
            (section.title === activeSection),
        );
        if (onlyActiveOpen) return current;

        const next = buildDefaultExpanded();
        next[activeSection] = true;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    }, 0);
  }, [pathname]);

  const toggleSection = useCallback((title: string) => {
    setExpanded((current) => {
      const opening = !current[title];
      const next = buildDefaultExpanded();
      if (opening) {
        next[title] = true;
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <>
      {navSections().map((section) => {
        const isOpen = expanded[section.title] ?? false;
        const sectionHasActiveItem = section.items.some((item) =>
          pathname.startsWith(item.href),
        );

        return (
          <div key={section.title} className="mb-2 last:mb-0">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.18em] transition sm:px-4 ${
                sectionHasActiveItem
                  ? "text-kyowa-gold"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <span>{section.title}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                strokeWidth={1.75}
                aria-hidden
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <ul className="overflow-hidden">
                <div className="space-y-1 pb-2 pt-1">
                  {section.items.map((item) => {
                    const active = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className={`flex items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium transition sm:px-4 ${
                            active
                              ? "bg-white/15 text-kyowa-gold"
                              : "text-white/85 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon
                            className="h-4 w-4 shrink-0"
                            strokeWidth={1.75}
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
