import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function ReturnCameraInfo() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
      getColors();
    };

    let returnX: number, returnY: number, returnColor: number[];
    let i = 0;

    p.draw = () => {
      p.image(capture, 0, 0);
      //if (++i === 1) { getColors(); }
      getColors();
    };

    function getColors() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          p.get(i, j)
          console.log(p.get(i, j));
        }
      }
    }

    class ColorInfo {
      x: number;
      y: number;
      color: number[];

      constructor(x: number, y: number, color: number[]) {
        this.x = x;
        this.y = y;
        this.color = color;
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ReturnCameraInfo