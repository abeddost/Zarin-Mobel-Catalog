"use client";

import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  ProductType,
  getTablesByType,
  PRODUCT_TYPE_SLUGS,
  ROOMS,
  DEFAULT_PRODUCT_TYPE,
  productTypeFromSlug,
} from "@/data/tables";
import TableCard from "./TableCard";
import { useLang } from "@/lib/i18n";

interface TableGridProps {
  onCardClick: (table: Table) => void;
}

const typed = getTablesByType();

function countFor(type: ProductType) {
  return typed.filter((t) => t.productType === type).length;
}

interface BrowserProps extends TableGridProps {
  active: ProductType;
  onSelect: (type: ProductType) => void;
}

function TableBrowser({ onCardClick, active, onSelect }: BrowserProps) {
  const gridTopRef = useRef<HTMLDivElement>(null);
  const { t, num, collections } = useLang();
  const activeRoom = ROOMS.find((r) => r.types.includes(active)) ?? ROOMS[0];
  const group = typed.filter((t) => t.productType === active);

  function select(type: ProductType) {
    if (type === active) return;
    onSelect(type);
    // If the menu is stuck at the top, jump back to the start of the grid.
    const el = gridTopRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ block: "start" });
    }
  }

  return (
    <div>
      {/* Sticky room + category menu */}
      <div className="sticky top-16 z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 pb-4 bg-dark/95 backdrop-blur-md border-b border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
        <div className="max-w-3xl mx-auto">
          {/* Rooms: segmented switch */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
            {ROOMS.map((room) => {
              const isActive = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => select(room.types[0])}
                  aria-pressed={isActive}
                  className={`relative rounded-full py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold tracking-[0.08em] sm:tracking-[0.15em] uppercase transition-colors ${
                    isActive ? "text-neutral-900" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="room-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_4px_18px_rgba(255,255,255,0.18)]"
                    />
                  )}
                  <span className="relative">{t(`room.${room.id}`)}</span>
                </button>
              );
            })}
          </div>

          {/* Categories in the active room: blue pills */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {activeRoom.types.map((type) => {
              const isActive = type === active;
              return (
                <motion.button
                  key={type}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => select(type)}
                  aria-pressed={isActive}
                  className={`shrink-0 flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full border text-[11px] sm:text-[13px] font-semibold tracking-[0.06em] sm:tracking-[0.1em] uppercase transition-colors ${
                    isActive
                      ? "bg-blue-600 border-blue-500 text-white shadow-[0_6px_24px_rgba(37,99,235,0.55)]"
                      : "bg-blue-600/15 border-blue-500/40 text-blue-100 hover:bg-blue-600/30"
                  }`}
                >
                  {t(`type.${type}`)}
                  <span
                    className={`min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-[11px] tracking-normal ${
                      isActive ? "bg-white text-blue-700" : "bg-blue-500/25 text-blue-100"
                    }`}
                  >
                    {num(countFor(type))}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid for the active category */}
      <div ref={gridTopRef} className="scroll-mt-[160px] pt-8">
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
                {t(`type.${active}`)}
              </h2>
              <p className="text-white/35 text-[11px] tracking-[0.2em] uppercase">
                {collections(group.length)}
              </p>
            </div>

            {group.length === 0 ? (
              <p className="text-center py-24 text-white/25 tracking-[0.3em] text-sm uppercase">
                {t("common.noResults")}
              </p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {group.map((table, i) => (
                  <TableCard
                    key={table.id}
                    table={table}
                    index={i}
                    onClick={() => onCardClick(table)}
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

// Reads and writes the selected category in the URL (?kategorie=betten).
function UrlTableBrowser({ onCardClick }: TableGridProps) {
  const searchParams = useSearchParams();
  const active = productTypeFromSlug(searchParams.get("kategorie"));

  function onSelect(type: ProductType) {
    const params = new URLSearchParams(searchParams.toString());
    if (type === DEFAULT_PRODUCT_TYPE) params.delete("kategorie");
    else params.set("kategorie", PRODUCT_TYPE_SLUGS[type]);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }

  return <TableBrowser onCardClick={onCardClick} active={active} onSelect={onSelect} />;
}

export default function TableGrid({ onCardClick }: TableGridProps) {
  return (
    <Suspense
      fallback={
        <TableBrowser
          onCardClick={onCardClick}
          active={DEFAULT_PRODUCT_TYPE}
          onSelect={() => {}}
        />
      }
    >
      <UrlTableBrowser onCardClick={onCardClick} />
    </Suspense>
  );
}
