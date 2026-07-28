"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Table } from "@/data/tables";
import Navbar from "@/components/Navbar";
import TableGrid from "@/components/TableGrid";
import TableLightbox from "@/components/TableLightbox";
import CatalogSwitchButton from "@/components/CatalogSwitchButton";

export default function TablesPage() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      {/* Catalogue section */}
      <section id="catalogue" className="relative pt-28">
        {/* Section divider */}
        <div className="relative py-16 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-2 to-dark" />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative flex items-center gap-6"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <div className="text-center">
              <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-2">
                Greens Kollektion
              </p>
              <h2 className="text-white font-extralight tracking-[0.3em] uppercase text-2xl">
                Tische & Stühle
              </h2>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        </div>

        {/* Grid area */}
        <div className="w-full max-w-[1500px] mx-auto px-6 py-12">
          <TableGrid onCardClick={setSelectedTable} />
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold text-[10px] font-bold">Z</span>
              </div>
              <span className="text-white/30 text-xs tracking-[0.3em] uppercase">
                Zarin Möbelhaus
              </span>
            </div>
            <p className="text-white/15 text-xs tracking-widest">
              © {new Date().getFullYear()} · Premium-Möbelkollektion
            </p>
          </div>
        </footer>
      </section>

      {/* Lightbox */}
      <TableLightbox table={selectedTable} onClose={() => setSelectedTable(null)} />

      {/* Floating navigation button — Möbel Catalogue */}
      <CatalogSwitchButton href="/" label="Möbelkatalog" direction="left" />
    </main>
  );
}
