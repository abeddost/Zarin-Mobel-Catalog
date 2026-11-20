import { HandPlatter, Sofa } from "lucide-react";
import type { CatalogId } from "@/lib/catalogs";

/** Simple dining-table outline in the lucide style (lucide has no furniture table icon). */
function TableIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9h18" />
      <path d="M5 9 4 20" />
      <path d="M19 9l1 11" />
      <path d="M8 9v5h8V9" />
    </svg>
  );
}

export default function CatalogIcon({
  id,
  size = 20,
  strokeWidth = 1.75,
  className,
}: {
  id: CatalogId;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  if (id === "tables") return <TableIcon size={size} strokeWidth={strokeWidth} className={className} />;
  const Icon = id === "zorof" ? HandPlatter : Sofa;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
