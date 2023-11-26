//フロントエンドのみで推薦された色を表示するプログラム

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from '../Reserch/Canvas';
import ColorTestData from '../../data/colorTestData.json';
import * as fs from 'fs';
import axios from 'axios';
import { ReturnDrawingColor } from '../Reserch/Canvas';
import p5 from 'p5';


//let jsonFilePath = '../../data/colorTestData.json';
let jsonFilePath = 'src/data/colorTestData.json';
let isTouchedColorRatio = false;
let red = 0, green = 0, blue = 0, alpha = 0;
//let hue: number[] = [], saturation: number[] = [], lightness: number[] = [];

export function DisplayColorRatioOnlyFrontendontend() {
  const sketch = (p: P5CanvasInstance) => {
    const CANVAS_SIZE = ReturnCanvasSize();
    let drawingColor: p5.Color = ReturnDrawingColor();
    let colors: p5.Color[] = [];
    let colorsNumber = 5;
    let hueDifferenceValue = 4;

    p.setup = () => {
      let rate = 0.65;
      p.createCanvas(rate * p.windowWidth / 2, 20);
      //p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0);
      p.noStroke();
      displayColors();
    };


    p.draw = () => {
      p.colorMode(p.HSL, 360, 100, 100);
      updateVariables();
      displayColors();
      if (p.mouseIsPressed) { mouseControl(); }
    };

    function updateVariables() {
      drawingColor = ReturnDrawingColor();
      caluculateColors();
      isTouchedColorRatio = false;
    }

    function caluculateColors() {
      p.colorMode(p.HSL);
      colors[0] = (drawingColor);
      let hue = p.hue(colors[0]);
      let saturation = p.saturation(colors[0]);
      let lightness = p.lightness(colors[0]);

      for (let i = 1; i < colorsNumber; i++) {
        hue += hueDifferenceValue * 15;
        hue = hue % 360;
        saturation -= 15;
        lightness -= 15;
        colors[i] = p.color(hue, saturation, lightness);
        //console.log(colors[i]);
      }
    }

    function displayColors() {
      p.colorMode(p.HSL);
      for (let i = 0; i < colors.length; i++) {
        p.fill(colors[i]);
        p.rect(p.width / colors.length * i, 0, p.width / colors.length, p.height);
      }

    }

    function mouseControl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorRatio = true;
        p.colorMode(p.RGB);
        let getColor = p.get(p.mouseX, p.mouseY);
        let getColorObject = p.color(getColor);
        red = getColor[0];
        green = getColor[1];
        blue = getColor[2];
        alpha = getColor[3];
        // console.log(red, green, blue, alpha);
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnColorRatioValue() {
  return [red, green, blue, alpha];
}
export function ReturnIsTouchedColorRatio() {
  return isTouchedColorRatio;
}

export default DisplayColorRatioOnlyFrontendontend