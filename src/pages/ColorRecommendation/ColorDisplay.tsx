import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
//import {getColorInput} from './FormTemplate';
import { getColorCode, getHue, getSaturation, getValue } from './Compromise';

export function ColorDisplay() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 200;
    let hue = 0, saturation = 50, value = 50;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.colorMode(p.HSB, 360, 100, 100);
    };

    p.draw = () => {
      const colorInput = getColorCode();
      const hueInput = getHue();
      const saturationInput = getSaturation();
      const valueInput = getValue();

      if (hueInput != -2) { hue = hueInput; }
      if (saturationInput != -2) { saturation = saturationInput; }
      if (valueInput != -2) { value = valueInput; }

      p.background(hue, saturation, value);
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