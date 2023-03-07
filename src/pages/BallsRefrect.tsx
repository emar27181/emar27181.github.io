import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function BallsReflect() {
  const sketch = (p: P5CanvasInstance) => {

    class Ball {
      x: number = 0;
      y: number = 0;
      dx: number = 1;
      dy: number = 2;
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
      p.frameRate(30);
    };

    let balls: Array<Ball> = [];
    let dx = 1, dy = 2;

    p.draw = () => {
      p.background("#000000");

      if (p.mouseIsPressed) {
        balls.push(new Ball(p.mouseX, p.mouseY, 10));
      }

      for (let i = 0; i < balls.length; i++) {
        let nextColorX = p.get(balls[i].x + dx, balls[i].y);
        let nextColorY = p.get(balls[i].x, balls[i].y + dy);
  
        if (nextColorX[0] != 0) { balls[i].dx = -balls[i].dx; }
        else if (nextColorY[0] != 0) { balls[i].dy = -balls[i].dy; }

        if (balls[i].x > p.width || balls[i].x < 0) {
          balls[i].dx = -balls[i].dx;
          //balls[i].x = -balls[i].dx;
        }

        if (balls[i].y > p.height || balls[i].y < 0) {
          balls[i].dy = -balls[i].dy;
          //balls[i].y = -balls[i].dy;
        }

        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

        p.ellipse(balls[i].x, balls[i].y, balls[i].r, balls[i].r);
      }

      p.fill(255);
      p.noStroke();
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BallsReflect