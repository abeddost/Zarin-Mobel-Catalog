export type SofaType = "sofa" | "corner" | "armchair";
export type SofaSeries = "ALMİRA" | "AVANOS" | "LUCAS" | "SOLO";

export interface Sofa {
  id: string;
  name: string;
  displayName: string;
  series: SofaSeries;
  type: SofaType;
  folder: string;
  images: string[];
  coverImage: string;
}

function toOptimizedFile(file: string): string {
  return file.replace(/\.[^.]+$/u, ".webp");
}

function img(folder: string, files: string[]): string[] {
  return files.map(
    (f) => `/sofas-optimized/${encodeURIComponent(folder)}/${encodeURIComponent(toOptimizedFile(f))}`
  );
}

export const sofas: Sofa[] = [
  {
    id: "almira-antrasit",
    name: "ALMİRA ANTRASİT",
    displayName: "Almira Antrasit",
    series: "ALMİRA",
    type: "sofa",
    folder: "ALMİRA ANTRASİT",
    images: img("ALMİRA ANTRASİT", [
      "472A2543.jpg","472A2545.jpg","472A2546.jpg","472A2547.jpg","472A2548.jpg",
      "472A2549.jpg","472A2551.jpg","472A2552.jpg","472A2553.jpg","472A2554.jpg",
      "472A2555.jpg","472A2556.jpg","472A2557.jpg","472A2558.jpg","472A2559.jpg",
      "472A2560.jpg","472A2561.jpg","472A2562.jpg","472A2563.jpg","472A2564.jpg",
    ]),
    coverImage: img("ALMİRA ANTRASİT", ["472A2543.jpg"])[0],
  },
  {
    id: "almira-cream",
    name: "ALMİRA CREAM",
    displayName: "Almira Cream",
    series: "ALMİRA",
    type: "sofa",
    folder: "ALMİRA CREAM",
    images: img("ALMİRA CREAM", [
      "CASALLİNİ_123989.jpg","CASALLİNİ_123991.jpg","CASALLİNİ_123992.jpg",
      "CASALLİNİ_123993.jpg","CASALLİNİ_123995.jpg","CASALLİNİ_123996.jpg",
      "CASALLİNİ_123997.jpg","CASALLİNİ_123998.jpg","CASALLİNİ_123999--.jpg",
      "CASALLİNİ_124001.jpg","CASALLİNİ_124002.jpg","CASALLİNİ_124003.jpg",
      "CASALLİNİ_124004.jpg","CASALLİNİ_124005.jpg","CASALLİNİ_124006.jpg",
    ]),
    coverImage: img("ALMİRA CREAM", ["CASALLİNİ_123989.jpg"])[0],
  },
  {
    id: "almira-kahve",
    name: "ALMİRA KAHVE",
    displayName: "Almira Kahve",
    series: "ALMİRA",
    type: "sofa",
    folder: "ALMİRA KAHVE",
    images: img("ALMİRA KAHVE", [
      "CASALLİNİ_93269.jpg","CASALLİNİ_93270.jpg","CASALLİNİ_93271.jpg",
      "CASALLİNİ_93277.jpg","CASALLİNİ_93281.jpg","CASALLİNİ_93284.jpg",
      "CASALLİNİ_93287.jpg","CASALLİNİ_93289.jpg","CASALLİNİ_93291.jpg",
      "CASALLİNİ_93294.jpg","CASALLİNİ_93296.jpg","CASALLİNİ_93298.jpg",
      "CASALLİNİ_93300.jpg","CASALLİNİ_93301.jpg","CASALLİNİ_93302.jpg",
      "CASALLİNİ_93303.jpg",
    ]),
    coverImage: img("ALMİRA KAHVE", ["CASALLİNİ_93269.jpg"])[0],
  },
  {
    id: "almira-kose",
    name: "ALMİRA KÖŞE",
    displayName: "Almira Köşe",
    series: "ALMİRA",
    type: "corner",
    folder: "ALMİRA KÖŞE",
    images: img("ALMİRA KÖŞE", [
      "casallini_143308.jpg","casallini_143309.jpg","casallini_143310.jpg",
      "casallini_143311.jpg","casallini_143312.jpg","casallini_143313.jpg",
      "casallini_143315.jpg","casallini_143316.jpg","casallini_143317.jpg",
      "casallini_143319.jpg","casallini_143320.jpg","casallini_143321.jpg",
    ]),
    coverImage: img("ALMİRA KÖŞE", ["casallini_143308.jpg"])[0],
  },
  {
    id: "angel",
    name: "ANGEL",
    displayName: "Angel",
    series: "SOLO",
    type: "sofa",
    folder: "ANGEL",
    images: img("ANGEL", [
      "Angel_01.jpg","Angel_02.jpg","CASALLİNİ_137364.jpg","CASALLİNİ_137367.jpg",
      "CASALLİNİ_137369.jpg","CASALLİNİ_137370.jpg","CASALLİNİ_137371.jpg",
      "CASALLİNİ_137372.jpg","CASALLİNİ_137373.jpg","CASALLİNİ_137374.jpg",
      "CASALLİNİ_137375.jpg","CASALLİNİ_137376.jpg","CASALLİNİ_137377.jpg",
      "CASALLİNİ_137378.jpg","CASALLİNİ_137380.jpg","CASALLİNİ_137381.jpg",
    ]),
    coverImage: img("ANGEL", ["Angel_01.jpg"])[0],
  },
  {
    id: "avanos-gri",
    name: "AVANOS GRİ",
    displayName: "Avanos Gri",
    series: "AVANOS",
    type: "sofa",
    folder: "AVANOS GRİ",
    images: img("AVANOS GRİ", [
      "CASALLİNİ_143804.jpg","CASALLİNİ_143806 kopyası.jpg","CASALLİNİ_143806.jpg",
      "CASALLİNİ_143809.jpg","CASALLİNİ_143810.jpg","CASALLİNİ_143811.jpg",
      "CASALLİNİ_143812.jpg","CASALLİNİ_143813.jpg","CASALLİNİ_143815.jpg",
      "CASALLİNİ_143816.jpg","CASALLİNİ_143817 kopyası.jpg","CASALLİNİ_143817.jpg",
      "CASALLİNİ_143818.jpg","CASALLİNİ_143819.jpg","CASALLİNİ_143821.jpg",
      "CASALLİNİ_143822.jpg",
    ]),
    coverImage: img("AVANOS GRİ", ["CASALLİNİ_143804.jpg"])[0],
  },
  {
    id: "avanos-krem",
    name: "AVANOS KREM",
    displayName: "Avanos Krem",
    series: "AVANOS",
    type: "sofa",
    folder: "AVANOS KREM",
    images: img("AVANOS KREM", [
      "CASALLİNİ_144615.jpg","CASALLİNİ_144617.jpg","CASALLİNİ_144619.jpg",
      "CASALLİNİ_144620.jpg","CASALLİNİ_144621.jpg","CASALLİNİ_144623.jpg",
      "CASALLİNİ_144625.jpg","CASALLİNİ_144626.jpg","CASALLİNİ_144627.jpg",
      "CASALLİNİ_144633.jpg","CASALLİNİ_144635.jpg","CASALLİNİ_144636.jpg",
      "CASALLİNİ_144638.jpg","CASALLİNİ_144639.jpg","CASALLİNİ_144640.jpg",
    ]),
    coverImage: img("AVANOS KREM", ["CASALLİNİ_144615.jpg"])[0],
  },
  {
    id: "avanos-sis",
    name: "AVANOS SİS",
    displayName: "Avanos Sis",
    series: "AVANOS",
    type: "sofa",
    folder: "AVANOS SİS",
    images: img("AVANOS SİS", [
      "CASALLİNİ_144819.jpg","CASALLİNİ_144834.jpg","CASALLİNİ_144836.jpg",
      "CASALLİNİ_144837.jpg","CASALLİNİ_144838.jpg","CASALLİNİ_144839.jpg",
      "CASALLİNİ_144840.jpg","CASALLİNİ_144841.jpg","CASALLİNİ_144842.jpg",
      "CASALLİNİ_144843.jpg","CASALLİNİ_144845.jpg","CASALLİNİ_144846.jpg",
      "CASALLİNİ_144856.jpg","CASALLİNİ_144871.jpg","CASALLİNİ_144888.jpg",
    ]),
    coverImage: img("AVANOS SİS", ["CASALLİNİ_144819.jpg"])[0],
  },
  {
    id: "avanos-siyah",
    name: "AVANOS SİYAH",
    displayName: "Avanos Siyah",
    series: "AVANOS",
    type: "sofa",
    folder: "AVANOS SİYAH",
    images: img("AVANOS SİYAH", [
      "CASALLİNİ_144890.jpg","CASALLİNİ_144893.jpg","CASALLİNİ_144894.jpg",
      "CASALLİNİ_144895.jpg","CASALLİNİ_144896.jpg","CASALLİNİ_144897.jpg",
      "CASALLİNİ_144898.jpg","CASALLİNİ_144899.jpg","CASALLİNİ_144900.jpg",
      "CASALLİNİ_144901.jpg","CASALLİNİ_144903.jpg","CASALLİNİ_144904.jpg",
      "CASALLİNİ_144905.jpg","CASALLİNİ_144907.jpg","CASALLİNİ_144908.jpg",
    ]),
    coverImage: img("AVANOS SİYAH", ["CASALLİNİ_144890.jpg"])[0],
  },
  {
    id: "bella",
    name: "BELLA",
    displayName: "Bella",
    series: "SOLO",
    type: "sofa",
    folder: "BELLA",
    images: img("BELLA", [
      "CASALLİNİ_149496.jpg","CASALLİNİ_149497.jpg","CASALLİNİ_149498.jpg",
      "CASALLİNİ_149501.jpg","CASALLİNİ_149502.jpg","CASALLİNİ_149504.jpg",
      "CASALLİNİ_149505.jpg","CASALLİNİ_149506.jpg","CASALLİNİ_149507.jpg",
      "CASALLİNİ_149508.jpg","CASALLİNİ_149509.jpg","CASALLİNİ_149510.jpg",
      "CASALLİNİ_149512.jpg","CASALLİNİ_149513.jpg","CASALLİNİ_149514.jpg",
    ]),
    coverImage: img("BELLA", ["CASALLİNİ_149496.jpg"])[0],
  },
  {
    id: "belinda-koltuk",
    name: "BELİNDA KOLTUK",
    displayName: "Belinda Koltuk",
    series: "SOLO",
    type: "armchair",
    folder: "BELİNDA KOLTUK",
    images: img("BELİNDA KOLTUK", [
      "CASALLİNİ-_143852.jpg","CASALLİNİ-_143855.jpg","CASALLİNİ-_143856.jpg",
      "CASALLİNİ-_143857.jpg","CASALLİNİ-_143858.jpg","CASALLİNİ-_143859.jpg",
      "CASALLİNİ-_143860.jpg","CASALLİNİ-_143861.jpg","CASALLİNİ-_143862.jpg",
      "CASALLİNİ-_143863.jpg","CASALLİNİ-_143864.jpg","CASALLİNİ-_143865.jpg",
      "CASALLİNİ-_143866.jpg","CASALLİNİ-_143867.jpg",
    ]),
    coverImage: img("BELİNDA KOLTUK", ["CASALLİNİ-_143852.jpg"])[0],
  },
  {
    id: "dream",
    name: "DREAM",
    displayName: "Dream",
    series: "SOLO",
    type: "sofa",
    folder: "DREAM",
    images: img("DREAM", [
      "CASALLİNİ_123972.jpg","CASALLİNİ_123975.jpg","CASALLİNİ_123976.jpg",
      "CASALLİNİ_123977.jpg","CASALLİNİ_123978.jpg","CASALLİNİ_123979.jpg",
      "CASALLİNİ_123980.jpg","CASALLİNİ_123983.jpg","CASALLİNİ_123984.jpg",
      "CASALLİNİ_123986.jpg","CASALLİNİ_123987.jpg","CASALLİNİ_123988.jpg",
    ]),
    coverImage: img("DREAM", ["CASALLİNİ_123972.jpg"])[0],
  },
  {
    id: "lucas-11",
    name: "LUCAS 11",
    displayName: "Lucas 11",
    series: "LUCAS",
    type: "sofa",
    folder: "LUCAS 11",
    images: img("LUCAS 11", [
      "IMG_7665.jpg","IMG_7668.jpg","IMG_7670.jpg","IMG_7671.jpg","IMG_7674.jpg",
      "IMG_7675.jpg","IMG_7677.jpg","IMG_7678.jpg","IMG_7680.jpg","IMG_7682.jpg",
      "IMG_7683-kopya.jpg","IMG_7683.jpg","IMG_7686-kopya.jpg","IMG_7686.jpg",
      "IMG_7687.jpg","IMG_7689.jpg","IMG_7692.jpg","IMG_7693.jpg",
    ]),
    coverImage: img("LUCAS 11", ["IMG_7665.jpg"])[0],
  },
  {
    id: "lucas-22",
    name: "LUCAS 22",
    displayName: "Lucas 22",
    series: "LUCAS",
    type: "sofa",
    folder: "LUCAS 22",
    images: img("LUCAS 22", [
      "CASALLİNİ_133234.jpg","CASALLİNİ_133238.jpg","CASALLİNİ_133239.jpg",
      "CASALLİNİ_133240.jpg","CASALLİNİ_133244.jpg","CASALLİNİ_133245.jpg",
      "CASALLİNİ_133246.jpg","CASALLİNİ_133248.jpg","CASALLİNİ_133249.jpg",
      "CASALLİNİ_133251.jpg","CASALLİNİ_133252.jpg","CASALLİNİ_133254.jpg",
    ]),
    coverImage: img("LUCAS 22", ["CASALLİNİ_133234.jpg"])[0],
  },
  {
    id: "lucas-relax-kose",
    name: "LUCAS RELAX KÖŞE",
    displayName: "Lucas Relax Köşe",
    series: "LUCAS",
    type: "corner",
    folder: "LUCAS RELAX KÖŞE",
    images: img("LUCAS RELAX KÖŞE", [
      "CASALLİNİ_123292.jpg","CASALLİNİ_123294.jpg","CASALLİNİ_123295.jpg",
      "CASALLİNİ_123296.jpg","CASALLİNİ_123297.jpg","CASALLİNİ_123298.jpg",
      "CASALLİNİ_123300.jpg","CASALLİNİ_123302.jpg","CASALLİNİ_123304.jpg",
      "CASALLİNİ_123305.jpg",
    ]),
    coverImage: img("LUCAS RELAX KÖŞE", ["CASALLİNİ_123292.jpg"])[0],
  },
  {
    id: "luna",
    name: "LUNA",
    displayName: "Luna",
    series: "SOLO",
    type: "sofa",
    folder: "LUNA",
    images: img("LUNA", [
      "CASALLİNİ_133212.jpg","CASALLİNİ_133213.jpg","CASALLİNİ_133214.jpg",
      "CASALLİNİ_133215.jpg","CASALLİNİ_133220.jpg","CASALLİNİ_133221.jpg",
      "CASALLİNİ_133222.jpg","CASALLİNİ_133223.jpg","CASALLİNİ_133227.jpg",
      "CASALLİNİ_133229.jpg","CASALLİNİ_133231.jpg","CASALLİNİ_133232.jpg",
      "CASALLİNİ_133233.jpg",
    ]),
    coverImage: img("LUNA", ["CASALLİNİ_133212.jpg"])[0],
  },
  {
    id: "motto",
    name: "MOTTO",
    displayName: "Motto",
    series: "SOLO",
    type: "sofa",
    folder: "MOTTO",
    images: img("MOTTO", [
      "CASALLİNİ_149022.jpg","CASALLİNİ_149028.jpg","CASALLİNİ_149030.jpg",
      "CASALLİNİ_149031.jpg","CASALLİNİ_149035.jpg","CASALLİNİ_149038.jpg",
      "CASALLİNİ_149039.jpg","CASALLİNİ_149040.jpg","CASALLİNİ_149042.jpg",
      "CASALLİNİ_149044.jpg","CASALLİNİ_149045.jpg","CASALLİNİ_149046.jpg",
      "CASALLİNİ_149050.jpg","CASALLİNİ_149055.jpg","CASALLİNİ_149058.jpg",
      "CASALLİNİ_149060.jpg",
    ]),
    coverImage: img("MOTTO", ["CASALLİNİ_149022.jpg"])[0],
  },
  {
    id: "pablo-kose",
    name: "PABLO KÖŞE",
    displayName: "Pablo Köşe",
    series: "SOLO",
    type: "corner",
    folder: "PABLO KÖŞE",
    images: img("PABLO KÖŞE", [
      "casallini_143291.jpg","casallini_143292.jpg","casallini_143293.jpg",
      "casallini_143294.jpg","casallini_143297.jpg","casallini_143298.jpg",
      "casallini_143299.jpg","casallini_143300.jpg","casallini_143301.jpg",
      "casallini_143302.jpg","casallini_143303.jpg","casallini_143304.jpg",
      "casallini_143306.jpg","casallini_143307.jpg",
    ]),
    coverImage: img("PABLO KÖŞE", ["casallini_143291.jpg"])[0],
  },
  {
    id: "puma-koltuk",
    name: "PUMA KOLTUK",
    displayName: "Puma Koltuk",
    series: "SOLO",
    type: "armchair",
    folder: "PUMA KOLTUK",
    images: img("PUMA KOLTUK", [
      "CASALLİNİ_144083.jpg","CASALLİNİ_144085.jpg","CASALLİNİ_144086.jpg",
      "CASALLİNİ_144087.jpg","CASALLİNİ_144090.jpg","CASALLİNİ_144091.jpg",
      "CASALLİNİ_144092.jpg","CASALLİNİ_144093.jpg","CASALLİNİ_144094.jpg",
      "CASALLİNİ_144095.jpg","CASALLİNİ_144096.jpg","CASALLİNİ_144097.jpg",
      "CASALLİNİ_144098.jpg","CASALLİNİ_144099.jpg","CASALLİNİ_144100.jpg",
      "CASALLİNİ_144101.jpg",
    ]),
    coverImage: img("PUMA KOLTUK", ["CASALLİNİ_144083.jpg"])[0],
  },
  {
    id: "tetra",
    name: "TETRA",
    displayName: "Tetra",
    series: "SOLO",
    type: "sofa",
    folder: "TETRA",
    images: img("TETRA", [
      "CASALLİNİ01.jpg","CASALLİNİ02.jpg","CASALLİNİ03.jpg","CASALLİNİ04.jpg",
      "CASALLİNİ05.jpg","CASALLİNİ06.jpg","CASALLİNİ07.jpg","CASALLİNİ08.jpg",
      "CASALLİNİ09.jpg","CASALLİNİ10.jpg","CASALLİNİ11.jpg","CASALLİNİ12.jpg",
      "CASALLİNİ13.jpg","CASALLİNİ14.jpg",
    ]),
    coverImage: img("TETRA", ["CASALLİNİ01.jpg"])[0],
  },
  {
    id: "toscana",
    name: "TOSCANA",
    displayName: "Toscana",
    series: "SOLO",
    type: "sofa",
    folder: "TOSCANA",
    images: img("TOSCANA", [
      "CASALLİNİ_149478.jpg","CASALLİNİ_149479.jpg","CASALLİNİ_149480.jpg",
      "CASALLİNİ_149482.jpg","CASALLİNİ_149483.jpg","CASALLİNİ_149484.jpg",
      "CASALLİNİ_149486.jpg","CASALLİNİ_149487.jpg","CASALLİNİ_149488.jpg",
      "CASALLİNİ_149489.jpg","CASALLİNİ_149490.jpg","CASALLİNİ_149491.jpg",
      "CASALLİNİ_149492.jpg","CASALLİNİ_149493.jpg","CASALLİNİ_149494.jpg",
      "CASALLİNİ_149495.jpg",
    ]),
    coverImage: img("TOSCANA", ["CASALLİNİ_149478.jpg"])[0],
  },
  {
    id: "verona-koltuk",
    name: "VERONA KOLTUK",
    displayName: "Verona Koltuk",
    series: "SOLO",
    type: "armchair",
    folder: "VERONA KOLTUK",
    images: img("VERONA KOLTUK", [
      "CASALLİNİ_144103.jpg","CASALLİNİ_144104.jpg","CASALLİNİ_144118.jpg",
      "CASALLİNİ_144119.jpg","CASALLİNİ_144121.jpg","CASALLİNİ_144122.jpg",
      "CASALLİNİ_144123.jpg","CASALLİNİ_144124.jpg","CASALLİNİ_144125.jpg",
      "CASALLİNİ_144126.jpg","CASALLİNİ_144127.jpg","CASALLİNİ_144128.jpg",
      "CASALLİNİ_144129.jpg","CASALLİNİ_144130.jpg","CASALLİNİ_144131.jpg",
      "CASALLİNİ_144132.jpg","CASALLİNİ_144133.jpg","CASALLİNİ_144134.jpg",
      "CASALLİNİ_144136.jpg","CASALLİNİ_144137.jpg",
    ]),
    coverImage: img("VERONA KOLTUK", ["CASALLİNİ_144103.jpg"])[0],
  },
];

export const SERIES_FILTERS = ["ALL", "ALMİRA", "AVANOS", "LUCAS", "SOLO"] as const;
export const TYPE_FILTERS = ["sofa", "corner", "armchair"] as const;

export type SeriesFilter = (typeof SERIES_FILTERS)[number];
export type TypeFilter = (typeof TYPE_FILTERS)[number];
