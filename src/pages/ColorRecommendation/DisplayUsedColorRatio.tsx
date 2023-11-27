import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import p5 from 'p5';

export function DisplayUsedColorRatio() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;
    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    let backGroundColor = p.color(0, 0, 0, 255);
    let canvasWidth = 0, canvasHeight = 0;

    /*
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    */


    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backGroundColor);
    };


    p.draw = () => {
      p.fill(255);
      updateVariables();
      calculateChromaticColors();

      //console.log("(canvasWidth, canvasHeight) = (" + canvasWidth + ", " + canvasHeight + ")");
      //console.log("width, height = (" + p.width + ", " + p.height + ")");
    };

    function calculateChromaticColors() {
      let rateWidth = p.width / canvasWidth;
      let rateHeight = p.height / canvasHeight;

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let r = p.red(canvasColors[i][j]);
          let g = p.green(canvasColors[i][j]);
          let b = p.blue(canvasColors[i][j]);
          if (!(r == 0 && g == 0 && b == 0)) {
            //console.log("(canvasWidth, canvasHeight) = (" + canvasWidth + ", " + canvasHeight + ")");
            //console.log("width, height = (" + p.width + ", " + p.height + ")");
            p.noStroke();
            p.fill(canvasColors[i][j]);
            //p.rect(canvasWidth / p.width * i, canvasHeight / p.height * j, p.width / SPLIT, p.height / SPLIT);
            p.rect(canvasWidth / SPLIT * i * rateWidth, canvasHeight / SPLIT * j * rateHeight, p.width / SPLIT, p.height / SPLIT);
          }
        }
      }
    }

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorRatio