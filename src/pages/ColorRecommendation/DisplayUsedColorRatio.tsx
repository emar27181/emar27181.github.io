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
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    let backGroundColor = p.color(0, 0, 0, 255);
    let canvasWidth = 0, canvasHeight = 0;
    //let colorsAmount: Array<ColorAmount> = new ColorAmount(p.color(0,0,0), 1);
    let colorsAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backGroundColor);
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), SPLIT * SPLIT));
      p.frameRate(1);
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
    }

    p.keyTyped = () => {
      if (p.key === "c") {
        calculateColorsAmount();
      }
    }

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

    function resetColorsAmount() {
      //colorsAmount.splice(0, colorsAmount.length);
      colorsAmount = [];
      //colorsAmount.push(new ColorAmount(p.color(0, 0, 0), SPLIT * SPLIT));
      //colorsAmount[0] = new ColorAmount(p.color(0, 0, 0), SPLIT * SPLIT);
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), 0));
    }

    function calculateColorsAmount() {
      resetColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateColorsAmount(color);
          console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }

    function updateColorsAmount(color: p5.Color) {
      //color: 探索対象の色
      for (let i = 0; i < colorsAmount.length; i++) {
        console.log("colorsAmount[" + i + "]");
        //すでに出てきた色であった場合
        if (equalsColor(colorsAmount[i].color, color)) {
          //if (colorsAmount[i].color === color) {
          colorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      colorsAmount[colorsAmount.length] = new ColorAmount(color, 1);
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