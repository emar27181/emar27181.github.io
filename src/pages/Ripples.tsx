import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Ripples() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;

    class  Circle{
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
    };

    let x = 0, y = 0, r = 0;
    let circles: Array<Circle> = [];

    p.draw = () => {

      if(p.mouseIsPressed){
        circles.push(new Circle(p.mouseX, p.mouseY, 0));
      }

      p.background(0);
      p.stroke(255);
      p.fill(0, 0, 0, 0); 

      for(let i = 0; i < circles.length; i++){
        p.ellipse(circles[i].x, circles[i].y, circles[i].r++, circles[i].r++);
      }
      console.log(circles);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Ripples