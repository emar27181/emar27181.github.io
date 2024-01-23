import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const SPLIT = 5
let squareColors: number[][] = [];
export let figureNumber = 1;
for (let i = 0; i < SPLIT; i++) {
  squareColors[i] = [];
  for (let j = 0; j < SPLIT; j++) {
    squareColors[i][j] = 0;
  }
}

export function FlipGame() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      drawLines();
      drawSquareColors();
    };

    p.mouseClicked = () => {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        flipColor();
      }
    }

    p.keyTyped = () => {
      if (p.key === "1") { figureNumber = 1; }
      else if (p.key === "2") { figureNumber = 2; }
      else if (p.key === "3") { figureNumber = 3; }
    }

    function drawSquareColors() {
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          if (squareColors[i][j] === 0) { p.fill(0) }
          else if (squareColors[i][j] === 1) { p.fill(255) }

          let x = i * p.width / SPLIT;
          let y = j * p.height / SPLIT;
          p.rect(x, y, p.width / SPLIT, p.height / SPLIT);
        }
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
            flipFigure(i, j);
          }
        }
      }
    }

    function flipFigure(i: number, j: number) {

      //L字反転
      if (figureNumber === 1) {
        squareColors[i][j] = (squareColors[i][j] + 1) % 2;
        squareColors[i - 1][j + 1] = (squareColors[i - 1][j + 1] + 1) % 2;
        squareColors[i - 1][j] = (squareColors[i - 1][j] + 1) % 2;
      }

      //T字反転
      else if (figureNumber === 2) {
        squareColors[i][j] = (squareColors[i][j] + 1) % 2;
        squareColors[i - 1][j] = (squareColors[i - 1][j] + 1) % 2;
        squareColors[i + 1][j] = (squareColors[i + 1][j] + 1) % 2;
        squareColors[i][j + 1] = (squareColors[i][j + 1] + 1) % 2;
      }

    }

    function drawLines() {
      p.stroke(150);
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