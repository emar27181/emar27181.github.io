import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import p5 from 'p5';
import { ReturnIsDesktop } from '../../App';
import { ReturnCameraColors } from '../Reserch/ReturnCameraInfo';
import { ReturnImageColors } from '../Reserch/ReturnImageInfo';

export function DisplayUsedColorRatio() {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100, CANVAS_WIDTH = 40;
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
      p.colorMode(p.HSL);
      let rate = 0.65;
      if (ReturnIsDesktop()) { p.createCanvas(CANVAS_WIDTH, rate * p.windowWidth / 2); }
      else { p.createCanvas(CANVAS_WIDTH, rate * p.windowWidth); }
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backGroundColor);
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), SPLIT * SPLIT));
      p.frameRate(1);
    };


    p.draw = () => {
      p.colorMode(p.HSL);
      updateVariables();
      //displayChromaticColors();
    }

    p.keyTyped = () => {
    }

    p.mouseClicked = () => {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        calculateColorsAmount();
        //確認用出力
        for (let i = 0; i < colorsAmount.length; i++) { colorsAmount[i].display(); }
        displayColorsAmountRate();
      }
    }


    function displayColorsAmountRate() {
      let y = 0;
      let hueRange = 15;
      p.noStroke();
      for (let i = 0; i < 360; i += hueRange) {
        for (let j = 0; j < colorsAmount.length; j++) {
          let hue = p.hue(colorsAmount[j].color);
          if (i <= hue && hue < i + hueRange) {
            p.fill(colorsAmount[j].color);
            p.rect(0, y, p.width / 2, p.height * (colorsAmount[j].amount / (SPLIT * SPLIT)));
            y += p.height * (colorsAmount[j].amount / (SPLIT * SPLIT));
          }
        }
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
      colorsAmount = [];
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), 0));
    }

    function calculateColorsAmount() {
      resetColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateColorsAmount(color);
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      //console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }

    function updateColorsAmount(color: p5.Color) {
      //color: 探索対象の色
      p.colorMode(p.RGB);
      //1の位を四捨五入した値に変更
      let placeNumber = 10; // place/10の位を四捨五入
      color = p.color(p.round(p.red(color) / placeNumber) * placeNumber, p.round(p.green(color) / placeNumber) * placeNumber, p.round(p.blue(color) / placeNumber) * placeNumber);
      for (let i = 0; i < colorsAmount.length; i++) {
        //すでに出てきた色であった場合
        if (equalsColor(colorsAmount[i].color, color)) {
          colorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      colorsAmount[colorsAmount.length] = new ColorAmount(color, 1);
    }

    function updateVariables() {
      //canvasColors = ReturnCanvasColors();
      //canvasColors = ReturnCameraColors();
      canvasColors = ReturnImageColors();
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