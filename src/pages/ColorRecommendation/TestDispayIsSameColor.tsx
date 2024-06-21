import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5 from 'p5';
import { calculateLabColorSimilarity } from './CalculateSimilarity';

export function TestDispayIsSameColor() {
  const sketch = (p: P5CanvasInstance) => {

    const SQUARE_WIDTH = 0.07 * (DISPLAY_RATE * window.innerWidth / 3);

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
      p.textSize(0.6*SQUARE_WIDTH);
      p.text("SIM_VALUE_SAME_COLOR", 0.4 * p.width, 0.7 * SQUARE_WIDTH);

      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF7700"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF5500"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF4400"));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), p.color("#FF0000"), p.color("#FF2200"));

      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 60, 50));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 75, 50));

      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 70));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 60));

      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 30));
      compareColor(0.5 * SQUARE_WIDTH, SQUARE_WIDTH * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 40));
    };

    function hslToP5Color(h: number, s: number, l: number): p5.Color{
      p.colorMode(p.HSL);
      return (p.color(h, s, l));
    }

    function compareColor(x: number, y: number, p5Color1: p5.Color, p5Color2: p5.Color) {
      let simValue = calculateLabColorSimilarity(p5Color1, p5Color2);

      p.fill(p5Color1);
      p.rect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(p5Color2);
      p.rect(x + SQUARE_WIDTH * 2, y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(255);
      p.textSize(0.8*SQUARE_WIDTH);
      p.text(":", x + 1.3 * SQUARE_WIDTH, y + p.textSize());
      p.text("→ " + p.round(simValue), x + SQUARE_WIDTH * 3.5, y + p.textSize());
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestDispayIsSameColor