import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import { ReturnDrawingWeight } from './Canvas';

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
      p.createCanvas(DISPLAY_RATE * window.innerWidth / 3, DISPLAY_RATE * window.innerWidth / 6);
      //p.createCanvas(200, 100);
      p.background(0);
      p.textSize(0.1 * p.width);
    };

    p.draw = () => {
      p.fill(255);
      p.background(0);
      displayControlBar();

      //displayButton(p.width / 20, p.width / 4, p.width * 3 / 20, p.width * 3 / 20, 'c');
      displayButton(p.width / 4, p.width / 4, p.width * 3 / 20, p.width * 3 / 20, 'e');
      displayButton(p.width * 9 / 20, p.width / 4, p.width * 3 / 20, p.width * 3 / 20, 's');
      //displayButton(10, 50, 30, 30, 'c');
      //displayButton(50, 50, 30, 30, 'e');
      updateVariables();
      if (p.mouseIsPressed) { mouseContorl() }
    };

    p.mouseClicked = () => {
    }

    function updateVariables() {
      isTouched = false;
      isButtonClicked = false;
      barValue = barX;
      barX = ReturnDrawingWeight();
      canvasWidth = p.width;
      canvasHeight = p.height;
    }

    function mouseContorl() {
      if (judgeClicked(0, 0, p.width, p.width * 3 / 20)) {
        //if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        barX = p.mouseX;
        isTouched = true;
      }
      /*
      if (judgeClicked(p.width / 20, p.width / 4, p.width * 3 / 20, p.width * 3 / 20)) {
        //if (judgeClicked(10, 50, 30, 30)) {
        isButtonClicked = true;
        clickedKey = 'c';
      }
      */
      if (judgeClicked(p.width / 4, p.width / 4, p.width * 3 / 20, p.width * 3 / 20)) {
        //if (judgeClicked(50, 50, 30, 30)) {
        isButtonClicked = true;
        clickedKey = 'e';
      }
      if (judgeClicked(p.width * 9 / 20, p.width / 4, p.width * 3 / 20, p.width * 3 / 20)) {
        //if (judgeClicked(50, 50, 30, 30)) {
        isButtonClicked = true;
        clickedKey = 's';
      }
    }

    function judgeClicked(x: number, y: number, width: number, height: number) {
      return (x < p.mouseX && p.mouseX < x + width && y < p.mouseY && p.mouseY < y + height);
    }

    function displayControlBar() {
      p.rect(barX, p.width / 20, p.width / 20, p.width * 3 / 20);
      //p.rect(barX, 10, 10, 30);
    }

    function displayButton(x: number, y: number, width: number, height: number, key: string) {
      p.fill(255);
      p.rect(x, y, width, height);
      p.fill(0);
      p.text(key, x + p.textSize() / 2, y + p.textSize());
      //p.text(key, x + p.textSize(), y + p.textSize());
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