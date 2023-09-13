/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

// データの取得
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseData.json');
const DATA = await response.json();

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DRAWING_WEIGHT_CHANGE_SPEED = 0.1;
let drawingWeight = 10, backgroundColor = "#000000", textSize = 10;
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let sumIntense = 0;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    let drawingColor = p.color(255, 51, 105);

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backgroundColor);
      //p.colorMode(p.RGB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }

      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {
        let data = DATA[i];
        hue[i] = data.hue;
        intense[i] = data.intense;
        sumIntense += data.intense;
      }

    };

    p.draw = () => {
      p.colorMode(p.RGB); 
      p.fill(255);

      if (p.keyIsPressed) { KeyboardControl(p.key); }
      if (p.mouseIsPressed) { MouseControl(); }
      displayColorPalette();
      displayMenuBar();
    };

    function displayColorPalette() {

      //描画する横幅の計算と代入
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        if (DEBUG) { console.log("colorWidth[" + i + "] = " + colorWidth[i]); }
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, CANVAS_HEIGHT - 20, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i];
        if (DEBUG) { console.log("hue[i] = " + hue[i] + ", startWidth: " + startWidth + ", endWidth: " + endWidth); }
      }
    }

    function displayMenuBar() {
      p.textSize(textSize);
      p.fill("#cccccc");
      p.rect(0, p.height - textSize, p.width, p.height);
      p.fill("#000000");
      //p.fill(drawingColor);
      let mouseColor = p.get(p.mouseX, p.mouseY);
      p.text("(" + Math.floor(p.mouseX) + ", " + Math.floor(p.mouseY) +
        "), size: " + Math.floor(drawingWeight) + ", (" + mouseColor + ")", 0, p.height - 2);
      p.fill(drawingColor);
      p.rect(p.width - 20 , p.height - textSize, p.width, p.height);

    }

    function MouseControl() {
      p.fill(drawingColor);
      p.ellipse(p.mouseX, p.mouseY, drawingWeight, drawingWeight);
    }

    function KeyboardControl(inputKey: string) {
      if (inputKey === "+") { drawingWeight += DRAWING_WEIGHT_CHANGE_SPEED; }
      if (inputKey === "-") { if (drawingWeight > 1) drawingWeight -= DRAWING_WEIGHT_CHANGE_SPEED; }
      if (inputKey === "s") {
        let input = p.get(p.mouseX, p.mouseY);
        drawingColor = p.color(input[0], input[1], input[2], input[3])

        console.log("drawingColor: " + drawingColor);
        console.log("typeof:" + typeof (drawingColor));
      }
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Canvas