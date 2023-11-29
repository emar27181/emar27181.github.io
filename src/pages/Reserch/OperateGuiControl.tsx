import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function OperateGuiControl() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 300;
    let barX = 40;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.background(0);
      displayControlBar();
      if (p.mouseIsPressed) { mouseContorl() }
    };

    function mouseContorl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        barX = p.mouseX;
      }
    }

    function displayControlBar() {
      p.rect(barX, 10, 10, 30);
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default OperateGuiControl