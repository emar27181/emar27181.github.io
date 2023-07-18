import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ExplainPluticCircle() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.ellipse(p.width / 2, p.height / 2, 100, 100);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircle