import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function MatchBoGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    let matchValue = [[1, 1], [1, 1]];
    console.log(matchValue);

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.textSize(30);
      p.text(matchValue[0][0] + ", " + matchValue[0][1] + "\n\n" + matchValue[1][0] + ", " + matchValue[1][1], p.width / 2 - 15, p.height / 2 - 15);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default MatchBoGame