import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5, { Graphics } from 'p5';
import { ReturnColorPaletteValue } from '../ColorRecommendation/ColorGenerateRe';
import imageFilePath0 from '../../assets/coloring_sample_image.png';

const SPLIT = 100;
export let drawingWeight = 0.06 * window.innerWidth;
export let drawingColor: p5.Color;
export let colorsAmount: Array<ColorAmount> = [];
let coloringImages: Array<p5.Image> = [];
let drawingLayer: Graphics;
let canvasColors: p5.Color[][] = [];

export function CanvasOnlyDraw() {
  const sketch = (p: P5CanvasInstance) => {

    p.preload = () => {
      coloringImages.push(p.loadImage(imageFilePath0));
    }

    p.setup = () => {
      initializeVariables();
      p.createCanvas(DISPLAY_RATE * window.innerWidth, DISPLAY_RATE * window.innerWidth);
      drawingLayer = p.createGraphics(p.width, p.height);
      drawingLayer.background(p.color(255));
      p.background(255);
      p.frameRate(60);
    };

    p.draw = () => {

      calculateColorsAmount();

      p.image(drawingLayer, 0, 0);
      p.image(coloringImages[0], 0, 0);
      updateVariables();
      if (p.mouseIsPressed) { mousePressed(); }
    };

    function initializeVariables() {
      drawingColor = p.color(255, 0, 0);
      for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          canvasColors[i][j] = p.color(0, 0, 0);
        }
      }
      colorsAmount.push(new ColorAmount(p.color(255), 0));
    }

    function updateVariables() {
      p.colorMode(p.HSL);
      drawingColor = p.color(ReturnColorPaletteValue());
      getCanvasColors();
    }

    p.keyPressed = () => {
      if (p.key === "+") { drawingWeight += 0.2 * p.frameRate(); }
      else if (p.key === '-') { drawingWeight -= 0.2 * p.frameRate(); }
    }

    function mousePressed() {
      drawingLayer.noStroke();
      drawingLayer.fill(drawingColor);
      drawingLayer.ellipse(p.mouseX, p.mouseY, drawingWeight);
    }

    function getCanvasColors() {
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          canvasColors[i][j] = p.color(p.get(p.width / SPLIT * i, p.height / SPLIT * j));
          //let color = canvasColors[i][j];
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }
    }


    function calculateColorsAmount() {
      resetColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateColorsAmount(color);
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }

      //確認用出力
      /*
      if (DEBUG) {
        console.log("--- " + p.frameCount + " ---");
        for (let i = 0; i < colorsAmount.length; i++) {
          console.log("[" + i + "]: (" + p.red(colorsAmount[i].color) + "," + p.green(colorsAmount[i].color) + "," + p.blue(colorsAmount[i].color) + ") =  " + colorsAmount[i].amount);
        }
      }*/
    }

    function resetColorsAmount() {
      colorsAmount = [];
      colorsAmount.push(new ColorAmount(p.color(255), 0));
    }

    function updateColorsAmount(color: p5.Color) {
      //color: 探索対象の色
      p.colorMode(p.RGB);

      // placeNumber: 四捨五入する位の10倍の値
      let placeNumber = 1;

      //1の位を四捨五入した値に変更
      color = p.color(p.round(p.red(color) / placeNumber) * placeNumber, p.round(p.green(color) / placeNumber) * placeNumber, p.round(p.blue(color) / placeNumber) * placeNumber);
      for (let i = 0; i < colorsAmount.length; i++) {
        //すでに出てきた色であった場合
        if (equalsColor(colorsAmount[i].color, color)) {
          colorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      colorsAmount[colorsAmount.length] = new ColorAmount(color, 1);
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

export class ColorAmount {
  color: p5.Color;
  amount: number;

  constructor(color: p5.Color, amount: number) {
    this.color = color;
    this.amount = amount;
  }

}

export default CanvasOnlyDraw