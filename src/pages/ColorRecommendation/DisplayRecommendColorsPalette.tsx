import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';

export function DisplayRecommendColorsPalette() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 50);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.ellipse(p.width / 2, p.height / 2, 100, 100);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayRecommendColorsPalette