import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import {getColorInput} from './FormTemplate';

export function ColorDisplay() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 50, CANVAS_HEIGHT = 50;
    
    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0); 
    };

    p.draw = () => {
      let colorInput = getColorInput();
      p.background(colorInput);
      p.noFill();
      p.stroke(0);
      p.strokeWeight(3);
      p.rect(0, 0, p.width, p.height);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorDisplay