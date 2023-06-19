import SimplexNoise from "simplex-noise";

interface Settings {
  moistureSeed: string;
  frequencyMoisture: number;
  hexColums: number;
  hexRows: number;
  moistureOctaves_0: number;
  moistureOctaves_1: number;
  moistureOctaves_2: number;
  moistureOctaves_3: number;
  redistributionMoisture: number;
}

export function moistureMap(settings: Settings): number[][] {
  const simplex = new SimplexNoise(settings.moistureSeed);
  let moisture: number[][] = [];
  let freq = settings.frequencyMoisture;
  for (let x = 0; x < settings.hexColums; x++) {
    moisture[x] = [];
    for (let y = 0; y < settings.hexRows; y++) {
      let nx = (x / settings.hexColums) * freq;
      let ny = (y / settings.hexRows) * freq;

      let m =
        settings.moistureOctaves_0 * simplex.noise2D(nx, ny) +
        settings.moistureOctaves_1 * simplex.noise2D(4 * nx, 4 * ny) +
        settings.moistureOctaves_2 * simplex.noise2D(8 * nx, 8 * ny) +
        settings.moistureOctaves_3 * simplex.noise2D(16 * nx, 16 * ny);
      m = (m + 1) / 2;
      if (m < 0) m = 0;
      if (m > 1) m = 1;
      moisture[x][y] = Math.pow(m, settings.redistributionMoisture);
    }
  }

  return moisture;
}
