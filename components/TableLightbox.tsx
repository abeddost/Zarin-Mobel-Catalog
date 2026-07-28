"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Table } from "@/data/tables";

interface TableLightboxProps {
  table: Table | null;
  onClose: () => void;
}

export default function TableLightbox({ table, onClose }: TableLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const images = table?.images ?? [];

  const goNext = useCallback(() => {
    if (!table) return;
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [table, images.length]);

  const goPrev = useCallback(() => {
    if (!table) return;
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [table, images.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!table) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [table, goNext, goPrev, onClose]);

  // Reset index and swipe hint when a new table opens
  useEffect(() => {
    if (table) {
      setCurrentIndex(0);
      setShowSwipeHint(true);
      const t = setTimeout(() => setShowSwipeHint(false), 2000);
      return () => clearTimeout(t);
    }
  }, [table?.id]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {table && (
        <motion.div
          key={table.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

          {/* Floating close button */}
          <button
            onClick={onClose}
            className="absolute z-20 flex items-center justify-center w-11 h-11 bg-black/60 border border-white/15 text-white/60 hover:text-gold hover:border-gold/40 transition-all duration-300 backdrop-blur-sm"
            style={{ top: "max(1rem, env(safe-area-inset-top))", right: "1rem" }}
            aria-label="Schließen"
          >
            <X size={18} />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row gap-0 bg-dark-2 border border-white/8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main image area */}
            <div className="relative flex-1 aspect-[4/3] overflow-hidden bg-dark-0">
              {/* Swipe gesture layer */}
              <motion.div
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                drag={images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -45) goNext();
                  else if (info.offset.x > 45) goPrev();
                }}
              />

              {/* Preload neighboring images so swiping feels instant */}
              {images.length > 1 && (
                <div className="absolute w-px h-px opacity-0 pointer-events-none overflow-hidden">
                  <Image
                    src={images[(currentIndex - 1 + images.length) % images.length]}
                    alt=""
                    width={1}
                    height={1}
                    quality={68}
                  />
                  <Image
                    src={images[(currentIndex + 1) % images.length]}
                    alt=""
                    width={1}
                    height={1}
                    quality={68}
                  />
                </div>
              )}

              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={`${table.id}-${currentIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${table.displayName} - ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    quality={68}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    onClick={goPrev}
                    aria-label="Vorheriges Bild"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/20 flex items-center justify-center text-white/80 hover:text-gold hover:border-gold/50 hover:bg-gold/10 hover:shadow-[0_0_18px_rgba(201,169,110,0.2)] transition-all duration-300 backdrop-blur-sm bg-black/60"
                  >
                    <ChevronLeft size={22} />
                  </motion.button>
                  <motion.button
                    onClick={goNext}
                    aria-label="Nächstes Bild"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/20 flex items-center justify-center text-white/80 hover:text-gold hover:border-gold/50 hover:bg-gold/10 hover:shadow-[0_0_18px_rgba(201,169,110,0.2)] transition-all duration-300 backdrop-blur-sm bg-black/60"
                  >
                    <ChevronRight size={22} />
                  </motion.button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-1.5">
                <span className="text-white/50 text-xs tracking-[0.25em]">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>

              {/* Swipe hint — mobile only, fades after 2s */}
              {images.length > 1 && (
                <AnimatePresence>
                  {showSwipeHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 z-20 md:hidden bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 pointer-events-none"
                    >
                      <span className="text-white/50 text-[10px] tracking-[0.3em]">← wischen →</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Sidebar info + thumbnails */}
            <div className="w-full lg:w-72 flex flex-col border-t lg:border-t-0 lg:border-l border-white/8">
              {/* Header */}
              <div className="p-6 border-b border-white/8">
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">
                  {table.variant ? `${table.series} · ${table.variant}` : table.series}
                </p>
                <h2 className="text-white font-light tracking-[0.2em] text-lg uppercase">
                  {table.displayName}
                </h2>
                <p className="text-white/30 text-xs tracking-wide mt-1">
                  {images.length} Fotos
                </p>
              </div>

              {/* Thumbnails — horizontal filmstrip on mobile, grid on desktop */}
              <div className="flex-1 flex flex-nowrap lg:grid lg:grid-cols-3 gap-2 p-3 overflow-x-auto lg:overflow-x-visible overflow-y-hidden lg:overflow-y-auto scrollbar-hide scroll-touch">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                    }}
                    className={`relative w-20 h-20 shrink-0 lg:w-auto lg:h-auto lg:shrink lg:aspect-square overflow-hidden transition-all duration-200 ${
                      i === currentIndex
                        ? "ring-2 ring-gold ring-offset-1 ring-offset-dark-2"
                        : "opacity-90"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`thumb-${i}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      quality={52}
                    />
                  </button>
                ))}
              </div>

              {/* Close button — desktop only; mobile relies on the floating ✕ */}
              <div className="hidden lg:block p-4 border-t border-white/8">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-white/5 border border-white/15 text-white/50 hover:text-gold hover:bg-gold/10 hover:border-gold/40 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                >
                  Schließen
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
