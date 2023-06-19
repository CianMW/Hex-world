import { useState, useEffect } from "react";
import { Stage, useApp } from "@pixi/react";
import SettingsContainer from "@/components/settings/SettingsContainer";
import Viewport from "@/components/viewport/Viewport";
import PIXI from "pixi.js";
export default function Home() {
  const [settings, setSettings] = useState({
    screenW: 0,
    screenH: 0,
    hexSize: 16,
    hexOrientation: "flat",
    lineThickness: 1,
    lineColor: 0x999999,
    hideCoords: true,
    hideGrid: false,
    contourInterval_0: 0.2,
    contourInterval_1: 0.3,
    contourInterval_2: 0.5,
    contourInterval_3: 0.7,
    contourInterval_4: 0.9,
    elevationSeed: "fdc9a9ca516c78d1f830948badf1875d88424406",
    setElevationSeed: false,
    frequencyElevation: 0.8,
    redistributionElevation: 1.0,
    elevationOctaves_0: 1,
    elevationOctaves_1: 0.5,
    elevationOctaves_2: 0.25,
    elevationOctaves_3: 0.12,
    createIsland: false,
    moistureSeed: "d049b358d128cb265740a90fce37904ce07cd653",
    setMoistureSeed: false,
    drawMoisture: true,
    frequencyMoisture: 0.8,
    redistributionMoisture: 1.0,
    moistureOctaves_0: 1,
    moistureOctaves_1: 0.5,
    moistureOctaves_2: 0.25,
    moistureOctaves_3: 0.12,
  });

  let lookupTable: number[] = [];
  for (let ii = 1e4; ii--; ) {
    lookupTable.push((Math.random() * 101) | 0);
  }

  let ii = 0;
  const lookup = () => {
    return ++ii >= lookupTable.length ? lookupTable[(ii = 0)] : lookupTable[ii];
  };

  // Load resources when component mounts
  useEffect(() => {
    const loader = PIXI.Assets.load
      ("resources/img/tileset.png").load
      ("resources/img/tileset-borderless.png")
      .load("resources/img/roads_rivers-tileset.png")
      .load(() => {
        // drawMap();
      });
  }, []);

  // Update settings on window resize
  useEffect(() => {
    function handleResize() {
      let width =
        window.innerWidth - 100 > 1140 ? 1140 : window.innerWidth - 100;
      let height = window.innerHeight - 100;
      let columns = Math.ceil(width / 24) > 47 ? 47 : Math.ceil(width / 24);
      let rows =
        Math.ceil(height / (16 * 1.73205)) > 20
          ? 20
          : Math.ceil(height / (16 * 1.73205));

      setSettings((prevSettings) => ({
        ...prevSettings,
        screenW: width,
        screenH: height,
        hexColumns: columns,
        hexRows: rows,
      }));
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SettingsContainer />

      <Stage width={settings.screenW} height={settings.screenH}>
        <Viewport width={settings.screenW} height={settings.screenH}>
          <></>
        </Viewport>
      </Stage>
    </main>
  );
}
