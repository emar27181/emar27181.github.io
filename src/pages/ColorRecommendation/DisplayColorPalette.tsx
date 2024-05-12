import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount, ReturnUsedColorSchemeAmountOnlyMainColor, ReturnOrderUsedColorsAmount } from './CalculateUsedColors';
import { ReturnRecommendedColorSchemeAmount } from './CalculateRecommendColors';
import { ColorAmount } from '../../utils/ColorAmount';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';
import p5 from 'p5';

let isTouhched: boolean;
let drawingColor: number[];

export function DisplayColorPalette() {
  const sketch = (p: P5CanvasInstance) => {
    const HEIGHT_COLOR_PALETTE = 0.015 * window.innerWidth;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];
    let orderUsedColorsAmount: Array<ColorAmount> = [];
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

      let countDisplayColorPalette = 0;

      displayColorPaletteByRatio(orderUsedColorsAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteByRatio(usedColorSchemeAmountOnlyMainColor, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteByRatio(usedColorsAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteByRatio(usedColorSchemeAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

      drawTriangle(countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE); // ↓

      displayColorPaletteByRatio(recommendedColorSchemeAmount[0], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteByRatio(recommendedColorSchemeAmount[1], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteByRatio(recommendedColorSchemeAmount[2], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

      //---------------------------------------------------------
      countDisplayColorPalette++; //空行の表示分のインクリメント

      displayColorPaletteBySquare(usedColorSchemeAmountOnlyMainColor, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      //displayColorPaletteBySquare(usedColorsAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteBySquare(usedColorSchemeAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

      drawTriangle(countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE) // ↓

      displayColorPaletteBySquare(recommendedColorSchemeAmount[0], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteBySquare(recommendedColorSchemeAmount[1], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
      displayColorPaletteBySquare(recommendedColorSchemeAmount[2], 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

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
      p.triangle(0.47 * p.width, y + 0.3 * HEIGHT_COLOR_PALETTE, 0.53 * p.width, y + 0.3 * HEIGHT_COLOR_PALETTE, 0.5 * p.width, y + 0.7 * HEIGHT_COLOR_PALETTE);
    }

    function updateVariables() {
      usedColorsAmount = ReturnUsedColorsAmount();
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      usedColorSchemeAmountOnlyMainColor = ReturnUsedColorSchemeAmountOnlyMainColor();
      orderUsedColorsAmount = ReturnOrderUsedColorsAmount();
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
        p.rect(x, y, p.width / sumAmount * colorsAmount[i].amount, HEIGHT_COLOR_PALETTE);
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
        p.rect(x + i * HEIGHT_COLOR_PALETTE, y, HEIGHT_COLOR_PALETTE, HEIGHT_COLOR_PALETTE);
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