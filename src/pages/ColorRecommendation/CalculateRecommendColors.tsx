import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';

//let recommendedColorSchemeAmount: Array<ColorAmount> = [];
let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
//let recommendedColorSchemeAmount: ColorAmount[][] = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];

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
    };

    function updateVariables() {
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      //calculateRecommendColorSchemeAmount();
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

      //recommendedColorSchemeAmount[0].push(new ColorAmount(usedColorSchemeAmount[maxColorAmountIndex].color, usedColorSchemeAmount[maxColorAmountIndex].amount));
      recommendedColorSchemeAmount[0][0] = new ColorAmount(usedColorSchemeAmount[maxColorAmountIndex].color, usedColorSchemeAmount[maxColorAmountIndex].amount);

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