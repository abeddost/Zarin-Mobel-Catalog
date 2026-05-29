"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { tables, Table } from "@/data/tables";
import Navbar from "@/components/Navbar";
import TableGrid from "@/components/TableGrid";
import TableLightbox from "@/components/TableLightbox";

export default function TablesPage() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <main className="min-h-screen bg-[#0a0806]">
      <Navbar />

      {/* Collection navigation */}
      <section className="relative pt-28 pb-6 px-6">
        <div className="max-w-[1500px] mx-auto">
          <p className="text-center text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-8">
            Unsere Kollektionen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <a
              href="/"
              className="flex-1 bg-white/8 border border-[#c9a96e]/70 hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] px-6 py-4 text-center transition-all duration-300 group"
            >
              <p className="text-[#c9a96e]/60 group-hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1 transition-colors duration-300">
                Entdecken
              </p>
              <span className="text-white font-light tracking-[0.2em] text-sm uppercase group-hover:text-[#c9a96e] transition-colors duration-300">
                Polstermöbel
              </span>
            </a>
            <div className="flex-1 bg-[#c9a96e] px-6 py-4 text-center">
              <p className="text-[#1b140d]/70 text-[10px] tracking-[0.4em] uppercase mb-1">Aktiv</p>
              <span className="text-[#1b140d] font-semibold tracking-[0.2em] text-sm uppercase">
                Tische & Stühle
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue section */}
      <section id="catalogue" className="relative">
        {/* Section divider */}
        <div className="relative py-16 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806] via-[#0d0b08] to-[#0a0806]" />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative flex items-center gap-6"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a96e]" />
            <div className="text-center">
              <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2">
                Greens Kollektion
              </p>
              <h2 className="text-white font-extralight tracking-[0.3em] uppercase text-2xl">
                Tische & Stühle
              </h2>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a96e]" />
          </motion.div>
        </div>

        {/* Grid area */}
        <div className="w-full max-w-[1500px] mx-auto px-6 py-12">
          <TableGrid tables={tables} onCardClick={setSelectedTable} />
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-[#c9a96e]/50 flex items-center justify-center">
                <span className="text-[#c9a96e] text-[10px] font-bold">Z</span>
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
    </main>
  );
}
