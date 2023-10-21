import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityXY, ReturnIsFixedGravity } from './Canvas';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let isFixedGravity = ReturnIsFixedGravity();
    let gravity = ReturnGravityXY();
    let gravityX = gravity[0];
    let gravityY = gravity[1];
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.background(0);
      UpdateVariables();
      DrawGravityPlace();
      p.textSize(20);

      p.fill(255);
      p.text("isFixGravity: " + isFixedGravity +
        "\nfixedGravity(x, y) = (" + p.round(gravityX) + "," + p.round(gravityY) + ")" +
        "\ncanvas(x, y) = (" + p.round(canvasWidth) + "," + p.round(canvasHeight) + ")",
        0, 20);
    };

    function DrawGravityPlace() {
      p.fill(255, 0, 0);
      let x = gravityX * (p.width / canvasWidth);
      let y = gravityY * (p.height / canvasHeight);
      p.ellipse(x, y, 5);
    }

    function UpdateVariables() {
      isFixedGravity = ReturnIsFixedGravity();
      gravity = ReturnGravityXY();
      gravityX = gravity[0];
      gravityY = gravity[1];
      canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace