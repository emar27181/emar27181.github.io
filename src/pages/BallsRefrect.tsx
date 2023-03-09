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
      boundCount: number = 0;

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
    let dx = 1, dy = 2;
    let isChangeColor = false;
    let isBallCollisionDetected = false;

    p.draw = () => {
      p.background("#000000");

      if (p.mouseIsPressed) {
        balls.push(new Ball(p.mouseX, p.mouseY, 10));
      }
      if (p.keyIsPressed) {
        if (p.key === "c") { isChangeColor = !isChangeColor; }
        else if (p.key === "d") { isBallCollisionDetected = !isBallCollisionDetected; }
      }

      for (let i = 0; i < balls.length; i++) {
        if (isBallCollisionDetected) {
          let nextColorX = p.get(balls[i].x + dx, balls[i].y);
          let nextColorY = p.get(balls[i].x, balls[i].y + dy);

          if (nextColorX[0] != 0) {
            balls[i].dx = -balls[i].dx;
            balls[i].boundCount++;
          }
          else if (nextColorY[0] != 0) {
            balls[i].dy = -balls[i].dy;
            balls[i].boundCount++;
          }
        }

        if (balls[i].x > p.width || balls[i].x < 0) {
          balls[i].dx = -balls[i].dx;
          balls[i].boundCount++;
        }

        else if (balls[i].y > p.height || balls[i].y < 0) {
          balls[i].dy = -balls[i].dy;
          balls[i].boundCount++;
        }

        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

        if (isChangeColor) { p.fill(255 - balls[i].boundCount * 30); }
        else { p.fill(255); }
        p.ellipse(balls[i].x, balls[i].y, balls[i].r, balls[i].r);
      }


      p.noStroke();
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BallsReflect