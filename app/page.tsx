"use client";

import { useState } from "react";
import { sofas, Sofa } from "@/data/sofas";
import Navbar from "@/components/Navbar";
import CatalogSwitcher from "@/components/CatalogSwitcher";
import SofaGrid from "@/components/SofaGrid";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import { useLang } from "@/lib/i18n";

export default function Home() {
  const [selectedSofa, setSelectedSofa] = useState<Sofa | null>(null);
  const { t, num } = useLang();

  return (
    <main className="min-h-screen bg-dark pb-16 md:pb-0">
      <Navbar />

      {/* Which catalogue: sofas (here) · tables · dishes */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6">
        <CatalogSwitcher />
      </div>

      <section id="catalogue" className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16">
        <div className="flex items-baseline justify-between mb-5 sm:mb-8">
          <h1 className="text-white font-light tracking-[0.25em] text-lg sm:text-2xl uppercase">
            {t("catalog.sofas")}
          </h1>
          <p className="text-white/35 text-[11px] tracking-[0.2em] uppercase">
            {num(sofas.length)} {t("unit.models")}
          </p>
        </div>
        <SofaGrid sofas={sofas} onCardClick={setSelectedSofa} />
      </section>

      <Footer />

      <Lightbox sofa={selectedSofa} onClose={() => setSelectedSofa(null)} />

      <MobileTabBar />
    </main>
  );
}
