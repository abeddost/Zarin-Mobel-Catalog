"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Table } from "@/data/tables";

interface TableCardProps {
  table: Table;
  index: number;
  onClick: () => void;
}

export default function TableCard({ table, index, onClick }: TableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springCfg = { stiffness: 180, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springCfg);
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        duration: 0.55,
        delay: (index % 12) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      layout
      style={{ perspective: 1000 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.25)"
            : "0 8px 32px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s ease",
        }}
        className="relative overflow-hidden bg-[#111008] group"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={table.coverImage}
            alt={table.displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={62}
          />

          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />

          {/* Top overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

          {/* Photo count badge */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1">
            <span className="text-white/60 text-[10px] tracking-widest">
              {table.images.length} FOTOS
            </span>
          </div>

          {/* Series badge */}
          <div className="absolute top-3 left-3 bg-[#c9a96e]/20 backdrop-blur-sm border border-[#c9a96e]/30 px-2 py-1">
            <span className="text-[#c9a96e] text-[10px] tracking-widest font-medium">
              {table.series}
            </span>
          </div>
        </div>

        {/* Card footer */}
        <div className="p-4 flex items-end justify-between">
          <div>
            {table.variant && (
              <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-1">
                {table.variant}
              </p>
            )}
            <h3 className="text-white font-light tracking-[0.15em] text-sm uppercase group-hover:text-[#c9a96e] transition-colors duration-300">
              {table.displayName}
            </h3>
          </div>
          <motion.div
            className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-[#c9a96e]/60 transition-colors duration-300"
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white/40 group-hover:text-[#c9a96e] text-sm transition-colors duration-300">
              +
            </span>
          </motion.div>
        </div>

        {/* Bottom gold line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#c9a96e]"
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
