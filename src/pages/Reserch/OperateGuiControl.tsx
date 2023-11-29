import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

let returnValue = 0, canvasWidth = 0, canvasHeight = 0;
let isTouched = false;


export function OperateGuiControl() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 300;
    let barX = 0;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.background(0);
      updateVariables();
      displayControlBar();
      displayButton();
      if (p.mouseIsPressed) { mouseContorl() }
    };

    function updateVariables() {
      isTouched = false;
      returnValue = barX;
      canvasWidth = p.width;
      canvasHeight = p.height;
    }

    function mouseContorl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        barX = p.mouseX;
        isTouched = true;
      }
    }

    function judgeClicked(x1: number, y1: number, x2: number, y2: number) {
      return (x1 < p.mouseX && p.mouseX < x2 && y1 < p.mouseY && p.mouseY < y2);
    }

    function displayControlBar() {
      p.rect(barX, 10, 10, 30);
    }

    function displayButton() {
      p.rect(10, 50, 30, 30);
      p.fill(0);
      p.text("c", 10 + p.textSize(), 50 + p.textSize());
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnBarValue() { return [returnValue, canvasWidth]; }
export function ReturnIsTouchedGui() { return isTouched; }

export default OperateGuiControl