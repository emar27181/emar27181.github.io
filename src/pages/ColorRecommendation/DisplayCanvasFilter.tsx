import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { ReturnCanvasColors } from '../Reserch/Canvas';
import React from 'react';
import p5 from 'p5';

export function DisplayCanvasFilter() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;

    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }

    p.setup = () => {
      p.createCanvas(200, 200);
      p.background(0);
    };

    p.draw = () => {
      if (p.frameCount % 3 === 0) { displayCanvas(); }
      updateVariables();
    };

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
    }

    function displayCanvas() {

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          //canvasColors[i][j] = p.color(0, 0, 0);
          p.fill(canvasColors[i][j]);
          p.rect(i, j, p.width / SPLIT, p.height / SPLIT);
        }
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayCanvasFilter