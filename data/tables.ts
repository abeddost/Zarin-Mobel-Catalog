export type TableSeries = "FARELLA" | "SOLO" | "GUCCI";

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
      "Farella Chair-8886.jpg",
      "Farella Chair-8887.jpg",
      "Farella Chair-8888.jpg",
      "Farella Chair-8889.jpg",
      "Farella Tv Table-8859.jpg",
      "Farella Tv Table-8860.jpg",
      "Farella Coffee table.jpg",
    ]),
    coverImage: img("Farella", ["Farella Dining Table-8863.jpg"])[0],
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
      "Solo Chair_002894 kopya.jpg",
      "Solo Chair_002895 kopya.jpg",
      "Solo Chair_002896 kopya.jpg",
      "Solo Chair_002897 kopya.jpg",
      "Solo Chair_002898 kopya.jpg",
      "Solo Chair_002899 kopya.jpg",
      "Solo Chair_002900 kopya.jpg",
      "Solo Chair_002901 kopya.jpg",
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
      "Solo Chair-12065.jpg",
      "Solo Chair-12066.jpg",
      "Solo Chair-12067.jpg",
      "Solo Chair-12068.jpg",
      "Solo Chair-12069.jpg",
      "Solo Chair-12070.jpg",
      "Solo Chair-12072.jpg",
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
      "Gucci Chair.jpg",
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
