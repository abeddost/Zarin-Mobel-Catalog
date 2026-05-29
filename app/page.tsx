"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { sofas, Sofa } from "@/data/sofas";
import Navbar from "@/components/Navbar";
import SofaGrid from "@/components/SofaGrid";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedSofa, setSelectedSofa] = useState<Sofa | null>(null);

  return (
    <main className="min-h-screen bg-[#0a0806]">
      <Navbar />

      {/* Collection navigation */}
      <section className="relative py-10 px-6">
        <div className="max-w-[1500px] mx-auto">
          <p className="text-center text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-8">
            Unsere Kollektionen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1 bg-[#c9a96e] px-6 py-4 text-center">
              <p className="text-[#1b140d]/70 text-[10px] tracking-[0.4em] uppercase mb-1">Aktiv</p>
              <span className="text-[#1b140d] font-semibold tracking-[0.2em] text-sm uppercase">
                Polstermöbel
              </span>
            </div>
            <a
              href="/tables"
              className="flex-1 bg-white/8 border border-[#c9a96e]/70 hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] px-6 py-4 text-center transition-all duration-300 group"
            >
              <p className="text-[#c9a96e]/60 group-hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase mb-1 transition-colors duration-300">
                Entdecken
              </p>
              <span className="text-white font-light tracking-[0.2em] text-sm uppercase group-hover:text-[#c9a96e] transition-colors duration-300">
                Tische & Stühle
              </span>
            </a>
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

      <Footer />

      {/* Lightbox */}
      <Lightbox sofa={selectedSofa} onClose={() => setSelectedSofa(null)} />

      {/* Floating navigation button — Tische */}
      <motion.a
        href="/tables"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-full shadow-[0_8px_32px_rgba(37,99,235,0.45)] text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        Tischkatalog
        <ArrowRight size={14} />
      </motion.a>

      {/* Sticky mobile contact FABs */}
      <div
        className="fixed bottom-6 right-6 z-40 md:hidden flex flex-col items-end gap-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href="https://wa.me/4915756345284"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:opacity-80 transition-opacity"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        <a
          href="tel:+4915756345284"
          className="flex items-center gap-2 bg-[#c9a96e] text-[#1b140d] rounded-full px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:opacity-80 transition-opacity"
        >
          <Phone size={15} />
          Anrufen
        </a>
      </div>
    </main>
  );
}
