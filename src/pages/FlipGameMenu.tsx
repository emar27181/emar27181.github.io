import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { figureNumber } from './FlipGame';

export function FlipGameMenu() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 64, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      drawFigure();
    };

    function drawFigure() {
      p.stroke(255);
      p.textSize(0.3 * p.width)
      //L字
      if (figureNumber === 1) {
        p.text("L", p.width / 2, p.height / 2);
      }
      //T字
      else if (figureNumber === 2) {
        p.text("T", p.width / 2, p.height / 2);
      }

    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default FlipGameMenu