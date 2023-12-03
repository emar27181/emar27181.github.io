import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from './Canvas';
import p5 from 'p5'
import photoImage0 from "../../assets/IMG_9563.jpg"
import photoImage1 from "../../assets/IMG_9675.png"

let photoImage: string[] = [];
photoImage.push(photoImage0);
photoImage.push(photoImage1);

//const SPLIT = 100;
//let colorsInfo: Array<ColorInfo> = [];
//let isGetColors = false;
//let canvasColors: p5.Color[][] = [];
//for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

export function DisplayImage(loadNumber: number) {
  const sketch = (p: P5CanvasInstance) => {


    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const DIV_VALUE = 100;
    let img: p5.Image;
    /*
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    */

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

      /*
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
      */
    };

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayImage