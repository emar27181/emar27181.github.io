import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';

let recommendedColorSchemeAmount: Array<ColorAmount> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];

export function CalculateRecommendColors() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      initializeVariables();
    };

    function initializeVariables() {
      recommendedColorSchemeAmount.push(new ColorAmount(p.color(255), 0));
    }

    p.draw = () => {
      updateVariables();
    };

    function updateVariables() {
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      calculateRecommendColorSchemeAmount();
    }

    function calculateRecommendColorSchemeAmount() {
      recommendedColorSchemeAmount = [];

      // 初期実装としてusedColorSchemeで最も多い色を推薦
      let sumAmount = calculateColorsAmount(usedColorSchemeAmount);
      let maxColorAmountIndex = 0;
      for (let i = 0; i < usedColorSchemeAmount.length; i++) {
        if (usedColorSchemeAmount[i].amount > usedColorSchemeAmount[maxColorAmountIndex].amount) {
          maxColorAmountIndex = i;
        }
      }

      recommendedColorSchemeAmount.push(new ColorAmount(usedColorSchemeAmount[maxColorAmountIndex].color, usedColorSchemeAmount[maxColorAmountIndex].amount));

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