import Image from 'next/image'
import { Inter } from 'next/font/google'
import { defineHex, Grid, rectangle } from 'honeycomb-grid'
import Canvas from '@/components/canvas/Canvas'
import SettingsContainer from '@/components/settings/SettingsContainer'
import { Stage, Container, Sprite, Text } from '@pixi/react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

// 1. Create a hex class:
const Tile = defineHex({ dimensions: 30 })

// 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
const grid = new Grid(Tile, rectangle({ width: 10, height: 10 }))

// 3. Iterate over the grid to log each hex:
grid.forEach(console.log)
function getDefaultSettings() {

  let width = ( window.innerWidth - 100 > 1140 ) ? 1140 : window.innerWidth - 100;
  let height = window.innerHeight - 100;
  let colums = ( Math.ceil( width / 24 ) > 47) ? 47 : Math.ceil( width / 24 );
  let rows = ( Math.ceil( height / ( 16 * 1.73205 ) ) > 20) ? 20 : Math.ceil( height / ( 16 * 1.73205 ) );

  return {
      screenW: width,
      screenH: height,
      hexSize: 16,
      hexOrientation: 'flat',
      hexColums: colums, // x
      //hexColums: 40, // x
      hexRows:  rows, // y
      //hexRows:  20, // y
      lineThickness: 1,
      lineColor: 0x999999,
      hideCoords: true,
      hideGrid: false,
      contourInterval_0: 0.2,
      contourInterval_1: 0.3,
      contourInterval_2: 0.5,
      contourInterval_3: 0.7,
      contourInterval_4: 0.9,
      // Elevation Noise
      elevationSeed: 'fdc9a9ca516c78d1f830948badf1875d88424406',
      setElevationSeed: false,
      frequencyElevation: 0.8,
      redistributionElevation: 1.0,
      elevationOctaves_0: 1,
      elevationOctaves_1: 0.5,
      elevationOctaves_2: 0.25,
      elevationOctaves_3: 0.12,
      createIsland: false,
      // Moisture Noise
      moistureSeed: 'd049b358d128cb265740a90fce37904ce07cd653',
      setMoistureSeed: false,
      drawMoisture: true,
      frequencyMoisture: 0.8,
      redistributionMoisture: 1.0,
      moistureOctaves_0: 1,
      moistureOctaves_1: 0.5,
      moistureOctaves_2: 0.25,
      moistureOctaves_3: 0.12
  }
}

let settings = getDefaultSettings();
// const app = new PIXI.Application


function initializeViewport(app, settings) {

  let worldWidth = settings.hexColums * (settings.hexSize + (settings.hexSize / 2)) + (settings.hexSize / 2);
  let worldHeight = settings.hexRows * (settings.hexSize * 1.73205) + (settings.hexSize * 1.73205 / 2);
  if (settings.hexOrientation === 'pointy') {
      worldWidth = settings.hexColums * (settings.hexSize * 1.73205) + (settings.hexSize * 1.73205 / 2);
      worldHeight = settings.hexRows * (settings.hexSize + (settings.hexSize / 2)) + (settings.hexSize / 2);
  }

  const viewport = new Viewport.Viewport({
      screenWidth: app.view.offsetWidth,
      screenHeight: app.view.offsetHeight,
      worldWidth: worldWidth,
      worldHeight: worldHeight,

      interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  });

  app.stage.addChild(viewport);

  viewport
      .drag()
      .wheel()
      .bounce();

  return viewport;
}

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>  
    
        <SettingsContainer/>
    <Stage width={settings.screenW} height={settings.screenH} >
    </Stage>
    </main>
  )
}
