import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';


let colorsInfo: Array<ColorInfo> = [];

export function ReturnCameraInfo() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    p.draw = () => {
      if (p.frameCount <= 100) { p.image(capture, 0, 0); }
      if (p.frameCount === 100) {
        getColors();
        //console.log("colorsInfo: " + colorsInfo)
      }
    };

    function getColors() {
      let indexNum = 0;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          //console.log(p.get(i, j));
          colorsInfo[indexNum++] = new ColorInfo(i, j, p.get(i, j));
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
export function ReturnColorsInfo(){return colorsInfo;}

export default ReturnCameraInfo
