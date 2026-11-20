"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZorofProduct } from "@/data/zorof";
import { useLang } from "@/lib/i18n";

interface ZorofCardProps {
  product: ZorofProduct;
  index: number;
  onClick: () => void;
}

export default function ZorofCard({ product, index, onClick }: ZorofCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { lang, photos } = useLang();
  const name = product.name[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered
            ? "0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,169,110,0.35)"
            : "0 8px 32px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s ease",
        }}
        className="relative overflow-hidden bg-dark-3 group"
      >
        {/* Square studio photo on a light background */}
        <div className="relative aspect-square overflow-hidden bg-[#f4f1ec]">
          <Image
            src={product.coverImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 50vw, 25vw"
            quality={68}
          />

          {product.images.length > 1 && (
            <div className="absolute top-2 end-2 sm:top-3 sm:end-3 bg-black/55 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1">
              <span className="text-white/80 text-[9px] sm:text-[10px] tracking-widest uppercase">
                {photos(product.images.length)}
              </span>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="text-white font-light tracking-[0.06em] text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.5em] group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
        </div>

        {/* Bottom gold line on hover */}
        <motion.div
          className="absolute bottom-0 start-0 h-[2px] bg-gold"
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
