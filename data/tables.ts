export type TableSeries = "FARELLA" | "SOLO" | "GUCCI" | "CHAIRS";

export interface Table {
  id: string;
  name: string;
  displayName: string;
  series: TableSeries;
  variant: string;
  folder: string;
  images: string[];
  coverImage: string;
}

function img(folder: string, files: string[]): string[] {
  const parts = folder.split("/");
  const encoded = parts.map((p) => encodeURIComponent(p)).join("/");
  return files.map((f) => {
    const webp = f.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    return `/tables-optimized/${encoded}/${encodeURIComponent(webp)}`;
  });
}

export type ProductType = 'DINING_TABLE' | 'CHAIR' | 'COFFEE_TABLE' | 'TV_TABLE';

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  DINING_TABLE: 'ESSTISCHE',
  CHAIR:        'STÜHLE',
  COFFEE_TABLE: 'COUCHTISCHE',
  TV_TABLE:     'TV-TISCHE',
};

export const PRODUCT_TYPE_ORDER: ProductType[] = [
  'DINING_TABLE', 'CHAIR', 'COFFEE_TABLE', 'TV_TABLE',
];

export function getProductType(imgSrc: string): ProductType {
  const name = decodeURIComponent(imgSrc.split('/').pop() ?? '').toLowerCase();
  if (name.includes('dining') || name.includes('tabke')) return 'DINING_TABLE';
  if (name.includes('chair') || imgSrc.includes('/chairs/')) return 'CHAIR';
  if (name.includes('coffee')) return 'COFFEE_TABLE';
  if (name.includes('tv'))     return 'TV_TABLE';
  return 'DINING_TABLE';
}

export interface TypedTable extends Table {
  productType: ProductType;
}

export function getTablesByType(): TypedTable[] {
  const result: TypedTable[] = [];
  for (const table of tables) {
    const buckets: Record<ProductType, string[]> = {
      DINING_TABLE: [], CHAIR: [], COFFEE_TABLE: [], TV_TABLE: [],
    };
    for (const src of table.images) {
      buckets[getProductType(src)].push(src);
    }
    for (const type of PRODUCT_TYPE_ORDER) {
      const imgs = buckets[type];
      if (imgs.length === 0) continue;
      result.push({
        ...table,
        id:          `${table.id}-${type}`,
        productType: type,
        images:      imgs,
        coverImage:  imgs[0],
      });
    }
  }
  return result;
}

export const tables: Table[] = [
  {
    id: "farella",
    name: "FARELLA",
    displayName: "Farella",
    series: "FARELLA",
    variant: "",
    folder: "Farella",
    images: img("Farella", [
      "Farella Dining Table-8863.jpg",
      "Farella Dining Table-8866.jpg",
      "Farella Dining Table-8876.jpg",
      "Farella Dining Table-8882.jpg",
      "Farella Dining Table-8883.jpg",
      "Farella Dining Table-8884.jpg",
      "Farella Tv Table-8859.jpg",
      "Farella Tv Table-8860.jpg",
      "Farella Coffee table.jpg",
    ]),
    coverImage: img("Farella", ["Farella Dining Table-8863.jpg"])[0],
  },
  {
    id: "bien",
    name: "BIEN",
    displayName: "Bien",
    series: "CHAIRS",
    variant: "",
    folder: "chairs",
    images: img("chairs", ["Bien.jpg"]),
    coverImage: img("chairs", ["Bien.jpg"])[0],
  },
  {
    id: "puma-chair",
    name: "PUMA",
    displayName: "Puma",
    series: "CHAIRS",
    variant: "",
    folder: "chairs",
    images: img("chairs", ["Puma.jpg"]),
    coverImage: img("chairs", ["Puma.jpg"])[0],
  },
  {
    id: "ravien",
    name: "RAVIEN",
    displayName: "Ravien",
    series: "CHAIRS",
    variant: "",
    folder: "chairs",
    images: img("chairs", ["Ravien.jpeg"]),
    coverImage: img("chairs", ["Ravien.jpeg"])[0],
  },
  {
    id: "roma",
    name: "ROMA",
    displayName: "Roma",
    series: "CHAIRS",
    variant: "",
    folder: "chairs",
    images: img("chairs", ["Roma.jpg"]),
    coverImage: img("chairs", ["Roma.jpg"])[0],
  },
  {
    id: "solo-cream",
    name: "SOLO CREAM",
    displayName: "Solo Cream",
    series: "SOLO",
    variant: "Cream",
    folder: "Solo/Solo Cream",
    images: img("Solo/Solo Cream", [
      "Solo Dining Table_002891 kopya.jpg",
      "Solo Dining Table_002891-2 kopya.jpg",
      "Solo Dining Table_002893 kopya.jpg",
      "Solo Dining Table_002893-2 kopya.jpg",
      "Solo TV Table_002934-2 kopya.jpg",
      "Solo TV Table_002934-3 kopya.jpg",
      "Solo Coffee Table_002907 kopya.jpg",
      "Solo Coffee Table_002915 kopya.jpg",
    ]),
    coverImage: img("Solo/Solo Cream", ["Solo Dining Table_002891 kopya.jpg"])[0],
  },
  {
    id: "solo-silver",
    name: "SOLO SILVER",
    displayName: "Solo Silver",
    series: "SOLO",
    variant: "Silver",
    folder: "Solo/Solo Silver",
    images: img("Solo/Solo Silver", [
      "Solo Dining Table-12053.jpg",
      "Solo Dining Table-12062.jpg",
      "Solo Dining Tabke-12064.jpg",
      "Solo Coffee Table-12073.jpg",
      "Solo Coffee Table-12075.jpg",
      "Solo TV table.jpg",
    ]),
    coverImage: img("Solo/Solo Silver", ["Solo Dining Table-12053.jpg"])[0],
  },
  {
    id: "gucci-black-gold",
    name: "GUCCI BLACK GOLD",
    displayName: "Gucci Black Gold",
    series: "GUCCI",
    variant: "Black Gold",
    folder: "Gucci/Gucci Black Gold",
    images: img("Gucci/Gucci Black Gold", [
      "Gucci dining table14-0453 copy.jpg",
      "Gucci dining table14-0456 copy.jpg",
      "Gucci dining table14-0468 copy.jpg",
      "Gucci Tv table.jpg",
      "Gucci TV table 2.jpg",
      "Gucci coffee table14-0476 copy.jpg",
      "Gucci coffee table14-0480 copy.jpg",
    ]),
    coverImage: img("Gucci/Gucci Black Gold", ["Gucci dining table14-0453 copy.jpg"])[0],
  },
  {
    id: "gucci-silver",
    name: "GUCCI SILVER",
    displayName: "Gucci Silver",
    series: "GUCCI",
    variant: "Silver",
    folder: "Gucci/Gucci Silver",
    images: img("Gucci/Gucci Silver", [
      "NEK-33892 copy - Kopya.jpg",
      "NEK-33903 copy.jpg",
      "NEK-33922 copy.jpg",
      "NEK-33928 copy.jpg",
      "NEK-33933 copy.jpg",
    ]),
    coverImage: img("Gucci/Gucci Silver", ["NEK-33892 copy - Kopya.jpg"])[0],
  },
  {
    id: "gucci-cream-gold",
    name: "GUCCI CREAM GOLD",
    displayName: "Gucci Cream Gold",
    series: "GUCCI",
    variant: "Cream Gold",
    folder: "Gucci/Gucci cream gold",
    images: img("Gucci/Gucci cream gold", [
      "Gucci dining table-11215 kopya.jpg",
      "Gucci dining table-11218 kopya.jpg",
      "gucci Tv.jpg",
      "gucci coffee table.jpg",
    ]),
    coverImage: img("Gucci/Gucci cream gold", ["Gucci dining table-11215 kopya.jpg"])[0],
  },
];
