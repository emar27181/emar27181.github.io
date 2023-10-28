import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityX, ReturnGravityY, ReturnIsFixedGravity, ReturnIsMouseGravity, ReturnMouseXY } from './Canvas';
//import { TestHandsfree, ReturnTrackingData, ReturnTrackingCanvasSize } from '../TestHandsfree';
import { ReturnTrackingInfo, ReturnTrackingData, ReturnTrackingCanvasSize } from './ReturnTrackingInfo';


let trackingData = ReturnTrackingData();
let trackingX1 = trackingData[0]; //人差し指のx座標
let trackingY1 = trackingData[1]; //人差し指のy座標
let trackingX2 = trackingData[2]; //親指のx座標
let trackingY2 = trackingData[3]; //親指のy座標

let trackingX3 = trackingData[4]; //人差し指のx座標
let trackingY3 = trackingData[5]; //人差し指のy座標
let trackingX4 = trackingData[6]; //親指のx座標
let trackingY4 = trackingData[7]; //親指のy座標

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

      if (isTrackingGravity(trackingX1, trackingY1, trackingX2, trackingY2)) { p.fill(255, 0, 0); }
      else { p.fill(0, 255, 0); }
      DrawGravityPlace(trackingX1, trackingY1, 300, 150);
      DrawGravityPlace(trackingX2, trackingY2, 300, 150);
      if (isTrackingGravity(trackingX3, trackingY3, trackingX4, trackingY4)) { p.fill(255, 0, 0); }
      else { p.fill(0, 255, 0); }
      DrawGravityPlace(trackingX3, trackingY3, 300, 150);
      DrawGravityPlace(trackingX4, trackingY4, 300, 150);
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
      trackingX3 = trackingData[4];
      trackingY3 = trackingData[5];
      trackingX4 = trackingData[6];
      trackingY4 = trackingData[7];
      trackingCanvasSize = ReturnCanvasSize();
      trackingCanvasWidth = trackingCanvasSize[0];
      trackingCanvasHeight = trackingCanvasSize[1];
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function isTrackingGravity(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0) { return false; }
  let distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  return (distance < 10)
}

export default DisplayGravityPlace