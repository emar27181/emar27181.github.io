import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnHue, ReturnDrawingWeight, ReturnIsRandomMove, ReturnBackgroundAlpha, ReturnAlpha, ReturnFigureMode } from './Canvas';

export function DisplayDrawingInfo() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 100, CANVAS_HEIGHT = CANVAS_WIDTH;
    let hue = ReturnHue();
    let drawingWeight = ReturnDrawingWeight();
    let isRandomMove = ReturnIsRandomMove();
    let alpha = ReturnAlpha();
    let backgroundAlpha = ReturnBackgroundAlpha();
    let figureMode = ReturnFigureMode();

    p.setup = () => {
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.createCanvas(CANVAS_WIDTH, p.windowHeight / 2);
      p.noStroke();
    };

    p.draw = () => {
      p.background(80);
      hue = ReturnHue();
      drawingWeight = ReturnDrawingWeight();
      isRandomMove = ReturnIsRandomMove();
      alpha = ReturnAlpha();
      backgroundAlpha = ReturnBackgroundAlpha();
      figureMode = ReturnFigureMode();
      p.fill(0);
      p.text("RandomMove: \n" + isRandomMove + "\nalpha: " + p.round(alpha) +
        "\nbackgroundAlpha: \n" + p.round(backgroundAlpha) + "\nfigure: " + figureMode,
        0, 20);
      p.fill(hue, 100, 100, 100);
      //p.ellipse(p.width / 2, p.height - 50, drawingWeight);
      displayFigure(p.width / 2, p.height - 50, drawingWeight);
    };

    function displayFigure(x: number, y: number, r: number) {

      switch (figureMode) {
        case "ellipse":
          p.ellipse(x, y, r, r);
          break;

        case "rect": 1
          p.rect(x, y, r);
          break;

        case "triangle":
          p.triangle(x, y, x - r / 2, y + r, x + r / 2, y + r);

        default:
          console.error("Invalid figure mode");
          break;
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayDrawingInfo