import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Ripples() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0); 
    };

    let x = 0, y = 0, r = 0;

    p.draw = () => {
      p.background(0);
      p.stroke(255);
      p.fill(0, 0, 0, 0); 
      p.ellipse(x, y, r++, r++); 
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Ripples