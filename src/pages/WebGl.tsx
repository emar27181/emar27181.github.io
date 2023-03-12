import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function WebGl() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE, p.WEBGL);
      p.background(0); 
    };

    let angle = 0;

    p.draw = () => {
      p.background(0)
      p.normalMaterial()
      p.rotateX(p.noise(angle)*7)
      p.rotateY(angle)
      angle = angle + 0.01
      p.box(100)
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default WebGl