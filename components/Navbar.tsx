"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.15]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{}}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{ opacity: bgOpacity, backgroundColor: "rgba(10,8,6,0.85)" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a96e]"
        style={{ opacity: borderOpacity }}
      />

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#c9a96e] flex items-center justify-center">
            <span className="text-[#c9a96e] text-xs font-bold tracking-widest">Z</span>
          </div>
          <div>
            <span className="text-white font-light tracking-[0.3em] text-sm uppercase">
              Zarin
            </span>
            <span className="text-[#c9a96e] font-light tracking-[0.2em] text-sm uppercase ml-2">
              Möbelhaus
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Kollektion", "Über uns", "Kontakt"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/60 hover:text-[#c9a96e] text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
