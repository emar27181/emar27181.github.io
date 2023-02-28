import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraMosaicArt() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    let x = 0, y = 0, dx = 10, dy = 5;

    p.draw = () => {
      let img = capture.get();
      p.image(img, 0, 0);

      for (let i = 0; i < p.width; i += 10) {
        for (let j = 0; j < p.height; j += 10) {
          let getColor = p.get(i, j);
          let v = getColor[0];
          if (getColor[1] > v) { v = getColor[1]; }
          if (getColor[2] > v) { v = getColor[2]; }

          if (v > 128) {
            p.fill(255);
            p.rect(i, j, 10, 10);
            p.fill(0);
            p.text("○", i, j);
          }
          else {
            p.fill(255);
            p.rect(i, j, 10, 10);
            p.fill(0);
            p.text("●", i, j);
          }

        }
      }

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraMosaicArt