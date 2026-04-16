"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sofa } from "@/data/sofas";
import SofaCard from "./SofaCard";

interface SofaGridProps {
  sofas: Sofa[];
  onCardClick: (sofa: Sofa) => void;
}

export default function SofaGrid({ sofas, onCardClick }: SofaGridProps) {
  if (sofas.length === 0) {
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
        {sofas.map((sofa, i) => (
          <div
            key={sofa.id}
            className="w-full max-w-[34rem]"
          >
            <SofaCard
              sofa={sofa}
              index={i}
              onClick={() => onCardClick(sofa)}
            />
          </div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
