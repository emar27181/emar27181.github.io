import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5 from 'p5';

export function TestDispayIsSameColor() {
  const sketch = (p: P5CanvasInstance) => {

    const SQUARE_WIDTH = 0.1 * (DISPLAY_RATE * window.innerWidth / 3);

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * window.innerWidth / 3, DISPLAY_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
    };

    p.draw = () => {
      compareColor(SQUARE_WIDTH, SQUARE_WIDTH, p.color("#FF0000"), p.color("#FF7700"));
    };

    function compareColor(x: number, y: number, p5Color1: p5.Color, p5Color2: p5.Color) {
      p.fill(p5Color1);
      p.rect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);


      p.fill(p5Color2);
      p.rect(x + SQUARE_WIDTH * 2, y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(255);
      p.noStroke();
      p.text("text", x + SQUARE_WIDTH * 4, y + p.textSize());
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestDispayIsSameColor