import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';

let recommendedColorSchemeAmount: Array<ColorAmount> = [];

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
      recommendedColorSchemeAmount.push(new ColorAmount(p.color(255, 0, 0), 100));
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateRecommendColors
export function ReturnRecommendedColorSchemeAmount() { return recommendedColorSchemeAmount; }