import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';
import p5 from 'p5';
import { ReturnCanvasSize } from './Canvas';


const SPLIT = 100;
let colorsInfo: Array<ColorInfo> = [];
let canvasColors: p5.Color[][] = [];
for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

export function ReturnCameraInfo() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;
    const DIV_VALUE = 100;
    let isLooped = true;

    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }

    p.setup = () => {
      //p.createCanvas(256, 256);
      p.createCanvas(640, 480);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
    };

    p.draw = () => {

      if (isLooped) {
        getCanvasColors();
        canvasSize = ReturnCanvasSize();
        canvasWidth = canvasSize[0];
        canvasHeight = canvasSize[1];
        p.image(capture, 0, 0);
        if (p.keyIsPressed && p.key === 'n') {
          p.saveCanvas('saveCameraImage', 'png');
          getColors();
          isLooped = false;
        }
      }
    };

    function getCanvasColors() {
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          canvasColors[i][j] = p.color(p.get(p.width / SPLIT * i, p.height / SPLIT * j));
          //console.log(canvasColors[i][j]);
        }
      }
    }

    function getColors() {
      let indexNum = 0;
      let intervalLength = p.width / DIV_VALUE;
      //let ratioX = canvasWidth / p.width; //
      let ratioX = 1 / canvasWidth; //敢えてキャンバスの左端に色を集める
      //let ratioY = canvasHeight / p.height;
      let ratioY = 1 / canvasHeight;
      for (let i = 0; i < DIV_VALUE; i++) {
        for (let j = 0; j < DIV_VALUE; j++) {
          let x = p.width * (i / DIV_VALUE);
          let y = p.height * (j / DIV_VALUE);
          colorsInfo[indexNum++] = new ColorInfo(ratioX * x, ratioY * y, p.get(x, y));
        }
      }
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}


export class ColorInfo {
  x: number;
  y: number;
  color: number[];

  constructor(x: number, y: number, color: number[]) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
export function ReturnColorsInfo() { return colorsInfo; }
export function ReturnCameraColors() { return canvasColors; }

export default ReturnCameraInfo
