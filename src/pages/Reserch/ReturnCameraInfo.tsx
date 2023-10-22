import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';


let colorsInfo: Array<ColorInfo> = [];

export function ReturnCameraInfo() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;
    const DIV_VALUE = 100;
    let isLooped = true;

    p.setup = () => {
      p.createCanvas(p.windowHeight / 2, p.windowHeight / 2);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    p.draw = () => {

      if (isLooped) {
        p.image(capture, 0, 0);
        if (p.mouseIsPressed) {
          p.saveCanvas('saveCameraImage', 'png');
          getColors();
          isLooped = false;
        }
      }
    };

    function getColors() {
      let indexNum = 0;
      let intervalLength = p.width / DIV_VALUE;
      for (let i = 0; i < DIV_VALUE; i++) {
        for (let j = 0; j < DIV_VALUE; j++) {
          //console.log(p.get(i, j));
          let x = p.width * (i / DIV_VALUE);
          let y = p.height * (j / DIV_VALUE);
          colorsInfo[indexNum++] = new ColorInfo(x, y, p.get(x, y));
        }
      }
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}


export class ColorInfo {
  x: number;
  y: number;
  color: number[];

  constructor(x: number, y: number, color: number[]) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
export function ReturnColorsInfo() { return colorsInfo; }

export default ReturnCameraInfo
