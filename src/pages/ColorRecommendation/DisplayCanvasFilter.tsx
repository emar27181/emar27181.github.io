import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import React from 'react';
import p5 from 'p5';
import { ReturnIsDesktop } from '../../App';
import { ReturnImageColors } from '../Reserch/ReturnImageInfo';
import { ReturnCameraColors } from '../Reserch/ReturnCameraInfo';

export function DisplayCanvasFilter(displayMode: string, loadNumber: number, displayColorSpace: string) {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;
    const SATURATION_LIMIT = 10;
    let canvasWidth = 0, canvasHeight = 0;
    let canvasColors: p5.Color[][] = [];
    let backgroundColor = p.color(255, 255, 255);
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }

    p.setup = () => {
      //p.createCanvas(200, 200);

      if (displayMode === "camera") { p.createCanvas(480 / 3, 480 / 3); }
      else if (displayMode === "image") { p.createCanvas(512 / 3, 512 / 3); }
      else {
        let rate = 0.25;
        p.createCanvas(rate * window.innerWidth / 3, rate * window.innerWidth / 3);
        //let rate = 0.65;
        //p.createCanvas(rate * p.windowWidth / 2 / 3, rate * p.windowWidth / 2 / 3);
        //if (ReturnIsDesktop()) { p.createCanvas(rate * p.windowWidth / 2 / 3, rate * p.windowWidth / 2 / 3); }
        //else { p.createCanvas(rate * p.windowWidth / 3, rate * p.windowWidth / 3); }
      }
      p.background(backgroundColor);
      p.noStroke();
    };

    p.draw = () => {
      if (p.frameCount % 10 === 1 && displayMode === "image") { displayCanvas(); }
      if (p.frameCount % 10 === 1 && displayMode === "camera") { displayCanvas(); }
      if (p.frameCount % 3 === 1 && displayMode === "canvas") { displayCanvas(); }
      updateVariables();
    };

    function updateVariables() {

      if (displayMode === "canvas") { canvasColors = ReturnCanvasColors(); }
      else if (displayMode === "camera") { canvasColors = ReturnCameraColors(); }
      else if (displayMode === "image") {
        canvasColors = ReturnImageColors(loadNumber);
        //console.log("called")
      }
      //canvasColors = ReturnCanvasColors();
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
    }

    function displayCanvas() {

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          setColor(canvasColors[i][j]);
          //console.log("(" + p.red(canvasColors[i][j]) + ", " + p.green(canvasColors[i][j]) + ", " + p.blue(canvasColors[i][j]) + ")");
          p.rect(p.width / SPLIT * i, p.height / SPLIT * j, p.width / SPLIT, p.height / SPLIT);
        }
      }
    }

    function setColor(color: p5.Color): void {
      //if (p.saturation(color) <= SATURATION_LIMIT) {
      if (equalsColor(color, backgroundColor)) {
        p.fill(backgroundColor);
      }
      else if (displayColorSpace === "hue") {
        p.colorMode(p.HSL);
        p.fill(p.hue(color), 70, 70);
      }
      else if (displayColorSpace === "saturation") {
        p.colorMode(p.HSB);
        p.fill(0, p.saturation(color), p.saturation(color));
      }
      else if (displayColorSpace === "lightness") {
        p.colorMode(p.HSL);
        p.fill(0, 0, p.lightness(color));
      }
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      //console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayCanvasFilter