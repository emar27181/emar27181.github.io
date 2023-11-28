import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import p5 from 'p5';

export function DisplayUsedColorRatio() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100;
    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    let backGroundColor = p.color(0, 0, 0, 255);
    let canvasWidth = 0, canvasHeight = 0;

    /*
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    */


    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backGroundColor);
    };


    p.draw = () => {
      p.fill(255);
      updateVariables();
      displayChromaticColors();

      //確認用出力
      //console.log(colorsAmount.length);
      //console.log(colorsAmount);
      console.log("--- frameCount=" + p.frameCount + " ------");
      for (let i = 0; i < colorsAmount.length; i++) {
        console.log("colorsAmount[" + i + "] = ");
        colorsAmount[i].display();
      }
    };


    function displayChromaticColors() {
      let rateWidth = p.width / canvasWidth;
      let rateHeight = p.height / canvasHeight;

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let r = p.red(canvasColors[i][j]);
          let g = p.green(canvasColors[i][j]);
          let b = p.blue(canvasColors[i][j]);
          //(i, j)の色が背景色以外だった場合
          if (!(r == 0 && g == 0 && b == 0)) {
            p.noStroke();
            p.fill(canvasColors[i][j]);
            p.rect(canvasWidth / SPLIT * i * rateWidth, canvasHeight / SPLIT * j * rateHeight, p.width / SPLIT, p.height / SPLIT);
            //色の量の更新
            //updateColorsAmount(canvasColors[i][j]);
          }
        }
      }
    }

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
    }
    class ColorAmount {
      color: p5.Color;
      amount: number;

      constructor(color: p5.Color, amount: number) {
        this.color = color;
        this.amount = amount;
      }

      display() {
        console.log("(" + p.red(this.color) + "," + p.green(this.color) + "," + p.blue(this.color) + "): " + this.amount);
      }
    }
  }


  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorRatio