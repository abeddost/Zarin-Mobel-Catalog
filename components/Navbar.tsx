"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { LanguageSwitch, useLang } from "@/lib/i18n";
import { CATALOGS, catalogFromPath } from "@/lib/catalogs";
import CatalogIcon from "@/components/CatalogIcon";

/** Fixed header, 64px high (the sticky category menus sit right below it: top-16). */
export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0.6, 1]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, num } = useLang();
  const active = catalogFromPath(usePathname());

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-6">
        <motion.div
          className="absolute inset-0 backdrop-blur-md border-b border-white/8"
          style={{ opacity: bgOpacity, backgroundColor: "rgba(10,8,6,0.9)" }}
        />

        <div className="relative h-full flex items-center gap-4 md:gap-8 max-w-7xl mx-auto">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Zarin Möbelhaus">
            <span className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
              <span className="text-gold text-xs font-bold">Z</span>
            </span>
            <span dir="ltr" className="hidden min-[400px]:block leading-none">
              <span className="text-white font-light tracking-[0.25em] text-sm uppercase">Zarin</span>
              <span className="text-gold font-light tracking-[0.15em] text-sm uppercase ms-1.5">Möbelhaus</span>
            </span>
          </Link>

          {/* Desktop: the three catalogues as tabs */}
          <nav aria-label={t("nav.catalogs")} className="hidden md:flex items-center gap-1 mx-auto">
            {CATALOGS.map((c) => {
              const isActive = c.id === active;
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-gold text-on-gold"
                      : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <CatalogIcon id={c.id} size={18} />
                  {t(c.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 ms-auto md:ms-0">
            <a
              href={active === "sofas" ? "#kontakt" : "/#kontakt"}
              className="hidden md:block text-white/60 hover:text-gold text-sm transition-colors"
            >
              {t("nav.contact")}
            </a>
            <LanguageSwitch />
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-gold hover:border-gold/40 hover:bg-white/5 transition-colors"
              aria-label={t("nav.openMenu")}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-dark-2 z-[70] flex flex-col border-l border-white/8 md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <p className="text-gold text-[11px] tracking-[0.3em] uppercase">{t("nav.catalogs")}</p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:text-gold hover:border-gold/40 hover:bg-white/5 transition-colors"
                  aria-label={t("nav.closeMenu")}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col px-4 py-4 gap-2">
                {CATALOGS.map((c) => {
                  const isActive = c.id === active;
                  return (
                    <Link
                      key={c.id}
                      href={c.href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors ${
                        isActive
                          ? "border-gold bg-gold/15 text-gold-light"
                          : "border-white/10 bg-white/[0.04] text-white/85 hover:border-gold/50"
                      }`}
                    >
                      <CatalogIcon id={c.id} size={20} className="text-gold" />
                      <span className="flex-1 text-sm font-semibold">{t(c.labelKey)}</span>
                      <span className="text-white/40 text-xs">{num(c.count)}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto px-6 py-6 border-t border-white/8 flex flex-col gap-4">
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-1">{t("common.contact")}</p>

                <a
                  href="tel:+4915756345284"
                  className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors text-sm"
                >
                  <Phone size={14} className="text-gold shrink-0" />
                  <span dir="ltr">+49 1575 6345284</span>
                </a>

                <a
                  href="mailto:zarinhome1@gmail.com"
                  className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors text-sm"
                >
                  <Mail size={14} className="text-gold shrink-0" />
                  zarinhome1@gmail.com
                </a>

                <div className="flex items-start gap-3 text-white/40 text-sm">
                  <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                  <span>Industriestraße 17<br />65474 Bischofsheim</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
