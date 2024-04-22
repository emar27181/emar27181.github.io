import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ColorAmount } from '../../utils/ColorAmount';

export function DisplayUsedColorPalette() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(255);
      p.frameRate(1);
    };

    p.draw = () => {
      updateVariables();
      displayColorPalette(usedColorSchemeAmount);
    };

    function displayColorPalette(colorsAmount: ColorAmount[]) {
      p.noStroke();
      for (let i = 0; i < colorsAmount.length; i++) {
        const SPLIT = colorsAmount.length;
        p.fill(colorsAmount[i].color);
        p.rect(p.width / SPLIT * i, 0, p.width / SPLIT, p.height);
      }

      //外枠の描画
      p.stroke(0);
      p.strokeWeight(p.width * 0.01);
      p.noFill();
      p.rect(0, 0, p.width, p.height);
    }
    /*
    function displayColorPalette() {
      for (let i = 0; i < usedColorsAmount.length; i++) {
        const SPLIT = usedColorsAmount.length;
        p.fill(usedColorsAmount[i].color);
        p.rect(p.width / SPLIT * i, 0, p.width / SPLIT, p.height);
      }
    }
    */

    function updateVariables() {
      usedColorsAmount = ReturnUsedColorsAmount();
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorPalette