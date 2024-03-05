import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { figureNumber, remainingFigureNumber } from './FlipGame';

export function FlipGameMenu() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 128, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      //p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = () => {
      p.background(0);
      drawFigure();
      drawExplainMessage();
    };

    function drawFigure() {
      p.stroke(255);
      p.textSize(0.3 * p.width);
      let texts: string[] = [];

      texts[1] = "1. L: " + remainingFigureNumber[1] + "\n";
      texts[2] = "2. T: " + remainingFigureNumber[2] + "\n";

      for (let i = 0; i < 7; i++) {
        if (i === figureNumber) { p.fill(255, 0, 0); p.stroke(255, 0, 0); }
        else { p.fill(255); p.stroke(255); }

        p.text(texts[i], 0, i * p.height / 7);
      }
    }

    function drawExplainMessage() {
      p.textSize(0.07 * p.width);
      p.fill(255);
      p.noStroke();
      p.text("数字キー: 図形の切り替え", 0, 0.8 * p.height);
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default FlipGameMenu