import React, { ReactNode, useEffect, useState } from "react";
import { PixiComponent, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";
import dynamic from "next/dynamic";
// import { Viewport as PixiViewport } from "pixi-viewport";

//@ts-ignore
const { Viewport } = dynamic(() => import("pixi-viewport"), { ssr: false });

interface PixiComponentViewportProps {
  app: any;
  width: number;
  height: number;
  children?: any;
}
interface PixiComponentViewportPropsImmediate {
  width: number;
  height: number;
  children?: any;
}

const PixiComponentViewport = PixiComponent<PixiComponentViewportProps, any>(
  "Viewport",
  {
    create: (props) => {
      const { width, height } = props;
      const { ticker } = props.app;
      const { events } = props.app.renderer;

      // Only create the viewport if we are in the browser
      if (typeof window !== "undefined" && Viewport) {
        const customViewport = new Viewport({
          screenWidth: width,
          screenHeight: height,
          worldWidth: width,
          worldHeight: height,
          ticker: ticker,
          events: events,
        });

        customViewport
          .drag()
          .pinch()
          .wheel()
          .clamp({ direction: "all" })
          .clampZoom({ minScale: 0.5, maxScale: 1 })
          .decelerate();

        return customViewport;
      }

      return new PIXI.Container();
    },
  }
);
const MainViewport: React.FC<PixiComponentViewportPropsImmediate> = (props) => {
  const app = useApp();

  return (
    <PixiComponentViewport {...props} app={app}>
      {props.children}
    </PixiComponentViewport>
  );
};

export default MainViewport;
