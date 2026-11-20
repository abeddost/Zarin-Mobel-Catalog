"use client";

import { useState } from "react";
import { ZorofProduct, ZOROF_CATEGORIES } from "@/data/zorof";
import Navbar from "@/components/Navbar";
import CatalogSwitcher from "@/components/CatalogSwitcher";
import ZorofGrid from "@/components/ZorofGrid";
import TableLightbox from "@/components/TableLightbox";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import { useLang } from "@/lib/i18n";

export default function ZorofPage() {
  const [selected, setSelected] = useState<ZorofProduct | null>(null);
  const { lang } = useLang();

  // The lightbox shows the product in the current language.
  const lightboxItem = selected && {
    id: selected.id,
    displayName: selected.name[lang],
    series: ZOROF_CATEGORIES[selected.category].label[lang],
    variant: "",
    images: selected.images,
    details: selected.sizes,
  };

  return (
    <main className="min-h-screen bg-dark pb-16 md:pb-0">
      <Navbar />

      {/* Which catalogue: sofas · tables · dishes (here) */}
      <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
        <CatalogSwitcher />
      </div>

      <section id="catalogue" className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 pb-16">
        <ZorofGrid onCardClick={setSelected} />
      </section>

      <Footer />

      <TableLightbox table={lightboxItem} onClose={() => setSelected(null)} />

      <MobileTabBar />
    </main>
  );
}
