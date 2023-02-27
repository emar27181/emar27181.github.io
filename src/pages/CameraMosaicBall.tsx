import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraMosaicBall() {
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
      let img = capture.get();
      p.image(img, 0, 0);

      for (let i = 0; i < p.width; i += 10) {
        for (let j = 0; j < p.height; j += 10) {
          let getColor = p.get(i, j);
          let v = getColor[0];
          if(getColor[1] > v){v = getColor[1];}
          if(getColor[2] > v){v = getColor[2];}

          if(v > 128){ p.fill(255);}
          else{ p.fill(0);}
          //p.fill(getColor);
          //p.ellipse(i, j, 15, 15);
          p.rect(i, j, 10,  10);
        }
      }

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraMosaicBall