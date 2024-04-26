import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnOrderUsedColors } from './CalculateUsedColors';
import p5 from 'p5';
import Color from 'color';

let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];
let orderUsedColors: Array<p5.Color> = [];

export function CalculateRecommendColors() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      initializeVariables();
    };

    function initializeVariables() {
      for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
    }

    p.draw = () => {
      updateVariables();
      calculateRecommendColorSchemeAmount();
    };

    function updateVariables() {
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      orderUsedColors = ReturnOrderUsedColors();
    }

    function calculateRecommendColorSchemeAmount() {
      if (orderUsedColors.length === 0) { return; }

      resetRecommendedColorSchemeAmount();

      let baseColor = orderUsedColors[0]; // 最初に使われた色をベースカラーであると仮定する

      calculateDominantColor(recommendedColorSchemeAmount[0], baseColor);
      calculateDominantTone(recommendedColorSchemeAmount[1], baseColor);
    }

    function calculateDominantColor(colorAmount: ColorAmount[], baseColor: p5.Color) {
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount.push(new ColorAmount(baseColor, 100));
      colorAmount.push(new ColorAmount(p.color((hue + 30) % 360, saturation, lightness), 100));
      colorAmount.push(new ColorAmount(p.color((hue + 330) % 360, saturation, lightness), 100));
    }

    function calculateDominantTone(colorAmount: ColorAmount[], baseColor: p5.Color) {
      p.colorMode(p.RGB);
      let red = p.red(baseColor);
      let green = p.green(baseColor);
      let blue = p.blue(baseColor);

      colorAmount.push(new ColorAmount(baseColor, 100));
      colorAmount.push(new ColorAmount(p.color(0.7 * red, 0.7 * green, 0.7 * blue), 100));
      colorAmount.push(new ColorAmount(p.color(0.4 * red, 0.4 * green, 0.4 * blue), 100));
    }


    function resetRecommendedColorSchemeAmount() {
      recommendedColorSchemeAmount = [];
      for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
    }

    function calculateColorsAmount(colorAmount: ColorAmount[]) {
      let sumAmount = 0;
      for (let i = 0; i < colorAmount.length; i++) {
        sumAmount += colorAmount[i].amount;
      }
      return sumAmount;
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateRecommendColors
export function ReturnRecommendedColorSchemeAmount() { return recommendedColorSchemeAmount; }