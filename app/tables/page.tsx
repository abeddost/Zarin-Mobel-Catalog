"use client";

import { useState } from "react";
import { Table } from "@/data/tables";
import Navbar from "@/components/Navbar";
import CatalogSwitcher from "@/components/CatalogSwitcher";
import TableGrid from "@/components/TableGrid";
import TableLightbox from "@/components/TableLightbox";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";

export default function TablesPage() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <main className="min-h-screen bg-dark pb-16 md:pb-0">
      <Navbar />

      {/* Which catalogue: sofas · tables (here) · dishes */}
      <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
        <CatalogSwitcher />
      </div>

      <section id="catalogue" className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 pb-16">
        <TableGrid onCardClick={setSelectedTable} />
      </section>

      <Footer />

      <TableLightbox table={selectedTable} onClose={() => setSelectedTable(null)} />

      <MobileTabBar />
    </main>
  );
}
