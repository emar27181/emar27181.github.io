import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraColorBall() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
      //p.frameRate(1);
    };

    let x = 100, y = 100, dx = 20, dy = 10;

    p.draw = () => {

      p.image(capture, p.width - 1, p.height - 1);

      let getColor = p.get(p.width - 1, p.height - 1);
      console.log(getColor);
      p.fill(getColor);

      x += dx;
      y += dy;
      if (x < 0 || x > p.width) { dx = -dx; }
      if (y < 0 || y > p.height) { dy = -dy; }


      p.ellipse(x, y, 30, 30);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraColorBall