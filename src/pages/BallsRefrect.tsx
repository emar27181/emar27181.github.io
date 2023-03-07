import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function BallsReflect() {
  const sketch = (p: P5CanvasInstance) => {

    class Ball {
      x: number = 0;
      y: number = 0;
      r: number = 10;

      constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
      }
    }

    p.setup = () => {
      p.createCanvas(512, 512);
      p.background("#000000");
    };

    let balls: Array<Ball> = [];

    p.draw = () => {
      p.background("#000000");

      //balls.push(new Ball(p.width / 2, p.height / 2, 10));
      balls[0] = new Ball(p.width / 2, p.height / 2, 10);
      balls[1] = new Ball(p.width / 2, 0, 10);

      p.ellipse(balls[0].x, balls[0].y, balls[0].r);
      p.ellipse(balls[1].x, balls[1].y, balls[1].r);

      p.fill(255);
      p.noStroke();
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BallsReflect