import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnOrderUsedColors, ReturnOrderUsedColorsAmount } from './CalculateUsedColors';
import p5 from 'p5';
import Color from 'color';

let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];
let orderUsedColorsAmount: Array<ColorAmount> = [];
//let orderUsedColors: Array<p5.Color> = [];

export function CalculateRecommendColors() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      initializeVariables();
    };

    function initializeVariables() {
      //for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
      recommendedColorSchemeAmount[0] = [];
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
    }

    p.draw = () => {
      updateVariables();
      calculateRecommendColorSchemeAmount();
    };

    function updateVariables() {
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      //orderUsedColors = ReturnOrderUsedColors();
      orderUsedColorsAmount = ReturnOrderUsedColorsAmount();
    }

    function calculateRecommendColorSchemeAmount() {
      //if (orderUsedColors.length === 0) { return; }
      let i = 0;
      if (orderUsedColorsAmount.length === 0) { return; }

      resetRecommendedColorSchemeAmount();

      let baseColor = orderUsedColorsAmount[0].color; // 最初に使われた色をベースカラーであると仮定する

      // 使われた色の数が1色だった場合
      if (orderUsedColorsAmount.length === 1) {
        calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        calculateDyadColor(recommendedColorSchemeAmount, baseColor);
      }

      else if (orderUsedColorsAmount.length === 2) {
        calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        calculateDyadColor(recommendedColorSchemeAmount, baseColor);
        calculateTriadColor(recommendedColorSchemeAmount, baseColor);
        calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
      }

      else if (orderUsedColorsAmount.length >= 3) {
        calculateTetradeColor(recommendedColorSchemeAmount, baseColor);
        calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        calculateTriadColor(recommendedColorSchemeAmount, baseColor);
      }
    }

    function calculateTriadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 33));
      colorAmount[i].push(new ColorAmount(p.color((hue + 120) % 360, saturation, lightness), 33));
      colorAmount[i].push(new ColorAmount(p.color((hue + 240) % 360, saturation, lightness), 33));
    }

    function calculateSplitComplementaryColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 70));
      colorAmount[i].push(new ColorAmount(p.color((hue + 165) % 360, saturation, lightness), 15));
      colorAmount[i].push(new ColorAmount(p.color((hue + 195) % 360, saturation, lightness), 15));
    }

    function calculateDyadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 50));
      colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 50));
    }

    function calculateTetradeColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 25));
      colorAmount[i].push(new ColorAmount(p.color((hue + 90) % 360, saturation, lightness), 25));
      colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 25));
      colorAmount[i].push(new ColorAmount(p.color((hue + 270) % 360, saturation, lightness), 25));
    }

    function calculateDominantColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.HSL);
      let hue = p.hue(baseColor);
      let saturation = p.saturation(baseColor);
      let lightness = p.lightness(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 70));
      colorAmount[i].push(new ColorAmount(p.color((hue + 30) % 360, saturation, lightness), 25));
      colorAmount[i].push(new ColorAmount(p.color((hue + 330) % 360, saturation, lightness), 5));
    }

    function calculateDominantTone(colorAmount: ColorAmount[][], baseColor: p5.Color) {
      let i = colorAmount.length;
      colorAmount[i] = [];
      p.colorMode(p.RGB);
      let red = p.red(baseColor);
      let green = p.green(baseColor);
      let blue = p.blue(baseColor);

      colorAmount[i].push(new ColorAmount(baseColor, 70));
      colorAmount[i].push(new ColorAmount(p.color(0.7 * red, 0.7 * green, 0.7 * blue), 25));
      colorAmount[i].push(new ColorAmount(p.color(0.4 * red, 0.4 * green, 0.4 * blue), 5));
    }


    function resetRecommendedColorSchemeAmount() {
      recommendedColorSchemeAmount = [];
      //for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
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