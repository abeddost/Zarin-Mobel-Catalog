"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sofas, Sofa } from "@/data/sofas";
import Navbar from "@/components/Navbar";
import { ToscanaHero } from "@/components/ToscanaHero";
import SofaGrid from "@/components/SofaGrid";
import Lightbox from "@/components/Lightbox";

export default function Home() {
  const [selectedSofa, setSelectedSofa] = useState<Sofa | null>(null);

  function scrollToCatalogue() {
    document.getElementById("catalogue")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0806]">
      <Navbar />
      <ToscanaHero onExploreCatalogue={scrollToCatalogue} />

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
                Unsere Kollektion
              </p>
              <h2 className="text-white font-extralight tracking-[0.3em] uppercase text-2xl">
                Alle Modelle
              </h2>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a96e]" />
          </motion.div>
        </div>

        {/* Grid area */}
        <div className="w-full max-w-[1500px] mx-auto px-6 py-12">
          <SofaGrid sofas={sofas} onCardClick={setSelectedSofa} />
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
      <Lightbox sofa={selectedSofa} onClose={() => setSelectedSofa(null)} />
    </main>
  );
}
