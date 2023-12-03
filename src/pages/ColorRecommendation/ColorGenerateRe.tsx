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
      p.createCanvas(200, 300);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      displayColors();
      displayHueBar();
    };

    function displayColors() {
      p.rect(0, 0, p.width, p.width);
    }

    function displayHueBar() {
      p.rect(0, p.width + 10, p.width, 20);
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorGanerateRe