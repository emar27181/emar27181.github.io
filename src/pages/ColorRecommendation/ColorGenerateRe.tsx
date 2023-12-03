import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

let red = 255, green = 0, blue = 0, alpha = 255, h = 0, s = 50, b = 50;
let returnColor: p5.Color;
let isTouchedColorGenerate = false;

export function ColorGanerateRe() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(300, 300);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.ellipse(p.width / 2, p.height / 2, 100);
    };

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorGanerateRe