import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from '../Reserch/Canvas';
import ColorTestData from '../../data/colorTestData.json'

export function DisplayColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = ReturnCanvasSize();
    let jsonData = ColorTestData;
    let hue = jsonData[0].hue, saturation = jsonData[0].saturation, lightness = jsonData[0].lightness;

    p.setup = () => {
      let rate = 0.65;
      p.createCanvas(rate * p.windowWidth / 2, 20);
      p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0);
    };


    p.draw = () => {
      p.colorMode(p.HSL, 360, 100, 100);
      p.background(hue, saturation, lightness);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayColorRatio