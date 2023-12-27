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
      positions.push(new Position(0, 0, 1, 0));
    };

    p.draw = () => {
      p.translate(p.width / 2, p.height / 2);
      p.fill(255);


      drawLine();
    };

    function drawLine() {
      for (let i = 0; i < positions.length; i++) {
        p.ellipse(positions[i].x += positions[i].dx, positions[i].y += positions[i].dy, 3);
        //console.log(positions[i].dx + "," + positions[i].dy);

        if (isPrime(p.frameCount)) {
          changeDirection(positions[i])
        }
      }
    }

    function changeDirection(position: Position) {

      if (position.dx === 1 && position.dy === 0) {
        position.dx = 0;
        position.dy = -1;
      }
      else if (position.dx === 0 && position.dy === -1) {
        position.dx = -1;
        position.dy = 0;
      }
      else if (position.dx === -1 && position.dy === 0) {
        position.dx = 0;
        position.dy = 1;
      }
      else if (position.dx === 0 && position.dy === 1) {
        position.dx = 1;
        position.dy = 0;
      }
    }

    function isPrime(number: number): boolean {
      if (number <= 1) { return false; }
      if (number === 2) { return true; }
      if (number % 2 === 0) { return false; }

      for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) { return false; }
      }
      return true;
    }

    class Position {
      x: number;
      y: number;
      dx: number;
      dy: number;

      constructor(x: number, y: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DrawLinePrimeNumber