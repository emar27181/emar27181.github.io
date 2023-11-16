import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityX, ReturnGravityY, ReturnIsFixedGravity, ReturnIsMouseGravity, ReturnMouseXY } from './Canvas';
//import { TestHandsfree, ReturnTrackingData, ReturnTrackingCanvasSize } from '../TestHandsfree';
import { ReturnTrackingInfo, ReturnTrackingData, ReturnTrackingCanvasSize } from './ReturnTrackingInfo';
import { ReturnIsDesktop } from '../../App';
import { ReturnIsCanvasHome } from '../../views/CanvasHome';

let trackingData: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0]];
let trackingX1 = trackingData[0][0]; //人差し指のx座標
let trackingY1 = trackingData[0][1]; //人差し指のy座標
let trackingX2 = trackingData[0][2]; //親指のx座標
let trackingY2 = trackingData[0][3]; //親指のy座標
let trackingX3 = trackingData[1][0]; //人差し指のx座標
let trackingY3 = trackingData[1][1]; //人差し指のy座標
let trackingX4 = trackingData[1][2]; //親指のx座標
let trackingY4 = trackingData[1][3]; //親指のy座標

let gravityMouseX = 0, gravityMouseY = 0, isTouched = false;

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
      //p.createCanvas(canvasWidth, canvasHeight);
      //p.createCanvas(p.windowHeight / 2, p.windowHeight / 2);
      let rate = 0.65;
      if (ReturnIsCanvasHome()) { p.createCanvas(200, 200) }
      else if (ReturnIsDesktop()) { p.createCanvas(rate * p.windowWidth / 2, rate * p.windowWidth / 2); }
      else { p.createCanvas(rate * p.windowWidth, rate * p.windowWidth); }
      //let rate = 0.35;
      //p.createCanvas(rate * p.windowWidth, rate * p.windowWidth);
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
      DrawGravityPlace(trackingX2, trackingY2, canvasWidth, canvasHeight);
      DrawGravityPlace(trackingX4, trackingY4, canvasWidth, canvasHeight);
      DrawGravityPlace(trackingData[0][6], trackingData[0][7], canvasWidth, canvasHeight);
      DrawGravityPlace(trackingData[0][8], trackingData[0][9], canvasWidth, canvasHeight);
      DrawGravityPlace(trackingData[1][6], trackingData[1][7], canvasWidth, canvasHeight);
      DrawGravityPlace(trackingData[1][8], trackingData[1][9], canvasWidth, canvasHeight);

      setTrackingColor(trackingX1, trackingY1, trackingX2, trackingY2);
      DrawGravityPlace(trackingX1, trackingY1, canvasWidth, canvasHeight);
      setTrackingColor(trackingX3, trackingY3, trackingX4, trackingY4);
      DrawGravityPlace(trackingX3, trackingY3, canvasWidth, canvasHeight);
      setTrackingColor(trackingData[0][2], trackingData[0][3], trackingData[0][4], trackingData[0][5]);
      DrawGravityPlace(trackingData[0][4], trackingData[0][5], canvasWidth, canvasHeight);
      setTrackingColor(trackingData[1][2], trackingData[1][3], trackingData[1][4], trackingData[1][5]);
      DrawGravityPlace(trackingData[1][4], trackingData[1][5], canvasWidth, canvasHeight);
    };

    function setTrackingColor(x1: number, y1: number, x2: number, y2: number) {
      if (judgeDistance(x1, y1, x2, y2)) { p.fill(255, 0, 0); }
      else { p.fill(0, 255, 0); }
    }

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
      if (ReturnTrackingData().length === 2) { trackingData = ReturnTrackingData(); }
      trackingX1 = trackingData[0][0]; //人差し指のx座標
      trackingY1 = trackingData[0][1]; //人差し指のy座標
      trackingX2 = trackingData[0][2]; //親指のx座標
      trackingY2 = trackingData[0][3]; //親指のy座標
      trackingX3 = trackingData[1][0]; //人差し指のx座標
      trackingY3 = trackingData[1][1]; //人差し指のy座標
      trackingX4 = trackingData[1][2]; //親指のx座標
      trackingY4 = trackingData[1][3]; //親指のy座標
      trackingCanvasSize = ReturnCanvasSize();
      trackingCanvasWidth = trackingCanvasSize[0];
      trackingCanvasHeight = trackingCanvasSize[1];
      if (0 <= p.mouseX && p.mouseX <= p.width && 0 <= p.mouseY && p.mouseY <= p.height) {
        gravityMouseX = p.mouseX;
        gravityMouseY = p.mouseY;
        if (p.mouseIsPressed) { isTouched = true; }
        else { isTouched = false; }
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function judgeDistance(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0) { return false; }
  let distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  return (distance < 20)
}

export function ReturnTouchedGravityX() { return gravityMouseX }
export function ReturnTouchedGravityY() { return gravityMouseY }
export function ReturnIsTouched() { return isTouched; }

export default DisplayGravityPlace