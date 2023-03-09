import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Header() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    
    p.setup = () => {
    };

    let x = 0, y = 0 , dx = 0.1, dy = 0.3;

    p.draw = () => {
      p.createCanvas(p.windowWidth - 50, 3);
      p.background(255);

      if(x < 0 || x > p.width) {dx *= -1;}
      if(y < 0 || y > p.height) {dy *= -1;}

      x += dx;
      y += dy;

      p.fill(0);
      //p.ellipse(x, y, 1, 1);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Header;