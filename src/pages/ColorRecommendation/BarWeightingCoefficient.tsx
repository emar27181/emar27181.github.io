import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { THIS_WEIGHT } from './CalculateRecommendColors';
import React from 'react';

export function BarWeightingCoefficient() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    
    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0); 
    };

    p.draw = () => {
      p.fill(255); 
      p.stroke(0);
      p.text(THIS_WEIGHT, p.width/2, p.height / 2 );
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BarWeightingCoefficient