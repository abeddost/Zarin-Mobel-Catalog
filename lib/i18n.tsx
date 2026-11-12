"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

export type Lang = "fa" | "de";
export const DEFAULT_LANG: Lang = "fa";

const STORAGE_KEY = "zarin-lang";

// All UI text. Model names (e.g. "Gucci Cream Gold") are not translated.
const dict = {
  "nav.collection":      { fa: "مجموعه", de: "Kollektion" },
  "nav.about":           { fa: "درباره ما", de: "Über uns" },
  "nav.contact":         { fa: "تماس", de: "Kontakt" },
  "nav.tables":          { fa: "میز و اتاق خواب", de: "Tische" },
  "nav.openMenu":        { fa: "باز کردن منو", de: "Menü öffnen" },
  "nav.closeMenu":       { fa: "بستن منو", de: "Menü schließen" },
  "nav.language":        { fa: "زبان", de: "Sprache" },

  "home.kicker":         { fa: "مجموعه ما", de: "Unsere Kollektion" },
  "home.title":          { fa: "همه مدل‌ها", de: "Alle Modelle" },
  "home.toTables":       { fa: "کاتالوگ میز", de: "Tischkatalog" },
  "home.whatsapp":       { fa: "واتس‌اپ", de: "WhatsApp" },
  "home.call":           { fa: "تماس", de: "Anrufen" },

  "tables.title":        { fa: "میز، صندلی و اتاق خواب", de: "Tische, Stühle & Schlafzimmer" },
  "tables.toSofas":      { fa: "کاتالوگ مبل", de: "Möbelkatalog" },

  "common.noResults":    { fa: "موردی یافت نشد", de: "Keine Ergebnisse gefunden" },
  "common.premium":      { fa: "مجموعه مبلمان لوکس", de: "Premium-Möbelkollektion" },
  "common.address":      { fa: "آدرس", de: "Adresse" },
  "common.contact":      { fa: "تماس", de: "Kontakt" },
  "common.country":      { fa: "آلمان", de: "Deutschland" },

  "lightbox.close":      { fa: "بستن", de: "Schließen" },
  "lightbox.prev":       { fa: "تصویر قبلی", de: "Vorheriges Bild" },
  "lightbox.next":       { fa: "تصویر بعدی", de: "Nächstes Bild" },
  "lightbox.swipe":      { fa: "← بکشید →", de: "← wischen →" },

  "sofa.sofa":           { fa: "کاناپه", de: "Sofa" },
  "sofa.corner":         { fa: "مبل ال", de: "Ecksofa" },
  "sofa.armchair":       { fa: "مبل تک‌نفره", de: "Sessel" },

  "room.esszimmer":      { fa: "ناهارخوری", de: "Esszimmer" },
  "room.wohnzimmer":     { fa: "پذیرایی", de: "Wohnzimmer" },
  "room.schlafzimmer":   { fa: "اتاق خواب", de: "Schlafzimmer" },

  "type.DINING_TABLE":   { fa: "میز ناهارخوری", de: "Esstische" },
  "type.CHAIR":          { fa: "صندلی", de: "Stühle" },
  "type.COFFEE_TABLE":   { fa: "میز جلومبلی", de: "Couchtische" },
  "type.TV_TABLE":       { fa: "میز تلویزیون", de: "TV-Tische" },
  "type.BED":            { fa: "تخت خواب", de: "Betten" },
  "type.WARDROBE":       { fa: "کمد لباس", de: "Kleiderschränke" },
  "type.MAKEUP_TABLE":   { fa: "میز آرایش", de: "Schminktische" },
} satisfies Record<string, Record<Lang, string>>;

export type TextKey = keyof typeof dict;

// ── Language store (localStorage, shared across components) ─────────────
let memoryLang: Lang | null = null;
const listeners = new Set<() => void>();

function readLang(): Lang {
  if (memoryLang) return memoryLang;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fa" || stored === "de") memoryLang = stored;
  } catch {
    // storage unavailable (private mode etc.) — fall back to the default
  }
  return memoryLang ?? DEFAULT_LANG;
}

function writeLang(lang: Lang) {
  memoryLang = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore — the choice still applies for this visit
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      memoryLang = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// ── Context ─────────────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TextKey) => string;
  /** Formats a number with Persian digits in Persian, Latin digits in German. */
  num: (n: number) => string;
  /** "7 Fotos" / "۷ عکس" */
  photos: (n: number) => string;
  /** "14 Kollektionen" / "۱۴ مجموعه" */
  collections: (n: number) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

  // Keep <html lang/dir> in sync so RTL layout and fonts follow the language.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => writeLang(l), []);

  const value = useMemo<LangContextValue>(() => {
    const num = (n: number) => n.toLocaleString(lang === "fa" ? "fa-IR" : "de-DE");
    return {
      lang,
      setLang,
      t: (key) => dict[key][lang],
      num,
      photos: (n) => (lang === "fa" ? `${num(n)} عکس` : `${n} Fotos`),
      collections: (n) =>
        lang === "fa" ? `${num(n)} مجموعه` : `${n} ${n === 1 ? "Kollektion" : "Kollektionen"}`,
    };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/** Translates the few data values that are words rather than names. */
export function useVariantLabel() {
  const { t } = useLang();
  return (variant: string) => (variant === "Schlafzimmer" ? t("room.schlafzimmer") : variant);
}

// ── FA / DE switch ──────────────────────────────────────────────────────
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "fa", label: "فا" },
    { value: "de", label: "DE" },
  ];
  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      dir="ltr"
      className={`flex items-center rounded-full border border-white/15 bg-black/40 p-0.5 ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={`min-w-9 h-8 px-2.5 rounded-full text-xs font-semibold transition-colors ${
            lang === o.value ? "bg-gold text-on-gold" : "text-white/60 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
