"use client";

import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ZorofCategory,
  ZorofProduct,
  ZOROF_CATEGORIES,
  ZOROF_GROUPS,
  DEFAULT_ZOROF_CATEGORY,
  zorofCategoryFromSlug,
  zorofProducts,
} from "@/data/zorof";
import ZorofCard from "./ZorofCard";
import { useLang } from "@/lib/i18n";

interface ZorofGridProps {
  onCardClick: (product: ZorofProduct) => void;
}

function countFor(category: ZorofCategory) {
  return zorofProducts.filter((p) => p.category === category).length;
}

interface BrowserProps extends ZorofGridProps {
  active: ZorofCategory;
  onSelect: (category: ZorofCategory) => void;
}

function ZorofBrowser({ onCardClick, active, onSelect }: BrowserProps) {
  const gridTopRef = useRef<HTMLDivElement>(null);
  const { lang, t, num } = useLang();
  const activeGroup = ZOROF_GROUPS.find((g) => g.categories.includes(active)) ?? ZOROF_GROUPS[0];
  const group = zorofProducts.filter((p) => p.category === active);

  function select(category: ZorofCategory) {
    if (category === active) return;
    onSelect(category);
    // If the menu is stuck at the top, jump back to the start of the grid.
    const el = gridTopRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div>
      {/* Sticky group + category menu */}
      <div className="sticky top-[64px] md:top-[56px] z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 pb-4 bg-dark/95 backdrop-blur-md border-b border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
        <div className="max-w-4xl mx-auto">
          {/* Groups: segmented switch (2 rows of 3 on phones) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 rounded-2xl sm:rounded-full bg-white/[0.06] border border-white/10">
            {ZOROF_GROUPS.map((g) => {
              const isActive = g.id === activeGroup.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => select(g.categories[0])}
                  aria-pressed={isActive}
                  className={`relative rounded-full px-1 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-[0.04em] sm:tracking-[0.08em] uppercase leading-tight transition-colors ${
                    isActive ? "text-neutral-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="zorof-group-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_4px_18px_rgba(255,255,255,0.18)]"
                    />
                  )}
                  <span className="relative">{g.label[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Categories in the active group: blue pills */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {activeGroup.categories.map((category) => {
              const isActive = category === active;
              return (
                <motion.button
                  key={category}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => select(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full border text-[11px] sm:text-[13px] font-semibold tracking-[0.06em] sm:tracking-[0.1em] uppercase transition-colors ${
                    isActive
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_6px_24px_rgba(37,99,235,0.55)]"
                      : "bg-blue-600/15 border-blue-500/40 text-blue-100 hover:bg-blue-600/30"
                  }`}
                >
                  {ZOROF_CATEGORIES[category].label[lang]}
                  <span
                    className={`min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-[11px] tracking-normal ${
                      isActive ? "bg-white text-blue-700" : "bg-blue-500/25 text-blue-100"
                    }`}
                  >
                    {num(countFor(category))}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid for the active category */}
      <div ref={gridTopRef} className="scroll-mt-[200px] pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-white font-light tracking-[0.25em] text-base sm:text-lg uppercase">
                {ZOROF_CATEGORIES[active].label[lang]}
              </h2>
              <p className="text-white/35 text-[11px] tracking-[0.2em] uppercase">
                {num(group.length)} {t("zorof.products")}
              </p>
            </div>

            {group.length === 0 ? (
              <p className="text-center py-24 text-white/25 tracking-[0.3em] text-sm uppercase">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {group.map((product, i) => (
                  <ZorofCard
                    key={product.id}
                    product={product}
                    index={i}
                    onClick={() => onCardClick(product)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reads and writes the selected category in the URL (?kategorie=tassen).
function UrlZorofBrowser({ onCardClick }: ZorofGridProps) {
  const searchParams = useSearchParams();
  const active = zorofCategoryFromSlug(searchParams.get("kategorie"));

  function onSelect(category: ZorofCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === DEFAULT_ZOROF_CATEGORY) params.delete("kategorie");
    else params.set("kategorie", ZOROF_CATEGORIES[category].slug);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }

  return <ZorofBrowser onCardClick={onCardClick} active={active} onSelect={onSelect} />;
}

export default function ZorofGrid({ onCardClick }: ZorofGridProps) {
  return (
    <Suspense
      fallback={
        <ZorofBrowser onCardClick={onCardClick} active={DEFAULT_ZOROF_CATEGORY} onSelect={() => {}} />
      }
    >
      <UrlZorofBrowser onCardClick={onCardClick} />
    </Suspense>
  );
}
