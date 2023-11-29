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
      displayControlBar();
    };

    function displayControlBar() {
      p.rect(barX, 10, 10, 30);
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default OperateGuiControl