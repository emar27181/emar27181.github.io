import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount, ReturnUsedColorSchemeAmountOnlyMainColor } from './CalculateUsedColors';
import { ReturnRecommendedColorSchemeAmount } from './CalculateRecommendColors';
import { ColorAmount } from '../../utils/ColorAmount';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';
import p5 from 'p5';

let isTouhched: boolean;
let drawingColor: number[];

export function DisplayColorPalette() {
  const sketch = (p: P5CanvasInstance) => {
    const ONE_COLOR_PALETTE_SIZE = 0.03 * window.innerWidth;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];
    //let recommendedColorSchemeAmount: Array<ColorAmount> = [];
    //let recommendedColorSchemeAmount: ColorAmount[][] ;
    let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
      initializeVariables();
    };

    function initializeVariables() {
      for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
      recommendedColorSchemeAmount[0][0] = new ColorAmount(p.color(255), 0);
      drawingColor = [255, 255, 255, 255];
      isTouhched = false;
    }

    p.draw = () => {
      updateVariables();

      displayColorPaletteByRatio(usedColorSchemeAmountOnlyMainColor, 0, 0);
      //displayColorPaletteByRatio(usedColorsAmount, 0, 0, p.width, 0.1 * p.height);
      //isplayColorPaletteByRatio(usedColorSchemeAmount, 0, 0, p.width, 0.1 * p.height);

      drawTriangle(0.125 * p.height); // ↓

      displayColorPaletteByRatio(recommendedColorSchemeAmount[0], 0, 0.2 * p.height);
      displayColorPaletteByRatio(recommendedColorSchemeAmount[1], 0, 0.3 * p.height);

      //---------------------------------------------------------

      displayColorPaletteBySquare(usedColorSchemeAmount, 0, 0.5 * p.height);

      drawTriangle(0.625 * p.height) // ↓

      displayColorPaletteBySquare(recommendedColorSchemeAmount[0], 0, 0.7 * p.height);
      displayColorPaletteBySquare(recommendedColorSchemeAmount[1], 0, 0.8 * p.height);

    };

    p.mousePressed = () => {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouhched = true;
        drawingColor = p.get(p.mouseX, p.mouseY);
      }
    }

    function drawTriangle(y: number) {
      p.fill(255);
      p.noStroke();
      p.triangle(0.45 * p.width, y, 0.55 * p.width, y, 0.5 * p.width, y + 0.05 * p.height);
    }

    function updateVariables() {
      usedColorsAmount = ReturnUsedColorsAmount();
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      usedColorSchemeAmountOnlyMainColor = ReturnUsedColorSchemeAmountOnlyMainColor();
      recommendedColorSchemeAmount = ReturnRecommendedColorSchemeAmount();
      isTouhched = false;
    }

    function displayColorPaletteByRatio(colorsAmount: ColorAmount[], x: number, y: number) {
      // 量の総和の計算
      let sumAmount = 0;
      for (let i = 0; i < colorsAmount.length; i++) {
        sumAmount += colorsAmount[i].amount;
      }

      // 使用色の描画
      p.noStroke();
      for (let i = 0; i < colorsAmount.length; i++) {
        p.stroke(20);
        p.strokeWeight(p.width * 0.003);
        p.fill(colorsAmount[i].color);
        p.rect(x, y, p.width / sumAmount * colorsAmount[i].amount, ONE_COLOR_PALETTE_SIZE);
        x += p.width / sumAmount * colorsAmount[i].amount;
      }

      //外枠の描画
      /*
      p.stroke(20);
      p.strokeWeight(0.003 * p.width);
      p.fill(255, 0, 0);
      p.rect(x, y, p.width, ONE_COLOR_PALETTE_SIZE);
      */
    }

    function displayColorPaletteBySquare(colorsAmount: ColorAmount[], x: number, y: number) {
      p.colorMode(p.HSL);
      p.strokeWeight(0.01 * p.width);
      for (let i = 0; i < colorsAmount.length; i++) {
        p.stroke(20);
        p.fill(colorsAmount[i].color);
        p.rect(x + i * ONE_COLOR_PALETTE_SIZE, y, ONE_COLOR_PALETTE_SIZE, ONE_COLOR_PALETTE_SIZE);
        //確認用出力
        p.fill(255);
        p.stroke(0, 0, 0, 30);
        p.textAlign(p.CENTER, p.CENTER);
        //p.text(p.round(p.hue(colorsAmount[i].color)), x + i * ONE_COLOR_PALETTE_SIZE + ONE_COLOR_PALETTE_SIZE / 2, y + ONE_COLOR_PALETTE_SIZE / 2);
      }
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayColorPalette
export function ReturnIsTouchedOfDisplayColorPalette() { return isTouhched; }
export function ReturnDrawingColorOfDisplayColorPalette() { return drawingColor; }