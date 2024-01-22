import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function FlipGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(200);
    };

    p.draw = () => {
      drawLines();
    };

    function drawLines() {
      const SPLIT = 3
      p.stroke(255);
      //格子状の線
      for (let i = 0; i < SPLIT; i++) {
        p.line(i * p.width / SPLIT, 0, i * p.width / SPLIT, p.height);
        p.line(0, i * p.height / SPLIT, p.width, i * p.height / SPLIT);
      }
      //外枠の線
      p.noFill();
      p.rect(0, 0, p.width, p.height);

    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default FlipGame