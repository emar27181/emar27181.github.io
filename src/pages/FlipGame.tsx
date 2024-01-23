import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const SPLIT = 5

export function FlipGame() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      drawLines();
    };

    p.mouseClicked = () => {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        flipColor();
      }
    }

    function flipColor() {
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let x1 = i * p.width / SPLIT;
          let y1 = j * p.height / SPLIT;
          let x2 = (i + 1) * p.width / SPLIT;
          let y2 = (j + 1) * p.height / SPLIT;

          if (x1 < p.mouseX && p.mouseX < x2 && y1 < p.mouseY && p.mouseY < y2) {
            p.fill(255);
            p.rect(x1, y1, p.width / SPLIT, p.height / SPLIT);
            //console.log("(" + i + "," + j + "): = (" + p.round(x1) + "," + p.round(y1) + "," + p.round(x2) + "," + p.round(y2) + ")");
          }
        }
      }
    }

    function drawLines() {
      p.stroke(255);
      //格子状の線
      for (let i = 0; i < SPLIT; i++) {
        p.line(i * p.width / SPLIT, 0, i * p.width / SPLIT, p.height);
        p.line(0, i * p.height / SPLIT, p.width, i * p.height / SPLIT);
      }
      //外枠の線
      p.noFill();
      p.rect(0, 0, p.width, p.height);

    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default FlipGame