"use client";

import { PRODUCT_LOOKUP_TABS } from "@/api/ProductLookups";
import Link from "next/link";
import { useState } from "react";
import { LookupTabPanel } from "./components/LookupTabPanel";

export function ProductDescriptorsView() {
  const [activeSlug, setActiveSlug] = useState(PRODUCT_LOOKUP_TABS[0].slug);

  const activeTab =
    PRODUCT_LOOKUP_TABS.find((tab) => tab.slug === activeSlug) ??
    PRODUCT_LOOKUP_TABS[0];

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          Cadastre categorias, cores, tamanhos e demais descritores usados nos
          produtos.
        </p>
        <Link
          href="/admin/produtos"
          className="inline-flex items-center justify-center border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
        >
          Voltar aos produtos
        </Link>
      </div>

      <div
        role="tablist"
        aria-label="Tipos de descritor"
        className="-mx-1 mb-6 flex gap-1 overflow-x-auto border-b border-kyowa-border pb-px"
      >
        {PRODUCT_LOOKUP_TABS.map((tab) => {
          const isActive = tab.slug === activeSlug;

          return (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlug(tab.slug)}
              className={`shrink-0 px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-b-2 border-kyowa-maroon text-kyowa-maroon"
                  : "text-kyowa-muted hover:text-kyowa-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={activeTab.label}>
        <LookupTabPanel key={activeTab.slug} tab={activeTab} />
      </div>
    </>
  );
}
