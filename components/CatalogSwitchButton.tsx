"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CatalogSwitchButtonProps {
  href: string;
  label: string;
  direction: "left" | "right";
}

export default function CatalogSwitchButton({ href, label, direction }: CatalogSwitchButtonProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      animate={{
        boxShadow: [
          "0 8px 32px rgba(37,99,235,0.45)",
          "0 10px 52px rgba(37,99,235,0.85)",
          "0 8px 32px rgba(37,99,235,0.45)",
        ],
      }}
      transition={{
        default: { type: "spring", stiffness: 400, damping: 20 },
        boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
      }}
      className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-9 py-5 rounded-full text-base font-semibold tracking-[0.15em] uppercase transition-colors"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      {direction === "left" && <Icon size={20} />}
      {label}
      {direction === "right" && <Icon size={20} />}
    </motion.a>
  );
}
