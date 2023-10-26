import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5'

export function TestDisplayImage() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let img: p5.Image;

    p.preload = () => {
      img = p.loadImage("src/data/saveCanvas-2023-10-23T130343.793.png")
    }

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.image(img, 0, 0);
    };

    p.draw = () => {

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestDisplayImage