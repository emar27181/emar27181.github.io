import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount } from './CalculateUsedColors';
import { ColorAmount } from '../../utils/ColorAmount';

export function DisplayUsedColorPalette() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let usedColorsAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(255);
      p.frameRate(1);
      p.noStroke();
    };

    p.draw = () => {
      usedColorsAmount = ReturnUsedColorsAmount();

      for (let i = 0; i < usedColorsAmount.length; i++) {
        const SPLIT = usedColorsAmount.length;
        p.fill(usedColorsAmount[i].color);
        p.rect(p.width / SPLIT * i, 0, p.width / SPLIT, p.height);
      }
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorPalette