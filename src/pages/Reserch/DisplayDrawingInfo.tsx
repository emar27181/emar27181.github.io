import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnHue, ReturnDrawingWeight, ReturnIsRandomMove, ReturnBackgroundAlpha, ReturnAlpha, ReturnFigureMode, ReturnClickMode, ReturnIsFixedGravity, ReturnIsMovedGravity, ReturnIsMovedStraight, ReturnIsBackground, ReturnMouseColor, ReturnStandardDeviationLimit, ReturnResistanceValue, ReturnIsTracking, ReturnDrawingColor, ReturnIsRepulsion } from './Canvas';
import { ReturnTrackingInfo, ReturnTrackingData, ReturnTrackingCanvasSize } from './ReturnTrackingInfo';
import { ReturnIsDesktop } from '../../App';

export function DisplayDrawingInfo() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 100, CANVAS_HEIGHT = CANVAS_WIDTH;
    let hue = ReturnHue();
    let drawingWeight = ReturnDrawingWeight();
    let isRandomMove = ReturnIsRandomMove();
    let alpha = ReturnAlpha();
    let backgroundAlpha = ReturnBackgroundAlpha();
    let figureMode = ReturnFigureMode();
    let clickMode = ReturnClickMode();
    let isFixedGravity = ReturnIsFixedGravity();
    let isMovedGravity = ReturnIsMovedGravity();
    let isMovedStraight = ReturnIsMovedStraight();
    let isBackground = ReturnIsBackground();
    let mouseColor = ReturnMouseColor();
    let standardDeviationLimit = ReturnStandardDeviationLimit();
    let resistanceValue = ReturnResistanceValue();
    let trackingData: number[][];
    let isTrackingGravity = ReturnIsTracking();
    let drawingColor = ReturnDrawingColor();
    let isRepulsion = ReturnIsRepulsion();


    p.setup = () => {
      p.colorMode(p.HSB, 360, 100, 100, 100);
      //p.createCanvas(CANVAS_WIDTH, p.windowHeight / 2);

      let rate = 0.5;
      if (ReturnIsDesktop()) { p.createCanvas(rate / 3 * p.windowWidth / 2, rate * p.windowWidth / 2); }
      else { p.createCanvas(rate / 3 * p.windowWidth, rate * p.windowWidth); }
      //p.createCanvas(rate / 3 * p.windowWidth, rate * p.windowWidth);
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
      clickMode = ReturnClickMode();
      isFixedGravity = ReturnIsFixedGravity();
      isMovedGravity = ReturnIsMovedGravity();
      isMovedStraight = ReturnIsMovedStraight();
      isBackground = ReturnIsBackground();
      mouseColor = ReturnMouseColor();
      standardDeviationLimit = ReturnStandardDeviationLimit();
      resistanceValue = ReturnResistanceValue();
      if (ReturnTrackingData().length === 2) { trackingData = ReturnTrackingData(); }
      isTrackingGravity = ReturnIsTracking();
      drawingColor = ReturnDrawingColor();
      isRepulsion = ReturnIsRepulsion();

      p.textSize(0.032 * p.height);
      p.fill(0);
      p.text("RandomMove: \n" + isRandomMove + "\nalpha: " + p.round(alpha) +
        "\nbackgroundAlpha: \n" + p.round(backgroundAlpha) + "\nfigure: " + figureMode +
        "\nclickMode: " + clickMode + "\nisFixedGravity: \n" + isFixedGravity +
        "\nisMovedGravity:\n" + isMovedGravity + "\nisMovedStraight: \n" + isMovedStraight +
        "\nisBackground: \n" + isBackground + "\ncolor: \n(" + mouseColor + ")\n" +
        "SDLimit: " + p.round(standardDeviationLimit) +
        "\nresistance: " + resistanceValue +
        "\nisTrackingGravity: \n" + isTrackingGravity +
        "\nisReplusion: " + isRepulsion
        ,
        0, 20);
      //p.fill(hue, 100, 100, 100);
      p.fill(drawingColor);

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