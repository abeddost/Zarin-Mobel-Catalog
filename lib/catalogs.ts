import { sofas } from "@/data/sofas";
import { getTablesByType, tables } from "@/data/tables";
import { zorofProducts } from "@/data/zorof";
import type { TextKey } from "@/lib/i18n";

/** The three catalogues of the site. Sofas is the home page. */
export type CatalogId = "sofas" | "tables" | "zorof";

export interface CatalogInfo {
  id: CatalogId;
  href: string;
  /** Full name, e.g. "میز و اتاق خواب". */
  labelKey: TextKey;
  /** Short name for the phone tab bar, e.g. "میز". */
  shortKey: TextKey;
  /** Word after the count, e.g. "مدل" / "محصول". */
  unitKey: TextKey;
  count: number;
  cover: string;
}

const zorofCover =
  zorofProducts.find((p) => p.id === "teeservice-gold-236")?.coverImage ?? zorofProducts[0].coverImage;
const tablesCover = tables.find((t) => t.id === "farella")?.coverImage ?? tables[0].coverImage;

export const CATALOGS: CatalogInfo[] = [
  {
    id: "sofas",
    href: "/",
    labelKey: "catalog.sofas",
    shortKey: "catalog.sofas.short",
    unitKey: "unit.models",
    count: sofas.length,
    cover: sofas[0].coverImage,
  },
  {
    id: "tables",
    href: "/tables",
    labelKey: "catalog.tables",
    shortKey: "catalog.tables.short",
    unitKey: "unit.models",
    count: getTablesByType().length,
    cover: tablesCover,
  },
  {
    id: "zorof",
    href: "/zorof",
    labelKey: "catalog.zorof",
    shortKey: "catalog.zorof.short",
    unitKey: "unit.products",
    count: zorofProducts.length,
    cover: zorofCover,
  },
];

export function catalogFromPath(pathname: string | null): CatalogId {
  if (pathname?.startsWith("/tables")) return "tables";
  if (pathname?.startsWith("/zorof")) return "zorof";
  return "sofas";
}
