import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Ripples() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;

    class Circle {
      x: number;
      y: number;
      r: number;
      constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
      }
    }

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0);
      p.noFill();
    };

    let v = 1;
    let circles: Array<Circle> = [];
    let isLoop = true;

    p.draw = () => {

      if (p.mouseIsPressed) {
        circles.push(new Circle(p.mouseX, p.mouseY, 0));
      }

      if (p.keyIsPressed) {
        if (p.key === "l") { isLoop = !isLoop; console.log("isLoop: " + isLoop); }
      }

      if (isLoop) { v = 1; }
      else { v = 0; }

      p.background(0);
      p.stroke(255);
      for (let i = 0; i < circles.length; i++) {
        p.ellipse(circles[i].x, circles[i].y, circles[i].r += v, circles[i].r += v);
        if (circles[i].r > 2 * p.width) { circles.splice(i, 1); }
      }
      //console.log(circles);
    };

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Ripples