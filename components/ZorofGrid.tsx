"use client";

import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, CookingPot, HandPlatter, Lamp, Luggage, Utensils, type LucideIcon } from "lucide-react";
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

// One icon per group, so the group buttons are easy to tell apart at a glance.
const GROUP_ICONS: Record<string, LucideIcon> = {
  servieren: HandPlatter,
  geschirr: Utensils,
  tee: Coffee,
  kueche: CookingPot,
  deko: Lamp,
  reise: Luggage,
};

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
          {/* Groups: one button each (2 rows of 3 on phones, one row on desktop) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ZOROF_GROUPS.map((g) => {
              const isActive = g.id === activeGroup.id;
              const Icon = GROUP_ICONS[g.id] ?? HandPlatter;
              return (
                <motion.button
                  key={g.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => select(g.categories[0])}
                  aria-pressed={isActive}
                  className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-1 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold tracking-[0.04em] sm:tracking-[0.08em] uppercase leading-tight transition-colors ${
                    isActive
                      ? "border-gold-light bg-gradient-to-b from-gold-light to-gold text-on-gold shadow-[0_8px_24px_rgba(201,169,110,0.4)]"
                      : "border-white/15 bg-white/[0.07] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.35)] hover:border-gold/60 hover:bg-white/[0.12] hover:text-white"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.75} className={isActive ? "" : "text-gold"} />
                  <span>{g.label[lang]}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Categories in the active group: blue pills */}
          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {activeGroup.categories.map((category) => {
              const isActive = category === active;
              return (
                <motion.button
                  key={category}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => select(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 flex items-center gap-2 min-h-10 ps-4 pe-1.5 py-1.5 rounded-full border text-xs sm:text-[13px] font-semibold tracking-[0.06em] sm:tracking-[0.1em] uppercase transition-colors ${
                    isActive
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_6px_24px_rgba(37,99,235,0.55)]"
                      : "bg-[#141c33] border-blue-400/45 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_2px_8px_rgba(0,0,0,0.35)] hover:bg-[#1b2748] hover:border-blue-400/80"
                  }`}
                >
                  {ZOROF_CATEGORIES[category].label[lang]}
                  <span
                    className={`min-w-7 h-7 px-1.5 rounded-full flex items-center justify-center text-[11px] tracking-normal ${
                      isActive ? "bg-white text-blue-700" : "bg-blue-500/30 text-blue-100"
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
      <div ref={gridTopRef} className="scroll-mt-[240px] sm:scroll-mt-[190px] pt-8">
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
