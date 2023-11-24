import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from '../Reserch/Canvas';

export function DisplayColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = ReturnCanvasSize();
    
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0); 
    };

    p.draw = () => {
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayColorRatio