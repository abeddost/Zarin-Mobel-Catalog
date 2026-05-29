"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { tables } from "@/data/tables";

type TablesHeroProps = {
  onExploreCatalogue: () => void;
};

type HeroItem = {
  id: string;
  label: string;
  image: string;
};

export function TablesHero({ onExploreCatalogue }: TablesHeroProps) {
  const reducedMotion = useReducedMotion();

  const heroItems: HeroItem[] = tables.map((t) => ({
    id: t.id,
    label: t.displayName,
    image: t.coverImage,
  }));

  return (
    <section className="relative h-svh overflow-hidden border-b border-white/8 bg-[#080604] text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(197,154,97,0.14),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(117,77,40,0.15),transparent_42%),linear-gradient(180deg,rgba(8,6,4,0.4)_0%,rgba(8,6,4,0.88)_100%)]" />

      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute left-1/2 top-[54%] h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 [transform:rotateX(-8deg)] [transform-style:preserve-3d] [--ring-radius:9.75rem] sm:h-[17rem] sm:w-[17rem] sm:[--ring-radius:12.5rem] lg:top-1/2 lg:h-[26rem] lg:w-[26rem] lg:[--ring-radius:20rem]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={reducedMotion ? undefined : { rotateY: 360 }}
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 42,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  }
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
                  <article className="h-[8.75rem] w-[6.25rem] overflow-hidden rounded-xl border border-white/15 bg-[#120d09]/75 shadow-[0_18px_40px_rgba(0,0,0,0.5)] backdrop-blur-[1px] sm:h-[10.5rem] sm:w-[7.5rem] lg:h-[15rem] lg:w-[10.75rem]">
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-6 pb-10 pt-28 sm:pb-12 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="mx-auto text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <p className="mb-3 text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase">
            Zarin Möbelhaus
          </p>
          <h1 className="font-[Cormorant_Garamond] text-[2.4rem] leading-[0.9] tracking-[0.06em] text-stone-100 sm:text-[3.2rem] lg:text-[5.1rem]">
            Tische & Stühle
          </h1>
          <p className="mt-2 font-[Cormorant_Garamond] text-[1.15rem] tracking-[0.18em] text-stone-200/90 sm:text-[1.35rem] lg:text-[1.85rem]">
            Kollektion
          </p>
          <p className="mt-4 text-white/40 text-[11px] tracking-[0.3em] uppercase">
            Esstische · TV-Tische · Couchtische · Stühle
          </p>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <button
            onClick={onExploreCatalogue}
            className="inline-flex cursor-pointer items-center justify-center border border-[#c9a96e]/75 bg-[#c9a96e] px-8 py-3.5 font-sans text-[0.8rem] uppercase tracking-[0.24em] text-[#1b140d] shadow-[0_14px_34px_rgba(0,0,0,0.46)] transition-colors hover:bg-[#ddbe87] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1c28d]/90 sm:px-10 sm:py-3.5 sm:text-[0.84rem]"
          >
            Kollektion entdecken
            <ArrowDownRight className="ml-3 size-5" />
          </button>
          <a
            href="/"
            className="text-white/40 hover:text-[#c9a96e] text-[11px] tracking-[0.3em] uppercase transition-colors duration-300"
          >
            ← Polstermöbel
          </a>
        </div>
      </div>
    </section>
  );
}
