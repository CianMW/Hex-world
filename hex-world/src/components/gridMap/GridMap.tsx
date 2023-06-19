import React, { useEffect } from "react";
import * as Honeycomb from "honeycomb-grid"; // make sure to install this via npm
import * as PIXI from "pixi.js";
import { PixiComponent, withPixiApp } from "@pixi/react";
import heightMap from "./heightMap"; // I'm assuming these are imported from other modules
import moistureMap from "./moistureMap";
import lookup from "./lookup";

const GridMap = withPixiApp(({ app, viewport, settings }) => {
  useEffect(() => {
    loadGrid(app, viewport, settings);
  }, [app, viewport, settings]);

  return null;
});

function loadGrid(app, viewport, settings) {
    let Hex = Honeycomb.extendHex({ size: {width: 32, height: 28},  orientation: settings.hexOrientation });
    let Grid = Honeycomb.defineGrid(Hex);
    let elevation = heightMap(settings);
    let moisture = moistureMap(settings);

    let biomeTileset = {
        "DeepWater": {x:4, y:5, z:0},
        "ShallowWater": {x:0, y:5, z:1},
        "FlatDesert1": {x:1, y:2, z:2},
        "FlatDesert2": {x:1, y:1, z:2},
        "FlatGrass": {x:2, y:0, z:2},
        "FlatSparseTrees1": {x:3, y:0, z:2},
        "FlatSparseTrees2": {x:4, y:0, z:2},
        "FlatForest": {x:5, y:0, z:2},
        "FlatForestSwampy": {x:7, y:1, z:2},
        "HillDesert": {x:9, y:2, z:3},
        "HillGrass": {x:7, y:0, z:3},
        "HillForest": {x:6, y:0, z:3},
        "HillForestNeedleleaf": {x:10, y:0, z:3},
        "MountainDesert": {x:8, y:2, z:4},
        "MountainShrubland1": {x:8, y:0, z:4},
        "MountainShrubland2": {x:9, y:0, z:4},
        "MountainAlpine1": {x:10, y:0, z:4},
        "MountainAlpine2": {x:11, y:0, z:4},
        "MountainImpassable1": {x:10, y:6, z:5},
        "MountainImpassable2": {x:0, y:6, z:5},
        "lake1": {x:12, y:0, z:0},
        "lake2": {x:3, y:1, z:0},
        "lake3": {x:2, y:1, z:0},
        "lake4": {x:8, y:1, z:0},
        "Volcano": {x:3, y:6, z:5},
        "lair": {x:0, y:8},
        "lairSnow": {x:1, y:8},
        "lairDesert": {x:2, y:8},
    };

    let riverTileset = {
        "SOURCE": {x:0, y:2},
        "01": {x:1, y:1},
        "02": {x:5, y:2},
        "03": {x:2, y:2},
        "04": {x:2, y:1},
        "05": {x:4, y:2},
        "10": {x:1, y:1},
        "12": {x:4, y:1},
        "13": {x:6, y:1},
        "14": {x:3, y:1},
        "15": {x:0, y:1},
        "20": {x:5, y:2},
        "21": {x:4, y:1},
        "23": {x:3, y:2},
        "24": {x:5, y:1},
        "25": {x:1, y:2},
        "30": {x:2, y:2},
        "31": {x:6, y:1},
        "32": {x:3, y:2},
        "34": {x:7, y:1},
        "35": {x:6, y:2},
        "40": {x:2, y:1},
        "41": {x:3, y:1},
        "42": {x:5, y:1},
        "43": {x:7, y:1},
        "45": {x:7, y:2},
        "50": {x:4, y:2},
        "51": {x:0, y:1},
        "52": {x:1, y:2},
        "53": {x:6, y:2},
        "54": {x:7, y:2},
    };

    // render hex grid
    let gr = Grid.rectangle({ width: settings.hexColums, height: settings.hexRows});
    gr.forEach(hex => {
        let coords = hex.cartesian();
        hex.elevation = elevation[coords.x][coords.y];
        hex.moisture = moisture[coords.x][coords.y];
        if (hex.elevation < settings.contourInterval_0) {
            hex.archetype = "Deep Water";
            hex.biome = "Water";
            hex.tile = "DeepWater";
        }
        else if (hex.elevation < settings.contourInterval_1) {
            hex.archetype = "Shallow Water";
            hex.biome = "Water";
            hex.tile = "ShallowWater";
        }
        else if (hex.elevation < settings.contourInterval_2) {
            hex.archetype = "Flat";
            if (hex.moisture < 0.10) {
                hex.biome = "Desert";
                hex.tile = "FlatDesert1";
            } else if (hex.moisture < 0.25) {
                hex.biome = "Desert";
                hex.tile = "FlatDesert2";
            } else if (hex.moisture < 0.40) {
                hex.biome = "Grass";
                hex.tile = "FlatGrass";
            } else if (hex.moisture < 0.65) {
                hex.biome = "Grass";
                hex.tile = lookup() <= 10 ? "FlatSparseTrees2": "FlatSparseTrees1";
            } else if (hex.moisture < 0.95){
                hex.biome = "Forest";
                hex.tile = "FlatForest";
            } else {
                hex.biome = "Forest";
                hex.tile = "FlatForestSwampy";
            }
        }
        else if (hex.elevation < settings.contourInterval_3) {
            hex.archetype = "Hill";
            if (hex.moisture < 0.10) {
                hex.biome = "Desert";
                hex.tile = "HillDesert";
            }
            else if (hex.moisture < 0.45) {
                hex.biome = "Grass";
                hex.tile = "HillGrass";
            }
            else {
                hex.biome = "Forest";
                hex.tile = "HillForest";
            }
        }
        else if (hex.elevation < settings.contourInterval_4) {
            hex.archetype = "Mountain";
            if (hex.moisture < 0.10) {
                hex.biome = "Desert";
                hex.tile = "MountainDesert";
            }
            else if (hex.moisture < 0.30) {
                hex.biome = "Shrubland";
                hex.tile = lookup() <= 50 ? "MountainShrubland2": "MountainShrubland1";
            }
            else if (hex.moisture < 0.80) {
                hex.biome = "Alpine forest";
                hex.tile = lookup() <= 50 ? "MountainAlpine2": "MountainAlpine1";
            }
            else {
                hex.biome = "Shrubland";
                hex.tile = lookup() <= 50 ? "MountainShrubland2": "MountainShrubland1";
            }
        }
        else {
            hex.archetype = "Mountain impassable";
            hex.biome = "Snow";
            if (hex.moisture < 0.40) {
                hex.tile = lookup() >= 97 ? "Volcano": "MountainImpassable1";
            } else {
                hex.tile = "MountainImpassable2";
            }
        }
    });
}

export default GridMap;
