import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from './Canvas';
import p5 from 'p5'
import photoImage0 from "../../assets/IMG_9563.png"
import photoImage1 from "../../assets/IMG_9675.png"
import photoImage2 from "../../assets/NCG255-510x510.jpg"
import photoImage3 from "../../assets/TEST_IMAGE.png"
import photoImage4 from "../../assets/img_1701616372.png"
import photoImage5 from "../../assets/160_10.jpg"
import photoImage6 from "../../assets/160_11.jpg"
import photoImage7 from "../../assets/img_1702279389.png"


let photoImage: string[] = [];
photoImage.push(photoImage0);
photoImage.push(photoImage1);
photoImage.push(photoImage2);
photoImage.push(photoImage3);
photoImage.push(photoImage4);
photoImage.push(photoImage5);
photoImage.push(photoImage6);
photoImage.push(photoImage7);

const SPLIT = 100;
let colorsInfo: Array<ColorInfo> = [];
let isGetColors = false;
let canvasColors: p5.Color[][] = [];
let imagesCanvasColors: any[] = [];
for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

let canvasWidth = 0;
let canvasHeight = 0;

export function ReturnImageInfo(loadNumber: number) {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const DIV_VALUE = 100;
    let img: p5.Image;

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
      p.createCanvas(img.width, img.height);
      canvasWidth = p.width;
      canvasHeight = p.height;
      p.image(img, 0, 0);
    };

    p.draw = () => {

      if (isGetColors) {

      }
      else {
        getCanvasColors();
        imagesCanvasColors[loadNumber] = canvasColors;
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
      let ratioX = 1 / p.width;
      let ratioY = 1 / p.height;
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
//export function ReturnImageColors() { return canvasColors; }
export function ReturnImageColors(loadNumber: number) {
  ReturnImageInfo(loadNumber);
  //return imagesCanvasColors[loadNumber];
  return canvasColors;
}

export default ReturnImageInfo

export function ReturnReturnImageInfoCanvasSize() { return [canvasWidth, canvasHeight]; }