"use client";

import { motion } from "framer-motion";
import { SERIES_FILTERS, TYPE_FILTERS, SeriesFilter, TypeFilter } from "@/data/sofas";

interface FilterBarProps {
  activeSeries: SeriesFilter;
  activeType: TypeFilter | "all";
  onSeriesChange: (s: SeriesFilter) => void;
  onTypeChange: (t: TypeFilter | "all") => void;
  search: string;
  onSearchChange: (v: string) => void;
}

const SERIES_LABELS: Record<string, string> = {
  ALL: "Alle",
  ALMİRA: "Almira",
  AVANOS: "Avanos",
  LUCAS: "Lucas",
  SOLO: "Weitere",
};

const TYPE_LABELS: Record<string, string> = {
  all: "Alle Typen",
  sofa: "Sofa",
  corner: "Ecksofa",
  armchair: "Sessel",
};

export default function FilterBar({
  activeSeries,
  activeType,
  onSeriesChange,
  onTypeChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-[64px] z-40 bg-[#0a0806]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Sofa suchen..."
            className="w-full md:w-72 bg-white/5 border border-white/10 rounded-none px-4 py-2.5 text-white/80 text-sm tracking-wide placeholder:text-white/30 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">⌕</span>
        </div>

        {/* Series filters — horizontal scroll on mobile */}
        <div className="overflow-x-auto scrollbar-hide scroll-touch -mx-6 px-6">
          <div className="flex flex-nowrap items-center gap-2 pb-1">
            <span className="text-white/30 text-xs tracking-[0.2em] uppercase mr-1 shrink-0">Serie:</span>
            {SERIES_FILTERS.map((s) => (
              <FilterChip
                key={s}
                label={SERIES_LABELS[s] ?? s}
                active={activeSeries === s}
                onClick={() => onSeriesChange(s)}
              />
            ))}
          </div>
        </div>

        {/* Type filters — horizontal scroll on mobile */}
        <div className="overflow-x-auto scrollbar-hide scroll-touch -mx-6 px-6">
          <div className="flex flex-nowrap items-center gap-2 pb-1">
            <span className="text-white/30 text-xs tracking-[0.2em] uppercase mr-1 shrink-0">Typ:</span>
            <FilterChip
              label={TYPE_LABELS["all"]}
              active={activeType === "all"}
              onClick={() => onTypeChange("all")}
            />
            {TYPE_FILTERS.map((t) => (
              <FilterChip
                key={t}
                label={TYPE_LABELS[t]}
                active={activeType === t}
                onClick={() => onTypeChange(t)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="relative shrink-0 px-4 min-h-[44px] text-xs tracking-[0.15em] uppercase transition-colors duration-300 overflow-hidden whitespace-nowrap"
      style={{
        color: active ? "#0a0806" : "rgba(255,255,255,0.5)",
        border: `1px solid ${active ? "#c9a96e" : "rgba(255,255,255,0.12)"}`,
      }}
    >
      {active && (
        <motion.span
          layoutId="chip-bg"
          className="absolute inset-0 bg-[#c9a96e]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
