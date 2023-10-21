import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnGravityXY, ReturnIsFixedGravity } from './Canvas';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let isFixedGravity = ReturnIsFixedGravity();
    let gravity = ReturnGravityXY();
    let gravityX = gravity[0];
    let gravityY = gravity[1];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      isFixedGravity = ReturnIsFixedGravity();
      p.textSize(20);
      p.fill(255);
      p.text("isFixGravity: \n" + isFixedGravity +
        "\n(x, y) = (" + p.round(gravityX) + "," + p.round(gravityY) + ")",
        0, 20);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace