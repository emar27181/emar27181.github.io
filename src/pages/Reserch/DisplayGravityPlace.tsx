import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityX, ReturnGravityY, ReturnIsFixedGravity, ReturnIsMouseGravity, ReturnMouseXY } from './Canvas';
//import { TestHandsfree, ReturnTrackingData, ReturnTrackingCanvasSize } from '../TestHandsfree';
import { ReturnTrackingInfo, ReturnTrackingData, ReturnTrackingCanvasSize } from './ReturnTrackingInfo';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let isFixedGravity = ReturnIsFixedGravity();
    let gravityX: number[] = [];
    let gravityY: number[] = [];
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    let mouse = ReturnMouseXY();
    let mouseX = mouse[0];
    let mouseY = mouse[1];
    let isMouseGravity = ReturnIsMouseGravity();

    let trackingData = ReturnTrackingData();
    let trackingX1 = trackingData[0]; //人差し指のx座標
    let trackingY1 = trackingData[1]; //人差し指のy座標
    let trackingX2 = trackingData[2]; //親指のx座標
    let trackingY2 = trackingData[3]; //親指のy座標
    let trackingCanvasSize = ReturnTrackingCanvasSize();
    let trackingCanvasWidth = trackingCanvasSize[0];
    let trackingCanvasHeight = trackingCanvasSize[1];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      //console.log(trackignData);
    };

    p.draw = () => {
      p.background(0);
      UpdateVariables();

      for (let i = 0; i < gravityX.length; i++) {
        setColor(isFixedGravity);
        DrawGravityPlace(gravityX[i], gravityY[i], canvasWidth, canvasHeight);
      }

      setColor(isMouseGravity);
      DrawGravityPlace(mouseX, mouseY, canvasWidth, canvasHeight);

      p.fill(0, 255, 0);
      //console.log("taracingCanvasWidth: " + trackingCanvasWidth + ", trackingCanvasHeight: " + trackingCanvasHeight);
      //DrawGravityPlace(trackingX, trackingY, trackingCanvasWidth, trackingCanvasHeight);
      DrawGravityPlace(trackingX1, trackingY1, 300, 150);
      DrawGravityPlace(trackingX2, trackingY2, 300, 150);
    };

    function setColor(isColor: boolean) {
      if (isColor) { p.fill(255, 0, 0); }
      else { p.fill(255); }
    }

    function DrawGravityPlace(inputX: number, inputY: number, width: number, height: number) {
      let x = inputX * (p.width / width);
      let y = inputY * (p.height / height);
      p.ellipse(x, y, 5);
    }

    function UpdateVariables() {
      isFixedGravity = ReturnIsFixedGravity();
      gravityX = ReturnGravityX();
      gravityY = ReturnGravityY();
      canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
      mouse = ReturnMouseXY();
      mouseX = mouse[0];
      mouseY = mouse[1];
      isMouseGravity = ReturnIsMouseGravity();
      trackingData = ReturnTrackingData();
      trackingX1 = trackingData[0];
      trackingY1 = trackingData[1];
      trackingX2 = trackingData[2];
      trackingY2 = trackingData[3];
      trackingCanvasSize = ReturnCanvasSize();
      trackingCanvasWidth = trackingCanvasSize[0];
      trackingCanvasHeight = trackingCanvasSize[1];
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace