import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function BallsReflectColors() {
  const sketch = (p: P5CanvasInstance) => {



    class Ball {
      x: number = 0;
      y: number = 0;
      dx: number = 1;
      dy: number = 2;
      r: number = 100;
      color: string = "red";
      boundCount: number = 0;

      constructor(x: number, y: number, r: number, color: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
      }

    }

    p.setup = () => {
      p.createCanvas(512, 512);
    };

    let balls: Array<Ball> = [];
    let dx = 1, dy = 2;
    let isChangeColor = false;
    let isColor = "red";
    let isBallCollisionDetected = false;

    p.draw = () => {
      p.background(0);
      //p.blendMode(p.ADD);

      if (p.mouseIsPressed) {
        balls.push(new Ball(p.mouseX, p.mouseY, 200, isColor));
      }
      if (p.keyIsPressed) {
        if (p.key === "c") { isChangeColor = !isChangeColor; }
        else if (p.key === "d") { isBallCollisionDetected = !isBallCollisionDetected; }
        else if (p.key === "r") { isColor = "red"; }
        else if (p.key === "g") { isColor = "green"; }
        else if (p.key === "b") { isColor = "blue"; }
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
        else if (balls[i].color === 'red') { p.fill(255, 0, 0, 30); }
        else if (balls[i].color === 'green') { p.fill(0, 255, 0, 30); }
        else if (balls[i].color === 'blue') { p.fill(0, 0, 255, 30); }
        p.ellipse(balls[i].x, balls[i].y, balls[i].r, balls[i].r);
      }


      p.noStroke();
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BallsReflectColors