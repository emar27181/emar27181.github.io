import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnRecommendedColorSchemeAmount } from './CalculateRecommendColors';
import { ColorAmount } from '../../utils/ColorAmount';

export function DisplayUsedColorPalette() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];
    let recommendedColorSchemeAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(255);
      p.frameRate(1);
    };

    p.draw = () => {
      updateVariables();
      displayColorPalette(usedColorSchemeAmount, 0, 0, p.width, p.height / 2);
      displayColorPalette(recommendedColorSchemeAmount, 0, p.height / 2, p.width, p.height);
    };

    function displayColorPalette(colorsAmount: ColorAmount[], x1: number, y1: number, x2: number, y2: number) {

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
      p.strokeWeight(p.width * 0.01);
      p.noFill();
      p.rect(x1, y1, x2 - x1, y2 - y1);
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

export default DisplayUsedColorPalette