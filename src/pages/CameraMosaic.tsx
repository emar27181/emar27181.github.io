import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraMosaic() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    let x = 100, y = 100, dx = 20, dy = 10;
    let splitSize = 8;

    p.draw = () => {
      let img = capture.get();
      p.image(img, 0, 0);


      if (p.mouseIsPressed) {
        if (splitSize === 512) { splitSize = 8; }
        else { splitSize *= 2;
        }
      }

      for (let i = 0; i < p.width; i += splitSize) {
        for (let j = 0; j < p.height; j += splitSize) {
          let getColor = p.get(i, j);

          p.fill(getColor);
          //p.ellipse(i, j, 15, 15);
          p.rect(i, j, splitSize, splitSize);
        }
      }

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraMosaic