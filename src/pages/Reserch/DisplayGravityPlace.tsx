import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.textSize(20);
      p.fill(255);
      //p.text("this is test text. \n aaa", p.width / 2, p.height / 2);
      p.text("this is test text. \n aaa", 0, 20);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace