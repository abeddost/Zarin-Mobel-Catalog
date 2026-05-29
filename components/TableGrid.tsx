"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Table } from "@/data/tables";
import TableCard from "./TableCard";

interface TableGridProps {
  tables: Table[];
  onCardClick: (table: Table) => void;
}

export default function TableGrid({ tables, onCardClick }: TableGridProps) {
  if (tables.length === 0) {
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
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center"
    >
      <AnimatePresence mode="popLayout">
        {tables.map((table, i) => (
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
  );
}
