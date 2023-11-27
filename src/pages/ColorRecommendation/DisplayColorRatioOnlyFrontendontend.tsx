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
import { ReturnIsTouchedColorGenerate } from './ColorGenerate';


//let jsonFilePath = '../../data/colorTestData.json';
let jsonFilePath = 'src/data/colorTestData.json';
let isTouchedColorRatio = false;
let red = 0, green = 0, blue = 0, alpha = 0;
//let hue: number[] = [], saturation: number[] = [], lightness: number[] = [];

export function DisplayColorRatioOnlyFrontendontend() {
  const sketch = (p: P5CanvasInstance) => {
    const CANVAS_SIZE = ReturnCanvasSize();
    //let drawingColor: p5.Color = ReturnDrawingColor();
    let drawingColor: p5.Color = p.color(255, 0, 0);
    let colors: p5.Color[][] = [];
    for (let i = 0; i < 12; i++) { colors[i] = []; }
    let colorsNumber = 5;
    let hueDifferenceValue = 4;

    p.setup = () => {
      let rate = 0.65;
      //p.createCanvas(rate * p.windowWidth / 2, rate * p.windowWidth / 2);
      p.createCanvas(256, 256);
      //p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0);
      p.noStroke();
      updateVariables();
    };


    p.draw = () => {
      p.colorMode(p.HSL, 360, 100, 100);
      updateVariables();
      displayColors();
      //displayColorsRate();
      if (p.mouseIsPressed) { mouseControl(); }
    };

    function updateVariables() {
      if (ReturnIsTouchedColorGenerate()) {
        drawingColor = ReturnDrawingColor();
      }
      caluculateColors();
      isTouchedColorRatio = false;
    }

    function caluculateColors() {
      p.colorMode(p.HSL);

      for (let i = 0; i < 12; i++) {
        let hue = p.hue(drawingColor);
        let saturation = p.saturation(drawingColor);
        let lightness = p.lightness(drawingColor);
        for (let j = 0; j < colorsNumber; j++) {
          //hue += hueDifferenceValue * 15;
          colors[i][j] = p.color(hue, saturation, lightness);
          hue += i * 15;
          hue = hue % 360;
          saturation -= 15;
          saturation = saturation % 100;
          lightness -= 15;
          lightness = lightness % 100;
          //console.log(colors[i][j]);
          //console.log("(" + i + "," + j + ")=" + "(" + p.round(p.hue(colors[i][j])) + "," + p.round(p.saturation(colors[i][j])) + "," + p.round(p.lightness(colors[i][j])) + ")");
        }
      }
    }

    //色を均等な長さで表示する関数
    function displayColors() {
      p.colorMode(p.HSL);
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < colorsNumber; j++) {
          p.fill(colors[i][j]);
          p.rect(p.width / colorsNumber * j, p.height / 12 * i, p.width / colorsNumber, p.height / 12);
        }
      }
    }

    //色を比率に応じた長さで表示する関数
    function displayColorsRate() {
      p.colorMode(p.HSL);
      for (let i = 0; i < 12; i++) {
        let w = 0;
        //参考: https://comic.smiles55.jp/guide/8903/
        //ベースカラー(70%)
        p.fill(colors[i][0]);
        p.rect(0, p.height / 12 * i, p.width * 0.7, p.height / 12);

        //アソートカラー(25%)
        p.fill(colors[i][1]);
        p.rect(p.width * 0.7, p.height / 12 * i, p.width * 0.25, p.height / 12);

        //アクセントカラー(5%)
        p.fill(colors[i][2]);
        p.rect(p.width * 0.95, p.height / 12 * i, p.width * 0.05, p.height / 12);
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