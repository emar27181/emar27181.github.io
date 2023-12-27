import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DrawLinePrimeNumber() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let positions: Array<Position> = [];

    p.setup = () => {
      p.createCanvas(window.innerWidth / 3, window.innerWidth / 3);
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);

      positions.push(new Position(0, 0));
    };

    p.draw = () => {
      p.translate(p.width / 2, p.height / 2);
      p.fill(255);


      drawLine();
    };

    function drawLine() {
      for (let i = 0; i < positions.length; i++) {
        p.ellipse(positions[i].x++, positions[i].y++, 3);
      }
    }

    class Position {
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DrawLinePrimeNumber