// これはColorGenerate.tsxをCanvasOnlyDraw.tsx用に改良したものである．

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { drawingColor } from '../Reserch/CanvasOnlyDraw';
import Color from 'color';
import { ColorAmount, ReturnColorsAmount } from './DisplayUsedColorRatio';
import { DISPLAY_RATE } from '../../config/constants';
import { SATURATION_LIMIT, LIGHTNESS_UPPER_LIMIT, LIGHTNESS_LOWER_LIMIT, AMOUNT_LIMIT } from './DisplayUsedColorWheel';

let returnColor = [255, 0, 0];
let isTouchedColorGenerate = false;


export function ColorGanerateRe() {
  const sketch = (p: P5CanvasInstance) => {

    let hue = 0;
    let hueBarX = 50;
    const SPLIT = 100;
    let usedColors: Array<p5.Color> = [];
    let colorsAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * window.innerWidth / 3, 1.5 * DISPLAY_RATE * window.innerWidth / 3);
      //p.createCanvas(200, 300);
      p.background(0);
      p.textSize(0.05 * p.width);
      p.frameRate(1);
      //p.textSize(10);
    };

    p.draw = () => {
      updateVariables();
      if (p.mouseIsPressed) { mousePressed(); }
      p.background(0);
      //p.fill(255);

      displayColors();
      displayUsedColorsDot();
      displayDrawingColorDot();
      displayHueBar();
      displayHueBarButton();

      displayDrawingColor();
      displayDrawingColorInfo();

      drawLimitLine();
    };

    function drawLimitLine() {
      const RATE_WIDTH = p.width / 100;
      const RATE_HEIGHT = p.height / 100;
      //console.log(SATURATION_LIMIT, LIGHTNESS_UPPER_LIMIT, LIGHTNESS_LOWER_LIMIT);
      p.stroke(0);
      p.line(SATURATION_LIMIT * RATE_WIDTH, 0, SATURATION_LIMIT * RATE_WIDTH, p.width);
      p.line(0, LIGHTNESS_UPPER_LIMIT * RATE_WIDTH, p.width, LIGHTNESS_UPPER_LIMIT * RATE_WIDTH);
      p.line(0, LIGHTNESS_LOWER_LIMIT * RATE_WIDTH, p.width, LIGHTNESS_LOWER_LIMIT * RATE_WIDTH);
    }


    function displayDrawingColorDot() {
      displayColorsDot(drawingColor, 1, p.color(255), true);
    }

    function displayUsedColorsDot() {
      //const SATURATION_LIMIT = 0;
      for (let i = 0; i < colorsAmount.length; i++) {

        if (p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT) {
          continue;
        }

        if (colorsAmount[i].amount >= AMOUNT_LIMIT) {
          let displayRate = 0.005 * colorsAmount[i].amount;
          //displayColorsDot(colorsAmount[i].color, 1, p.color(0),);
          displayColorsDot(colorsAmount[i].color, 1, p.color(p.hue(colorsAmount[i].color), 50, 50), true);
          //displayColorsDot(colorsAmount[i].color, 1, p.color(colorsAmount[i].color));
        }
      }
    }

    function mousePressed() {
      //色相バーのクリック
      if (0 <= p.mouseX && p.mouseX <= p.width && 1.05 * p.width <= p.mouseY && p.mouseY <= 1.15 * p.width) {
        //if (0 <= p.mouseX && p.mouseX <= p.width && p.width + 10 <= p.mouseY && p.mouseY <= p.width + 30) {
        hueBarX = p.mouseX;
        //hue = hueBarX / p.width * 360;
        returnColor[0] = hueBarX / p.width * 360;
      }
      //明度と彩度による色の表示のクリック
      if (0 <= p.mouseX && p.mouseX <= p.width && 0 <= p.mouseY && p.mouseY <= p.width) {
        setDrawingColor();
      }
      //キャンバスのクリック
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorGenerate = true;
      }
    }

    function updateVariables() {
      //hue = (hueBarX / p.width) * 360;
      isTouchedColorGenerate = false;

      hue = p.hue(drawingColor);
      hueBarX = p.hue(drawingColor) / 360 * p.width;
      colorsAmount = ReturnColorsAmount();
    }

    function setDrawingColor() {
      let x = (p.mouseX / p.width) * 100;
      let y = (p.mouseY / p.width) * 100;
      returnColor = [hue, x, 100 - y];
    }

    function displayDrawingColorInfo() {
      p.noStroke();
      p.fill(255);
      //let color = ReturnDrawingColor();
      let color = drawingColor;

      let text1 = "rgba(" + p.round(p.red(color)) + "," + p.round(p.green(color)) + "," + p.round(p.blue(color)) + "," + p.round(p.alpha(color)) + ")";
      let text2 = "hsl(" + p.round(p.hue(color)) + "," + p.round(p.saturation(color)) + "," + p.round(p.lightness(color)) + ")";
      let text3 = "hsb(" + p.round(p.hue(color)) + "," + p.round(p.saturation(color)) + "," + p.round(p.brightness(color)) + ")";
      let hex = p.hex([p.red(color), p.green(color), p.blue(color)], 2);
      let text4 = ("#" + hex[0] + hex[1] + hex[2]);
      let text5 = ("(h,s,l) = (0~360," + SATURATION_LIMIT + "~100," + LIGHTNESS_LOWER_LIMIT + "~" + LIGHTNESS_UPPER_LIMIT + ")");
      let text6 = "AMOUNT_LIMIT = " + AMOUNT_LIMIT;
      let text = text1 + "\n" + text2 + ", " + text3 + "\n" + text4 + "\n" + text5 + "\n" + text6;
      p.text(text, 0, 1.2 * p.width);
    }

    function displayDrawingColor() {
      p.stroke(255);
      p.fill(drawingColor);
      p.rect(0.85 * p.width, 0.9 * p.height, 0.1 * p.width, 0.1 * p.width);
    }

    function displayColors() {
      p.colorMode(p.HSL);
      //p.colorMode(p.HSB);
      p.noStroke();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          p.fill(hue, i, 100 - j);
          p.rect(p.width / SPLIT * i, p.width / SPLIT * j, p.width / SPLIT + 1, p.width / SPLIT + 1);
        }
      }
    }

    function displayColorsDot(color: p5.Color, displayRate: number, fillColor: p5.Color, isStroke: boolean) {
      p.colorMode(p.HSL);
      let saturation = p.round(p.saturation(color));
      let brightness = p.round(p.brightness(color));
      let lightness = p.round(p.lightness(color));

      p.fill(fillColor);

      if (isStroke) {
        p.stroke(0);
        p.strokeWeight(0.003 * p.width);
      }
      else { p.noStroke(); }
      p.ellipse(saturation / 100 * p.width, p.width - lightness / 100 * p.width, p.width / SPLIT + displayRate * 0.01 * p.width);
      //p.ellipse(saturation / 100 * p.width, p.width - lightness / 100 * p.width, p.width / SPLIT + displayRate * 0.03 * p.width);
      //p.rect(brightness / 100 * p.width, saturation / 100 * p.width, p.width / SPLIT);
    }

    function displayHueBar() {
      for (let i = 0; i < 360; i++) {
        p.noStroke();
        p.colorMode(p.HSL, 360, 100, 100);
        p.fill(i, 100, 50);
        p.rect(p.width / 360 * i, 1.05 * p.width, p.width / 360, 0.1 * p.width);
        //p.rect(p.width / 360 * i, p.width + 10, p.width / 360, 20);
      }
    }

    function displayHueBarButton() {
      p.colorMode(p.RGB);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(0.3);
      p.rect(hueBarX, 1.05 * p.width, 0.01 * p.width, 0.1 * p.width);
      //p.rect(hueBarX, p.width + 10, 2, 20);
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnColorPaletteValue() {
  return returnColor;
}

export function ReturnIsTouchedColorGenerate() {
  return isTouchedColorGenerate;
}


export default ColorGanerateRe