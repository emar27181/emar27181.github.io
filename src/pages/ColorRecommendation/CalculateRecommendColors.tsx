import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnOrderUsedColors } from './CalculateUsedColors';
import p5 from 'p5';

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
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 0, 0), 100));
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 128, 0), 100));
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 0), 100));
      recommendedColorSchemeAmount[1].push(new ColorAmount(p.color(255, 0, 0), 100));
      recommendedColorSchemeAmount[1].push(new ColorAmount(p.color(192, 0, 0), 100));
      recommendedColorSchemeAmount[1].push(new ColorAmount(p.color(128, 0, 0), 100));
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

      recommendedColorSchemeAmount[0].push(new ColorAmount(orderUsedColors[0], 100));
      recommendedColorSchemeAmount[1].push(new ColorAmount(orderUsedColors[0], 100));
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