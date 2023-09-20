/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DRAWING_WEIGHT_CHANGE_SPEED = 0.1, FPS = 30;
let drawingWeight = 10, backgroundColor = "#000000", textSize = 10;
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let sumIntense = 0;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    let drawingColor = p.color(255, 51, 105);
    fetchData(); //データの取得

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(backgroundColor);
      //p.colorMode(p.RGB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }
    };

    p.draw = () => {
      p.colorMode(p.RGB);
      p.fill(255);

      if (p.keyIsPressed) { KeyboardControl(p.key); }
      if (p.mouseIsPressed) { MouseControl(); }
      displayColorPalette();
      displayMenuBar();
      p.frameRate(FPS);
    };

    //感情の割合を基にカラーパレットを描画
    function displayColorPalette() {

      //描画する横幅の計算と代入
      if (DEBUG) { console.log("------------------------"); }
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        if (DEBUG) {
          console.log("colorWidth[" + i + "] = " + p.round(colorWidth[i]));
        }
      }

      //色の割合に基づいて描画
      //一番右側に表示される色が長く表示されてしまうバグあり(2023/09/19時点)
      //再読み込み時にのみ発生する(キャッシュが関係している？...)
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, CANVAS_HEIGHT - 20, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i];
        if (DEBUG) {
          //console.log("hue[i] = " + hue[i] + ", startWidth: " + p.round(startWidth) + ", endWidth: " + p.round(endWidth));
        }
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
      p.rect(p.width - 20, p.height - textSize, p.width, p.height);

    }

    //マウスのクリック中の動作
    function MouseControl() {
      p.fill(drawingColor);
      p.ellipse(p.mouseX, p.mouseY, drawingWeight, drawingWeight);
    }

    //キーボードによる描画モードの変更
    function KeyboardControl(inputKey: string) {
      if (inputKey === "+") { drawingWeight += DRAWING_WEIGHT_CHANGE_SPEED; }
      if (inputKey === "-") { if (drawingWeight > 1) drawingWeight -= DRAWING_WEIGHT_CHANGE_SPEED; }
      if (inputKey === "s") {
        //スポイト機能
        let input = p.get(p.mouseX, p.mouseY);
        drawingColor = p.color(input[0], input[1], input[2], input[3])

        if (DEBUG) {
          //console.log("drawingColor: " + drawingColor);
          //console.log("typeof:" + typeof (drawingColor));
        }
      }
    }

    // バックエンドからJSONデータの取得と色に関するデータの代入
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/send-data');
        const jsonData = response.data;
        const parsedData = JSON.parse(jsonData.message);

        //hueとintenseの値を代入
        for (let i = 0; i < 8; i++) {
          let data = parsedData[i];
          hue[i] = data.hue;
          intense[i] = data.intense;
          sumIntense += data.intense;
          if (DEBUG) {
            //console.log('hue[i]: ' + hue[i]);
            //console.log('intense[i]: ' + intense[i]);
          }
        }

      } catch (error) {
        console.error('エラーが発生しました:', error);
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Canvas