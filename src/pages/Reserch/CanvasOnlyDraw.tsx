import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';

let drawingWeight = 30;

export function CanvasOnlyDraw() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * window.innerWidth, DISPLAY_RATE * window.innerWidth);
      p.background(255);
      p.frameRate(60);
    };

    p.draw = () => {
      if (p.mouseIsPressed) { mousePressed(); }
    };

    p.keyPressed = () => {
      if (p.key === "+") { drawingWeight += 0.2 * p.frameRate(); }
      else if (p.key === '-') { drawingWeight -= 0.2 * p.frameRate(); }
    }

    function mousePressed() {
      p.noStroke();
      p.fill(0);
      p.ellipse(p.mouseX, p.mouseY, drawingWeight);
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CanvasOnlyDraw