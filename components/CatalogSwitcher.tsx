"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATALOGS, catalogFromPath } from "@/lib/catalogs";
import CatalogIcon from "@/components/CatalogIcon";
import { useLang } from "@/lib/i18n";

/**
 * Three photo tiles (Sofas · Tables · Dishes) at the top of every catalogue page,
 * so visitors see right away that there are three catalogues and which one they are in.
 */
export default function CatalogSwitcher() {
  const active = catalogFromPath(usePathname());
  const { t, num } = useLang();

  return (
    <nav aria-label={t("nav.catalogs")} className="w-full max-w-5xl mx-auto">
      <ul className="grid grid-cols-3 gap-2 sm:gap-4">
        {CATALOGS.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id}>
              <Link
                href={c.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative block overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-gold shadow-[0_10px_36px_rgba(201,169,110,0.35)]"
                    : "border-white/10 hover:border-gold/60"
                }`}
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/10]">
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 33vw, 340px"
                    quality={60}
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      isActive ? "" : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 flex flex-col items-center sm:items-start text-center sm:text-start gap-1">
                    <span
                      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ${
                        isActive ? "bg-gold text-on-gold" : "bg-black/50 text-gold border border-gold/40"
                      }`}
                    >
                      <CatalogIcon id={c.id} size={17} />
                    </span>
                    <span
                      className={`font-semibold leading-tight text-[13px] sm:text-lg ${
                        isActive ? "text-gold-light" : "text-white"
                      }`}
                    >
                      {t(c.labelKey)}
                    </span>
                    <span className="text-white/60 text-[10px] sm:text-xs">
                      {num(c.count)} {t(c.unitKey)}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
