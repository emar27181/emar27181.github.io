import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import React from 'react';
import p5 from 'p5';

export function DisplayCanvasFilter() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;
    let canvasWidth = 0, canvasHeight = 0;
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }

    p.setup = () => {
      p.createCanvas(200, 200);
      p.background(255);
      p.noStroke();
    };

    p.draw = () => {
      if (p.frameCount % 3 === 0) { displayCanvas(); }
      updateVariables();
    };

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
    }

    function displayCanvas() {

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          p.fill(canvasColors[i][j]);
          p.rect(p.width / SPLIT * i, p.height / SPLIT * j, p.width / SPLIT, p.height / SPLIT);
          //p.rect((canvasWidth / SPLIT * i) * (p.width / canvasWidth), (canvasHeight / SPLIT * j) * (p.width / canvasHeight), p.width / SPLIT, p.height / SPLIT);
        }
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayCanvasFilter