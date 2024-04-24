import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnRecommendedColorSchemeAmount } from './CalculateRecommendColors';
import { ColorAmount } from '../../utils/ColorAmount';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';

export function DisplayColorPalette() {
  const sketch = (p: P5CanvasInstance) => {
    const ONE_COLOR_PALETTE_SIZE = 0.03 * window.innerWidth;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];
    let recommendedColorSchemeAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
    };

    p.draw = () => {
      updateVariables();

      displayColorPaletteByRatio(usedColorSchemeAmount, 0, 0, p.width, 0.1 * p.height);
      p.fill(255);
      p.triangle(0.45 * p.width, 0.125 * p.height, 0.55 * p.width, 0.125 * p.height, 0.5 * p.width, 0.175 * p.height);
      displayColorPaletteByRatio(recommendedColorSchemeAmount, 0, 0.2 * p.height, p.width, 0.3 * p.height);

      displayColorPaletteBySquare(usedColorSchemeAmount, 0, 0.5 * p.height);
      p.fill(255);
      p.noStroke();
      p.triangle(0.45 * p.width, 0.625 * p.height, 0.55 * p.width, 0.625 * p.height, 0.5 * p.width, 0.675 * p.height);
      displayColorPaletteBySquare(recommendedColorSchemeAmount, 0, 0.7 * p.height);

    };

    function displayColorPaletteByRatio(colorsAmount: ColorAmount[], x1: number, y1: number, x2: number, y2: number) {
      // 量の総和の計算
      let sumAmount = 0;
      for (let i = 0; i < colorsAmount.length; i++) {
        sumAmount += colorsAmount[i].amount;
      }

      // 使用色の描画
      p.noStroke();
      let x = 0;
      let w = x2 - x1, h = y2 - y1;
      for (let i = 0; i < colorsAmount.length; i++) {
        p.fill(colorsAmount[i].color);
        p.rect(x, y1, w / sumAmount * colorsAmount[i].amount, h);
        x += w / sumAmount * colorsAmount[i].amount;
      }

      //外枠の描画
      p.stroke(0);
      p.strokeWeight(p.width * 0.003);
      p.noFill();
      p.rect(x1, y1, x2 - x1, y2 - y1);
    }

    function displayColorPaletteBySquare(colorsAmount: ColorAmount[], x: number, y: number) {
      p.colorMode(p.HSL);
      p.strokeWeight(0.01 * p.width);
      for (let i = 0; i < colorsAmount.length; i++) {
        p.stroke(0);
        p.fill(colorsAmount[i].color);
        p.rect(x + i * ONE_COLOR_PALETTE_SIZE, y, ONE_COLOR_PALETTE_SIZE, ONE_COLOR_PALETTE_SIZE);
        //確認用出力
        p.fill(255);
        p.stroke(0, 0, 0, 30);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(p.round(p.hue(colorsAmount[i].color)), x + i * ONE_COLOR_PALETTE_SIZE + ONE_COLOR_PALETTE_SIZE / 2, y + ONE_COLOR_PALETTE_SIZE / 2);
      }
    }

    function updateVariables() {
      usedColorsAmount = ReturnUsedColorsAmount();
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      recommendedColorSchemeAmount = ReturnRecommendedColorSchemeAmount();
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayColorPalette