import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

let barValue = 0, isButtonClicked = false;
let clickedKey = 'a';
let canvasWidth = 0, canvasHeight = 0;
let isTouched = false;


export function OperateGuiControl() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 100;
    let barX = 0;

    p.setup = () => {
      p.frameRate(30);
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.background(0);
      displayControlBar();
      displayButton(10, 50, 30, 30, 'c');
      updateVariables();
      if (p.mouseIsPressed) { mouseContorl() }
    };

    p.mouseClicked = () => {
    }

    function updateVariables() {
      isTouched = false;
      isButtonClicked = false;
      barValue = barX;
      canvasWidth = p.width;
      canvasHeight = p.height;
    }

    function mouseContorl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        barX = p.mouseX;
        isTouched = true;
      }
      if (judgeClicked(10, 50, 30, 30)) {
        isButtonClicked = true;
        clickedKey = 'c';
      }
    }

    function judgeClicked(x: number, y: number, width: number, height: number) {
      return (x < p.mouseX && p.mouseX < x + width && y < p.mouseY && p.mouseY < y + height);
    }

    function displayControlBar() {
      p.rect(barX, 10, 10, 30);
    }

    function displayButton(x: number, y: number, width: number, height: number, key: string) {
      p.rect(x, y, width, height);
      p.fill(0);
      p.text(key, 10 + p.textSize(), 50 + p.textSize());
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnBarValue() { return [barValue, canvasWidth]; }
export function ReturnIsTouchedGui() { return isTouched; }
export function ReturnIsButtonClicked() { return isButtonClicked; }
export function ReturnClickedKey() { return clickedKey; }

export default OperateGuiControl