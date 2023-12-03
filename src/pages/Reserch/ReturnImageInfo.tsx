import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from './Canvas';
import p5 from 'p5'
import photoImage0 from "../../assets/IMG_9563.png"
import photoImage1 from "../../assets/IMG_9675.png"

let photoImage: string[] = [];
photoImage.push(photoImage0);
photoImage.push(photoImage1);

const SPLIT = 100;
let colorsInfo: Array<ColorInfo> = [];
let isGetColors = false;
let canvasColors: p5.Color[][] = [];
for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

export function ReturnImageInfo(loadNumber: number) {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const DIV_VALUE = 100;
    let img: p5.Image;
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }

    p.preload = () => {
      // loadNumberに応じて読み込む画像を切り替え
      for (let i = 0; i < photoImage.length; i++) {
        if (i === loadNumber) {
          img = p.loadImage(photoImage[i]);
        }
      }
    }

    p.setup = () => {
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.createCanvas(713, 713);
      p.image(img, 0, 0);
    };

    p.draw = () => {

      if (isGetColors) {

      }
      else {
        getCanvasColors();
        canvasSize = ReturnCanvasSize();
        canvasWidth = canvasSize[0];
        canvasHeight = canvasSize[1];
        getColors();
        isGetColors = true;
      }
    };

    function getCanvasColors() {
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          canvasColors[i][j] = p.color(p.get(p.width / SPLIT * i, p.height / SPLIT * j));
          //console.log(canvasColors[i][j]);
        }
      }
      console.log("画像の色データの取得が完了しました(loadNumber = " + loadNumber + ")");
    }

    function getColors() {
      let indexNum = 0;
      let intervalLength = p.width / DIV_VALUE;
      //let ratioX = canvasWidth / p.width;
      //let ratioY = canvasHeight / p.height;
      let ratioX = 1 / canvasWidth;
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

export function ReturnImageColorsInfo() { return colorsInfo; }
export function ReturnImageColors() { return canvasColors; }

export default ReturnImageInfo