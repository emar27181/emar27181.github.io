/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';

class Ball {
  x: number = 0;
  y: number = 0;
  dx: number = 1;
  dy: number = 2;
  r: number = 100;
  color: string = "red";
  boundCount: number = 0;

  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
}

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DRAWING_WEIGHT_CHANGE_SPEED = 0.1, FPS = 0.2;
let drawingWeight = 10, backgroundColor = "#000000", textSize = 10;
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let emotionName: string[] = [];
let sumIntense = 0;

let balls: Array<Ball> = [];
let dx = 1, dy = 2;
let isChangeColor = false;
let isColor = "red";
let isBallCollisionDetected = false;
const BALL_SIZE = 2, SATURATION = 255; // SATURATION: 彩度

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    let drawingColor = p.color(255, 51, 105);
    fetchData(); //データの取得

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      //p.createCanvas(p.windowWidth /2, p.windowHeight/2);
      p.background(backgroundColor);
      //p.colorMode(p.RGB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }
      displayColorPalette();
    };

    p.draw = () => {
      p.colorMode(p.RGB);
      p.fill(255);

      if (p.keyIsPressed) { KeyboardControl(p.key); }
      if (p.mouseIsPressed) { MouseControl(); }
      moveBalls();
      displayColorPalette();
      displayMenuBar();
      if (DEBUG) { p.frameRate(FPS); }
    };

    function moveBalls() {
      for (let i = 0; i < balls.length; i++) {
        if (isBallCollisionDetected) {
          let nextColorX = p.get(balls[i].x + dx, balls[i].y);
          let nextColorY = p.get(balls[i].x, balls[i].y + dy);

          if (nextColorX[0] != 0) {
            balls[i].dx = -balls[i].dx;
            balls[i].boundCount++;
          }
          else if (nextColorY[0] != 0) {
            balls[i].dy = -balls[i].dy;
            balls[i].boundCount++;
          }
        }

        if (balls[i].x > p.width || balls[i].x < 0) {
          balls[i].dx = -balls[i].dx;
          balls[i].boundCount++;
        }

        else if (balls[i].y > p.height || balls[i].y < 0) {
          balls[i].dy = -balls[i].dy;
          balls[i].boundCount++;
        }

        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

        if (isChangeColor) { p.fill(255 - balls[i].boundCount * 30); }
        else if (balls[i].color === 'red') { p.fill(SATURATION, 0, 0); }
        else if (balls[i].color === 'green') { p.fill(0, SATURATION, 0); }
        else if (balls[i].color === 'blue') { p.fill(0, 0, SATURATION); }
        else if (balls[i].color === 'black') { p.fill(0, 0, 0, 0); }
        p.ellipse(balls[i].x, balls[i].y, balls[i].r, balls[i].r);
      }
    }

    //感情の割合を基にカラーパレットを描画する関数
    function displayColorPalette() {
      //描画する横幅の計算と代入
      if (DEBUG) { console.log("------------------------"); }
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = p.width * intense[i] / sumIntense;
        if (DEBUG) {
          console.log("colorWidth[" + i + "] = " + p.round(colorWidth[i]));
        }
      }

      //色の割合に基づいて描画
      //一番右側に表示される色が長く表示されてしまうバグあり(2023/09/19時点)
      //VSCodeの保存(Ctrl x + s)による再読み込みとブラウザの再読み込みで挙動が異なる、
      //再読み込み時にのみ発生する(キャッシュが関係している？...)
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, p.height - 20, endWidth, p.height);

        if (DEBUG) {
          console.log("hue[i] = " + hue[i] + ", startWidth: " + p.round(startWidth) + ", endWidth: " + p.round(endWidth));
        }

        startWidth += colorWidth[i];
        endWidth += colorWidth[i + 1];
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
      balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, isColor));
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
          emotionName[i] = data.name;
          sumIntense += data.intense;
          if (DEBUG) {
            console.log("hue[" + i + "]: " + hue[i] + ", intense[" + i + "]: " + intense[i] + ", emotionName[" + i + "]: " + emotionName[i]);
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