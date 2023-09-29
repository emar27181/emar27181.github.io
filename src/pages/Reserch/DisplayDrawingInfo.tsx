import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnHue, ReturnDrawingWeight } from './Canvas';

export function DisplayDrawingInfo() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 100, CANVAS_HEIGHT = CANVAS_WIDTH;
    let hue = ReturnHue();
    let drawingWeight = ReturnDrawingWeight();

    p.setup = () => {
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.createCanvas(CANVAS_WIDTH, p.windowHeight / 2);
      p.noStroke();
    };

    p.draw = () => {
      p.background(80);
      hue = ReturnHue();
      drawingWeight = ReturnDrawingWeight();
      p.fill(hue, 100, 100, 100);
      p.ellipse(p.width / 2, p.height - 50, drawingWeight);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayDrawingInfo