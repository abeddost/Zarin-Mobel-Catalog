"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

const NAV_LINKS = [
  { label: "Kollektion", href: "#catalogue" },
  { label: "Über uns", href: "#kontakt" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.15]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{}}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{ opacity: bgOpacity, backgroundColor: "rgba(10,8,6,0.85)" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gold"
          style={{ opacity: borderOpacity }}
        />

        <div className="relative flex items-center justify-end max-w-7xl mx-auto">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/60 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/tables"
              className="text-gold text-xs tracking-[0.2em] uppercase transition-all duration-300 bg-gold/15 border border-gold hover:bg-gold/25 px-3 py-1.5"
            >
              Tische
            </a>
          </nav>

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-gold hover:border-gold/40 hover:bg-white/5 transition-colors"
            aria-label="Menü öffnen"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-[60] md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-dark-2 z-[70] flex flex-col border-l border-white/8 md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-end px-6 py-5 border-b border-white/8">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/50 hover:text-gold hover:border-gold/40 hover:bg-white/5 transition-colors"
                  aria-label="Menü schließen"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-6 py-6 gap-1">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="py-3 text-white/60 hover:text-gold text-xs tracking-[0.25em] uppercase transition-colors duration-300 border-b border-white/5"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/tables"
                  onClick={() => setDrawerOpen(false)}
                  className="py-3 text-gold text-xs tracking-[0.25em] uppercase transition-colors duration-300 border-b border-gold/20 font-medium"
                >
                  Tische
                </a>
              </nav>

              {/* Contact info */}
              <div className="mt-auto px-6 py-6 border-t border-white/8 flex flex-col gap-4">
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-1">Kontakt</p>

                <a
                  href="tel:+4915756345284"
                  className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors text-sm"
                >
                  <Phone size={14} className="text-gold shrink-0" />
                  +49 1575 6345284
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
