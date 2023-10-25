import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityX, ReturnGravityY, ReturnIsFixedGravity, ReturnIsMouseGravity, ReturnMouseXY } from './Canvas';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let isFixedGravity = ReturnIsFixedGravity();
    let gravityX: number[] = [];
    let gravityY: number[] = [];
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    let mouse = ReturnMouseXY();
    let mouseX = mouse[0];
    let mouseY = mouse[1];
    let isMouseGravity = ReturnIsMouseGravity();

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.background(0);
      UpdateVariables();
      //console.log(gravity);
      if (isFixedGravity) {
        for (let i = 0; i < gravityX.length; i++) {
          DrawGravityPlace(gravityX[i], gravityY[i]);
        }
      }
      if (isMouseGravity) { DrawGravityPlace(mouseX, mouseY); }

      p.textSize(20);
      p.fill(255);
      /*
      p.text("isFixGravity: " + isFixedGravity +
        "\nfixedGravity(x, y) = (" + p.round(gravityX) + "," + p.round(gravityY) + ")" +
        "\ncanvas(x, y) = (" + p.round(canvasWidth) + "," + p.round(canvasHeight) + ")" +
        "\nmouse(x, y) = (" + p.round(mouseX) + "," + p.round(mouseY) + ")",
        0, 20);
      */
    };

    function DrawGravityPlace(inputX: number, inputY: number) {
      p.fill(255, 0, 0);
      let x = inputX * (p.width / canvasWidth);
      let y = inputY * (p.height / canvasHeight);
      p.ellipse(x, y, 5);
    }

    function UpdateVariables() {
      isFixedGravity = ReturnIsFixedGravity();
      gravityX = ReturnGravityX();
      gravityY = ReturnGravityY();
      canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
      mouse = ReturnMouseXY();
      mouseX = mouse[0];
      mouseY = mouse[1];
      isMouseGravity = ReturnIsMouseGravity();
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace