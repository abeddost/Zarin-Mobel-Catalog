export type TableSeries = "FARELLA" | "SOLO" | "GUCCI" | "CARTIER" | "MESSINA" | "RIXOS" | "CHAIRS";

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

export type ProductType =
  | 'DINING_TABLE' | 'CHAIR' | 'COFFEE_TABLE' | 'TV_TABLE'
  | 'BED' | 'WARDROBE' | 'MAKEUP_TABLE';

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  DINING_TABLE: 'ESSTISCHE',
  CHAIR:        'STÜHLE',
  COFFEE_TABLE: 'COUCHTISCHE',
  TV_TABLE:     'TV-TISCHE',
  BED:          'BETTEN',
  WARDROBE:     'KLEIDERSCHRÄNKE',
  MAKEUP_TABLE: 'SCHMINKTISCHE',
};

export const PRODUCT_TYPE_ORDER: ProductType[] = [
  'DINING_TABLE', 'CHAIR', 'COFFEE_TABLE', 'TV_TABLE',
  'BED', 'WARDROBE', 'MAKEUP_TABLE',
];

// URL value for each category, e.g. /tables?kategorie=betten
export const PRODUCT_TYPE_SLUGS: Record<ProductType, string> = {
  DINING_TABLE: 'esstische',
  CHAIR:        'stuehle',
  COFFEE_TABLE: 'couchtische',
  TV_TABLE:     'tv-tische',
  BED:          'betten',
  WARDROBE:     'kleiderschraenke',
  MAKEUP_TABLE: 'schminktische',
};

export interface Room {
  id: 'esszimmer' | 'wohnzimmer' | 'schlafzimmer';
  label: string;
  types: ProductType[];
}

// Categories grouped by room for the tables page menu.
export const ROOMS: Room[] = [
  { id: 'esszimmer',    label: 'Esszimmer',    types: ['DINING_TABLE', 'CHAIR'] },
  { id: 'wohnzimmer',   label: 'Wohnzimmer',   types: ['COFFEE_TABLE', 'TV_TABLE'] },
  { id: 'schlafzimmer', label: 'Schlafzimmer', types: ['BED', 'WARDROBE', 'MAKEUP_TABLE'] },
];

export const DEFAULT_PRODUCT_TYPE: ProductType = 'DINING_TABLE';

export function productTypeFromSlug(slug: string | null): ProductType {
  const match = PRODUCT_TYPE_ORDER.find((t) => PRODUCT_TYPE_SLUGS[t] === slug);
  return match ?? DEFAULT_PRODUCT_TYPE;
}

// The product type is read from the image file name,
// e.g. "Gucci Makeup Table-3027.jpg" or "Solo TV Table-002904.jpg".
export function getProductType(imgSrc: string): ProductType {
  const name = decodeURIComponent(imgSrc.split('/').pop() ?? '').toLowerCase();
  if (name.includes('makeup'))   return 'MAKEUP_TABLE';
  if (name.includes('wardrobe')) return 'WARDROBE';
  if (/\bbed\b/.test(name))      return 'BED';
  if (name.includes('dining') || name.includes('tabke')) return 'DINING_TABLE';
  if (name.includes('chair') || imgSrc.includes('/chairs/')) return 'CHAIR';
  if (name.includes('coffee')) return 'COFFEE_TABLE';
  if (/\btv\b/.test(name))       return 'TV_TABLE';
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
      BED: [], WARDROBE: [], MAKEUP_TABLE: [],
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
      "Farella Dining Table-8867.jpg",
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
      "Solo Dining Table-002864.jpg",
      "Solo Dining Table-002864-2.jpg",
      "Solo Dining Table-002865.jpg",
      "Solo Dining Table-002865-2.jpg",
      "Solo Dining Table-002871.jpg",
      "Solo Dining Table-002872.jpg",
      "Solo Dining Table-002874.jpg",
      "Solo TV Table_002934-2 kopya.jpg",
      "Solo TV Table_002934-3 kopya.jpg",
      "Solo TV Table-002904.jpg",
      "Solo TV Table-002911.jpg",
      "Solo TV Table-002926.jpg",
      "Solo TV Table-002936.jpg",
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
      "Solo Dining Table-12044.jpg",
      "Solo Dining Table-12045.jpg",
      "Solo Dining Table-12055.jpg",
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
      "Gucci Dining Table-0448.jpg",
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
      "Gucci Silver Dining Table-33901.jpg",
      "Gucci Silver Dining Table-33924.jpg",
      "Gucci Silver Coffee Table-33928.jpg",
      "Gucci Silver TV Table-33933.jpg",
      "Gucci Silver TV Table-33927.jpg",
      "Gucci Silver TV Table-33929.jpg",
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
  {
    id: "solo-mink",
    name: "SOLO MINK",
    displayName: "Solo Mink",
    series: "SOLO",
    variant: "Mink",
    folder: "Solo/Solo Mink",
    images: img("Solo/Solo Mink", [
      "Solo Mink Dining Table-21729-2.jpg",
      "Solo Mink Dining Table-001615.jpg",
      "Solo Mink Dining Table-001622.jpg",
      "Solo Mink Dining Table-001626.jpg",
      "Solo Mink Dining Table-001649.jpg",
      "Solo Mink TV Table-001670.jpg",
      "Solo Mink TV Table-21729-3.jpg",
    ]),
    coverImage: img("Solo/Solo Mink", ["Solo Mink Dining Table-21729-2.jpg"])[0],
  },
  {
    id: "gucci-cappuccino",
    name: "GUCCI CAPPUCCINO",
    displayName: "Gucci Cappuccino",
    series: "GUCCI",
    variant: "Cappuccino",
    folder: "Gucci/Gucci Cappuccino",
    images: img("Gucci/Gucci Cappuccino", [
      "Gucci Cappuccino Dining Table-0413.jpg",
      "Gucci Cappuccino Dining Table-0414.jpg",
      "Gucci Cappuccino TV Table-0432.jpg",
      "Gucci Cappuccino TV Table-0434.jpg",
      "Gucci Cappuccino TV Table-0435.jpg",
      "Gucci Cappuccino TV Table-0439.jpg",
    ]),
    coverImage: img("Gucci/Gucci Cappuccino", ["Gucci Cappuccino Dining Table-0413.jpg"])[0],
  },
  {
    id: "gucci-cream-black",
    name: "GUCCI CREAM BLACK",
    displayName: "Gucci Cream Black",
    series: "GUCCI",
    variant: "Cream Black",
    folder: "Gucci/Gucci Cream Black",
    images: img("Gucci/Gucci Cream Black", [
      "Gucci Cream Black Dining Table-000446.jpg",
      "Gucci Cream Black Dining Table-000497.jpg",
      "Gucci Cream Black Dining Table-000499.jpg",
      "Gucci Cream Black TV Table-000506.jpg",
      "Gucci Cream Black TV Table-000507.jpg",
      "Gucci Cream Black TV Table-000510.jpg",
      "Gucci Cream Black Coffee Table-000457.jpg",
    ]),
    coverImage: img("Gucci/Gucci Cream Black", ["Gucci Cream Black Dining Table-000446.jpg"])[0],
  },
  {
    id: "gucci-premium",
    name: "GUCCI PREMIUM",
    displayName: "Gucci Premium",
    series: "GUCCI",
    variant: "Premium",
    folder: "Gucci/Gucci Premium",
    images: img("Gucci/Gucci Premium", [
      "Gucci Premium Dining Table-11904.jpg",
      "Gucci Premium Dining Table-11893.jpg",
      "Gucci Premium Dining Table-11895.jpg",
      "Gucci Premium Dining Table-11909.jpg",
    ]),
    coverImage: img("Gucci/Gucci Premium", ["Gucci Premium Dining Table-11904.jpg"])[0],
  },
  {
    id: "gucci-black-chrome",
    name: "GUCCI BLACK CHROME",
    displayName: "Gucci Black Chrome",
    series: "GUCCI",
    variant: "Black Chrome",
    folder: "Gucci/Gucci Black Chrome",
    images: img("Gucci/Gucci Black Chrome", [
      "Gucci Black Chrome Dining Table-1.jpg",
      "Gucci Black Chrome TV Table-8409.jpg",
      "Gucci Black Chrome Coffee Table-8413.jpg",
    ]),
    coverImage: img("Gucci/Gucci Black Chrome", ["Gucci Black Chrome Dining Table-1.jpg"])[0],
  },
  {
    id: "cartier-mink",
    name: "CARTIER MINK",
    displayName: "Cartier Mink",
    series: "CARTIER",
    variant: "Mink",
    folder: "Cartier/Cartier Mink",
    images: img("Cartier/Cartier Mink", [
      "Cartier Mink Dining Table-000063.jpg",
      "Cartier Mink Dining Table-000063-2.jpg",
      "Cartier Mink Dining Table-000077.jpg",
      "Cartier Mink Dining Table-000124.jpg",
      "Cartier Mink Dining Table-000125.jpg",
      "Cartier Mink Dining Table-000146.jpg",
      "Cartier Mink Dining Table-000148.jpg",
      "Cartier Mink TV Table-000131.jpg",
      "Cartier Mink TV Table-000131-2.jpg",
      "Cartier Mink TV Table-000133.jpg",
      "Cartier Mink TV Table-000134.jpg",
      "Cartier Mink TV Table-000144.jpg",
      "Cartier Mink Coffee Table-000104.jpg",
    ]),
    coverImage: img("Cartier/Cartier Mink", ["Cartier Mink Dining Table-000063.jpg"])[0],
  },
  {
    id: "messina",
    name: "MESSINA",
    displayName: "Messina",
    series: "MESSINA",
    variant: "",
    folder: "Messina",
    images: img("Messina", [
      "Messina Dining Table-24435.jpg",
      "Messina Dining Table-24435-r.jpg",
      "Messina Dining Table-24436.jpg",
      "Messina Dining Table-24445-r.jpg",
      "Messina Dining Table-24448.jpg",
      "Messina Dining Table-24449.jpg",
      "Messina Dining Table-24450.jpg",
      "Messina TV Table-23562-r.jpg",
      "Messina TV Table-23568-r.jpg",
      "Messina Coffee Table-23563.jpg",
    ]),
    coverImage: img("Messina", ["Messina Dining Table-24435.jpg"])[0],
  },
  {
    id: "rixos",
    name: "RIXOS",
    displayName: "Rixos",
    series: "RIXOS",
    variant: "",
    folder: "Rixos",
    images: img("Rixos", [
      "Rixos Dining Table-24468.jpg",
      "Rixos Dining Table-24463.jpg",
      "Rixos Dining Table-24468-r.jpg",
      "Rixos TV Table-23629-r.jpg",
      "Rixos TV Table-23630.jpg",
      "Rixos TV Table-23630-r.jpg",
      "Rixos Coffee Table-23605.jpg",
      "Rixos Coffee Table-23631.jpg",
    ]),
    coverImage: img("Rixos", ["Rixos Dining Table-24468.jpg"])[0],
  },
  {
    id: "gucci-bedroom",
    name: "GUCCI SCHLAFZIMMER",
    displayName: "Gucci",
    series: "GUCCI",
    variant: "Schlafzimmer",
    folder: "Gucci/Gucci Bedroom",
    images: img("Gucci/Gucci Bedroom", [
      "Gucci Bed-005582.jpg",
      "Gucci Bed-005597.jpg",
      "Gucci Wardrobe-005622.jpg",
      "Gucci Wardrobe-005610.jpg",
      "Gucci Wardrobe-005619.jpg",
      "Gucci Wardrobe-005620.jpg",
      "Gucci Wardrobe-005624.jpg",
      "Gucci Makeup Table-3027.jpg",
      "Gucci Makeup Table-3028.jpg",
      "Gucci Makeup Table-3029.jpg",
      "Gucci Makeup Table-3033.jpg",
      "Gucci Makeup Table-3034.jpg",
    ]),
    coverImage: img("Gucci/Gucci Bedroom", ["Gucci Bed-005582.jpg"])[0],
  },
  {
    id: "solo-bedroom",
    name: "SOLO SCHLAFZIMMER",
    displayName: "Solo",
    series: "SOLO",
    variant: "Schlafzimmer",
    folder: "Solo/Solo Bedroom",
    images: img("Solo/Solo Bedroom", [
      "Solo Bed-4952.jpg",
      "Solo Bed-4967.jpg",
      "Solo Wardrobe-4987.jpg",
      "Solo Wardrobe-4990.jpg",
      "Solo Wardrobe-4993.jpg",
      "Solo Wardrobe-4996.jpg",
      "Solo Makeup Table-5000-2.jpg",
      "Solo Makeup Table-5004.jpg",
      "Solo Makeup Table-5010.jpg",
    ]),
    coverImage: img("Solo/Solo Bedroom", ["Solo Bed-4952.jpg"])[0],
  },
];
