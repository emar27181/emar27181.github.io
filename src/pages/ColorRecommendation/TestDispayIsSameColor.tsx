import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5 from 'p5';
import { calculateLabColorSimilarity } from './CalculateSimilarity';

export function TestDispayIsSameColor() {
  const sketch = (p: P5CanvasInstance) => {

    const SQUARE_WIDTH = 0.1 * (DISPLAY_RATE * window.innerWidth / 3);

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * window.innerWidth / 3, DISPLAY_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
      //p.noStroke();
    };

    p.draw = () => {
      p.background(0);

      let count = 1;

      p.fill(255);
      p.textSize(0.05 * p.width);
      p.text("SIM_VALUE_SAME_COLOR", 0.4 * p.width, 0.7 * SQUARE_WIDTH);

      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF7700"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF5500"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF4400"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF2200"));
    };

    function compareColor(x: number, y: number, p5Color1: p5.Color, p5Color2: p5.Color) {
      let simValue = calculateLabColorSimilarity(p5Color1, p5Color2);

      p.fill(p5Color1);
      p.rect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(p5Color2);
      p.rect(x + SQUARE_WIDTH * 2, y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(255);
      p.textSize(0.07 * p.width);
      p.text(":", x + 1.3 * SQUARE_WIDTH, y + p.textSize());
      p.text("→ " + p.round(simValue), x + SQUARE_WIDTH * 3.5, y + p.textSize());
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestDispayIsSameColor