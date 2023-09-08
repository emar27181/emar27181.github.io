/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import DisplayEmotionColorRatio from './DisplayEmotionColorRatio';

// データの取得
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseData.json');
const DATA = await response.json();

const IS_NO_STROKE = true;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DRAWING_WEIGHT_CHANGE_SPEED = 0.1;
let drawingWeight = 10, drawingColor = "#FFFFFF", backgroundColor = "#000000", textSize = 10;
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let sumIntense = 0;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backgroundColor);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }
      displayColorPalette();
    };

    p.draw = () => {
      p.fill(255);

      if (p.keyIsPressed) { KeyboardControl(p.key); }
      if (p.mouseIsPressed) { MouseControl(); }
      DisplayEmotionColorRatio();
      displayMenuBar();

    };

    function displayColorPalette() {
      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {

        let data = DATA[i];
        hue[i] = data.hue;
        intense[i] = data.intense;
        sumIntense += data.intense;
        //console.log("data[" + i + "]: " + data);
        //console.log("hue[" + i + "]: " + hue + ", intense[" + i + "]: " + intense);
      }

      //描画する横幅の計算と代入
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        console.log("colorWidth[" + i + "] = " + colorWidth[i]);
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, CANVAS_HEIGHT - 20, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i];
        console.log("hue[i] = " + hue[i] + ", startWidth: " + startWidth + ", endWidth: " + endWidth);
      }
    }

    function displayMenuBar() {
      p.textSize(textSize);
      p.fill("#cccccc");
      p.rect(0, p.height - textSize, p.width, p.height);
      p.fill("#000000");
      let mouseColor = p.get(p.mouseX, p.mouseY);
      p.text("(" + Math.floor(p.mouseX) + ", " + Math.floor(p.mouseY) +
        "), size: " + Math.floor(drawingWeight) + ", (" + mouseColor + ")", 0, p.height - 2);


    }

    function MouseControl() {
      p.fill(drawingColor);
      p.ellipse(p.mouseX, p.mouseY, drawingWeight, drawingWeight);
    }

    function KeyboardControl(inputKey: string) {
      if (inputKey === "+") { drawingWeight += DRAWING_WEIGHT_CHANGE_SPEED; }
      if (inputKey === "-") { if (drawingWeight > 1) drawingWeight -= DRAWING_WEIGHT_CHANGE_SPEED; }
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Canvas