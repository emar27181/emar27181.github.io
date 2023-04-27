import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import {getColorInput} from './FormTemplate';

export function ColorDisplay() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 128, CANVAS_HEIGHT = 128;
    
    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0); 
    };

    p.draw = () => {
      let colorInput = getColorInput();
      p.background(colorInput);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorDisplay