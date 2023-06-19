import SimplexNoise from "simplex-noise";

interface Settings {
  elevationSeed: string;
  frequencyElevation: number;
  hexColums: number;
  hexRows: number;
  elevationOctaves_0: number;
  elevationOctaves_1: number;
  elevationOctaves_2: number;
  elevationOctaves_3: number;
  redistributionElevation: number;
  createIsland: boolean;
}

function heightMap(settings: Settings): number[][] {
  const simplex = new SimplexNoise(settings.elevationSeed);
  let elevation: number[][] = [];
  let freq = settings.frequencyElevation;
  for (let x = 0; x < settings.hexColums; x++) {
    elevation[x] = [];
    for (let y = 0; y < settings.hexRows; y++) {
      let nx = (x / settings.hexColums) * freq;
      let ny = (y / settings.hexRows) * freq;

      let e =
        settings.elevationOctaves_0 * simplex.noise2D(nx, ny) +
        settings.elevationOctaves_1 * simplex.noise2D(4 * nx, 4 * ny) +
        settings.elevationOctaves_2 * simplex.noise2D(8 * nx, 8 * ny) +
        settings.elevationOctaves_3 * simplex.noise2D(16 * nx, 16 * ny);
      e = (e + 1) / 2;

      if (settings.createIsland) {
        let xp = x / settings.hexColums;
        let yp = y / settings.hexRows;
        let d = Math.hypot(0.5 - xp, 0.5 - yp);
        e = (1 + e - d * 3.5) / 2;
      }

      if (e < 0) e = 0;
      if (e > 1) e = 1;

      elevation[x][y] = Math.pow(e, settings.redistributionElevation);
    }
  }

  return elevation;
}
