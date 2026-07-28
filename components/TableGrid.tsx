"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Table, getTablesByType, PRODUCT_TYPE_ORDER, PRODUCT_TYPE_LABELS, TypedTable } from "@/data/tables";
import TableCard from "./TableCard";

interface TableGridProps {
  onCardClick: (table: Table) => void;
}

export default function TableGrid({ onCardClick }: TableGridProps) {
  const typed = getTablesByType();

  if (typed.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-32"
      >
        <p className="text-white/25 tracking-[0.3em] text-sm uppercase">
          Keine Ergebnisse gefunden
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-20">
      {PRODUCT_TYPE_ORDER.map((type) => {
        const group = typed.filter((t) => t.productType === type);
        if (group.length === 0) return null;
        return (
          <section key={type}>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-6 mb-10"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <div className="text-center">
                <h2 className="text-gold font-light tracking-[0.4em] text-sm uppercase">
                  {PRODUCT_TYPE_LABELS[type]}
                </h2>
                <p className="text-white/20 text-[10px] tracking-[0.25em] mt-1">
                  {group.length} {group.length === 1 ? "Kollektion" : "Kollektionen"}
                </p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </motion.div>

            {/* Cards */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center"
            >
              <AnimatePresence mode="popLayout">
                {group.map((table: TypedTable, i: number) => (
                  <div key={table.id} className="w-full max-w-[34rem]">
                    <TableCard
                      table={table}
                      index={i}
                      onClick={() => onCardClick(table)}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
