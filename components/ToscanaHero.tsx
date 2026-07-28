"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useMemo } from "react";

import { sofas } from "@/data/sofas";

type ToscanaHeroProps = {
  onExploreCatalogue: () => void;
};

type HeroItem = {
  id: string;
  label: string;
  image: string;
};

const HERO_MODEL_IDS = [
  "toscana",
  "pablo",
  "verona-koltuk",
  "avanos-gri",
  "tetra",
  "puma-koltuk",
  "angel",
  "bonita",
];

export function ToscanaHero({ onExploreCatalogue }: ToscanaHeroProps) {
  const reducedMotion = useReducedMotion();

  const heroItems = useMemo<HeroItem[]>(() => {
    const sofaById = new Map(sofas.map((sofa) => [sofa.id, sofa]));
    const picked = HERO_MODEL_IDS
      .map((id) => sofaById.get(id))
      .filter((sofa): sofa is (typeof sofas)[number] => Boolean(sofa))
      .map((sofa) => ({
        id: sofa.id,
        label: sofa.displayName,
        image: sofa.coverImage,
      }));

    if (picked.length >= 6) {
      return picked;
    }

    return sofas.slice(0, 8).map((sofa) => ({
      id: sofa.id,
      label: sofa.displayName,
      image: sofa.coverImage,
    }));
  }, []);

  return (
    <section className="relative h-svh overflow-hidden border-b border-white/8 bg-dark-0 text-stone-100">
      {/* Ambient colour washes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,154,97,0.10),transparent_40%),radial-gradient(circle_at_78%_25%,rgba(117,77,40,0.12),transparent_44%)]" />

      {/* Vignette — kept light so sofa images stay visible */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,4,0.35)_0%,rgba(8,6,4,0.55)_100%)]" />

      {/* Left-side reading zone (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,rgba(8,6,4,0.92)_0%,rgba(8,6,4,0.72)_32%,transparent_52%)]" />

      {/* Sofa ring — shifted right on desktop, lowered on mobile */}
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute left-1/2 top-[63%] h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(-8deg)] [transform-style:preserve-3d] [--ring-radius:9rem] sm:top-[58%] sm:h-[18rem] sm:w-[18rem] sm:[--ring-radius:13rem] lg:left-[67%] lg:top-1/2 lg:h-[28rem] lg:w-[28rem] lg:[--ring-radius:21rem]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={reducedMotion ? undefined : { rotateY: 360 }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 42, ease: "linear", repeat: Number.POSITIVE_INFINITY }
            }
          >
            {heroItems.map((item, index) => {
              const angle = (360 / heroItems.length) * index;
              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--ring-radius))` }}
                >
                  <article className="h-[7.5rem] w-[5.5rem] overflow-hidden rounded-xl border border-white/25 shadow-[0_16px_36px_rgba(0,0,0,0.55)] sm:h-[11rem] sm:w-[8rem] lg:h-[16rem] lg:w-[11.5rem]">
                    <img
                      src={item.image}
                      alt={item.label}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </article>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-6 pb-12 pt-28 sm:pb-14 sm:pt-32 lg:px-10 lg:pb-18 lg:pt-40">
        <div className="mx-auto max-w-sm text-center lg:mx-0 lg:max-w-[480px] lg:text-left">
          <p className="mb-5 font-sans text-[0.62rem] uppercase tracking-[0.5em] text-gold">
            Online Katalog
          </p>
          <h1 className="font-serif text-[2.75rem] leading-[0.88] tracking-[0.03em] text-stone-100 sm:text-[3.6rem] lg:text-[5.6rem]">
            Zarin<br />Möbelhaus
          </h1>
          <p className="mt-5 font-sans text-[0.82rem] leading-relaxed tracking-[0.06em] text-stone-300/65 sm:text-[0.88rem] lg:mt-6 lg:text-[0.9rem]">
            Exklusive Sofas und Polstermöbel — entdecken Sie unsere gesamte Kollektion online.
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4 sm:flex-row lg:items-end lg:justify-between">
          <button
            onClick={onExploreCatalogue}
            className="inline-flex cursor-pointer items-center justify-center border border-gold/75 bg-gold px-9 py-3.5 font-sans text-[0.8rem] uppercase tracking-[0.26em] text-on-gold shadow-[0_14px_34px_rgba(0,0,0,0.46)] transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light/90 sm:px-10 sm:text-[0.84rem]"
          >
            Kollektionen
            <ArrowDownRight className="ml-3 size-[1.1rem]" />
          </button>

          <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-stone-400/50 lg:pb-1">
            {heroItems.length} Modelle verfügbar
          </p>
        </div>
      </div>
    </section>
  );
}
