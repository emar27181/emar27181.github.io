import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DisplayUsedColorTone() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 64, CANVAS_HEIGHT = 64;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(255);
    };

    p.draw = () => {
      drawCircles();
    };

    function drawCircles() {
      const CIRCLE_SIZE = 2 * p.width / 10;

      p.noFill();
      p.stroke(0);

      p.ellipse(1 * p.width / 10, 1 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(1 * p.width / 10, 3 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(1 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(1 * p.width / 10, 7 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(1 * p.width / 10, 9 * p.width / 10, CIRCLE_SIZE);

      p.ellipse(3 * p.width / 10, 2 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(3 * p.width / 10, 4 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(3 * p.width / 10, 6 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(3 * p.width / 10, 8 * p.width / 10, CIRCLE_SIZE);

      p.ellipse(5 * p.width / 10, 2 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(5 * p.width / 10, 4 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(5 * p.width / 10, 6 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(5 * p.width / 10, 8 * p.width / 10, CIRCLE_SIZE);

      p.ellipse(7 * p.width / 10, 3 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(7 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE);
      p.ellipse(7 * p.width / 10, 7 * p.width / 10, CIRCLE_SIZE);

      p.ellipse(9 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE);
    }

  }
  return (
    <ReactP5Wrapper sketch={sketch} />
  )

}

export default DisplayUsedColorTone