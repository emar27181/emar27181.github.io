import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function CurlingPlotTest() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 600;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(230);
    };

    p.draw = () => {
      p.noFill()
      p.stroke(0, 0, 255);
      p.ellipse(p.width / 2, 100, 100, 100);
      p.stroke(255, 0, 0);
      p.ellipse(p.width / 2, 100, 20, 20);

      p.stroke(0);
      p.fill(255, 0, 0);
      p.ellipse(p.width / 2, 100, 10, 10);
      p.ellipse(p.width / 2, 130, 10, 10);
      p.ellipse(20, 110, 10, 10);

      p.fill(0, 0, 255);
      p.ellipse(p.width / 2 + 30, 110, 10, 10);
      p.ellipse(50, 130, 10, 10);
      p.ellipse(20, 140, 10, 10);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CurlingPlotTest