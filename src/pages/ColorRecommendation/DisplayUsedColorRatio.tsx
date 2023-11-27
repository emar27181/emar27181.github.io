import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasColors } from '../Reserch/Canvas';
import p5 from 'p5';

export function DisplayUsedColorRatio() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;
    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

    /*
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    */


    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };


    p.draw = () => {
      p.fill(255);
      //p.ellipse(p.width / 2, p.height / 2, 100, 100);
      canvasColors = ReturnCanvasColors();
      //console.log("(" + p.red(canvasColors[0][0]) + "," + p.green(canvasColors[0][0]) + "," + p.blue(canvasColors[0][0]) + ")");
      //console.log(canvasColors[0][0]);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorRatio