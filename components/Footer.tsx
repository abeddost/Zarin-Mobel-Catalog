"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-dark-0 border-t border-white/8 px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
              <span className="text-gold text-xs font-bold tracking-widest">Z</span>
            </div>
            <div>
              <span className="text-white font-light tracking-[0.3em] text-sm uppercase">Zarin</span>
              <span className="text-gold font-light tracking-[0.2em] text-sm uppercase ml-2">Möbelhaus</span>
            </div>
          </div>
          <p className="text-white/25 text-xs tracking-[0.15em] font-serif italic text-lg leading-snug">
            Premium-Möbelkollektion
          </p>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">Adresse</p>
          <address className="not-italic flex items-start gap-3 text-white/50 text-sm leading-relaxed">
            <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
            <span>
              Industriestraße 17<br />
              65474 Bischofsheim<br />
              Deutschland
            </span>
          </address>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">Kontakt</p>
          <a
            href="tel:+4915756345284"
            className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors duration-300 text-sm py-1"
          >
            <Phone size={15} className="text-gold shrink-0" />
            +49 1575 6345284
          </a>
          <a
            href="mailto:zarinhome1@gmail.com"
            className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors duration-300 text-sm py-1"
          >
            <Mail size={15} className="text-gold shrink-0" />
            zarinhome1@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/15 text-xs tracking-widest">
          © {new Date().getFullYear()} Zarin Möbelhaus
        </p>
        <p className="text-white/10 text-xs tracking-wide">
          Industriestraße 17 · 65474 Bischofsheim
        </p>
      </div>
    </footer>
  );
}
