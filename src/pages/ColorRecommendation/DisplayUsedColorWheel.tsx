import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DisplayUsedColorWheel() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      let rate = 0.35;
      p.createCanvas(rate * window.innerWidth / 3, rate * window.innerWidth / 3);
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

export default DisplayUsedColorWheel