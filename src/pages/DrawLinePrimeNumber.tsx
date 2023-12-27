import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DrawLinePrimeNumber() {
  const sketch = (p: P5CanvasInstance) => {

    let positions: Array<Position> = [];
    let count = 0;
    const VELOCITY = 0.1, DRAWING_WEIGHT = 0.1;

    p.setup = () => {
      p.createCanvas(window.innerHeight, window.innerHeight);
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      //p.createCanvas(10000, 10000);
      p.background(0);

      positions.push(new Position(0, 0, 0, -VELOCITY));
      positions.push(new Position(0, 0, 0, VELOCITY));
      positions.push(new Position(0, 0, -VELOCITY, 0));
      positions.push(new Position(0, 0, VELOCITY, 0));
    };

    p.draw = () => {
      p.translate(p.width / 2, p.height / 2);
      p.fill(255);
      p.noStroke();

      for (let i = 0; i < 100; i++) { drawLine(); }
    };

    function drawLine() {
      for (let i = 0; i < positions.length; i++) {
        p.ellipse(positions[i].x += positions[i].dx, positions[i].y += positions[i].dy, DRAWING_WEIGHT);

        if (isPrime(count)) {
          changeDirection(positions[i])
        }
      }
      count++;
    }

    function changeDirection(position: Position) {

      if (position.dx === VELOCITY && position.dy === 0) {
        position.dx = 0;
        position.dy = -VELOCITY;
      }
      else if (position.dx === 0 && position.dy === -VELOCITY) {
        position.dx = -VELOCITY;
        position.dy = 0;
      }
      else if (position.dx === -VELOCITY && position.dy === 0) {
        position.dx = 0;
        position.dy = VELOCITY;
      }
      else if (position.dx === 0 && position.dy === VELOCITY) {
        position.dx = VELOCITY;
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