import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraColorFilter() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    let x = 100, y = 100, dx = 20, dy = 10;

    p.draw = () => {
      p.image(capture, 0, 0);

      p.fill(255, 0, 0, 100);
      p.rect(0, 0, p.width, p.height);

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraColorFilter