/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';

//移動体の自作クラス
class Ball {
  x: number = 0;
  y: number = 0;
  dx: number = 1;
  dy: number = 2;
  r: number = 100;
  color: string = "red";
  emotionNumber: number = 0; //drawingEmotionNumber: 各感情の色に対して割り振られる0~7の数値
  boundCount: number = 0;

  constructor(x: number, y: number, r: number, color: string, emotionNumber: number) {
    this.x = x;
    this.y = y;
    this.r = drawingWeight;
    this.color = color;
    this.emotionNumber = emotionNumber;
    if (DEBUG) {
      //console.log("emotionNumber: " + this.emotionNumber);
    }
  }
}

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DEBUG_FPS = 0.2, DEFAULT_FPS = 10;
const DRAWING_WEIGHT_CHANGE_SPEED = DEFAULT_FPS / 3;
const ALPHA = 15;
let drawingWeight = 100, backgroundColor = "#000000", textSize = 10;
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let colorTank: number[] = [];
let consumeSpeed = 0.5;
let emotionName: string[] = [];
let drawingEmotionNumber = 0; //drawingEmotionNumber: 描画される感情の色のインデックス番号
let sumIntense = 0;
let fps = DEFAULT_FPS;
let isPaused = false, isMoved = true;

//描画ボールに関する変数宣言
let balls: Array<Ball> = [];
let dx = 1, dy = 2;
let isColor = "red";
let isBallCollisionDetected = false;
const BALL_SIZE = 2, SATURATION = 255; // SATURATION: 彩度

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    let drawingColor = p.color(255, 51, 105);
    fetchData(); //データの取得

    p.setup = () => {
      //.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.createCanvas(p.windowHeight / 2, p.windowHeight / 2);
      p.background(backgroundColor);
      //p.colorMode(p.RGB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }
    };

    p.draw = () => {

      p.colorMode(p.RGB);
      if (p.keyIsPressed) { KeyboardControl(p.key); }
      if (p.mouseIsPressed) { MouseControl(); }

      p.blendMode(p.DARKEST);
      p.background(0);
      p.blendMode(p.ADD);

      if (isPaused) { return; }

      if (isMoved) {
        moveBalls();
      }

      displayBalls();

      if (DEBUG) { p.frameRate(DEBUG_FPS); }
      else { p.frameRate(fps); }

      if (DEBUG) { console.log("colorTank: " + colorTank); }
    };

    //移動体を描画する関数
    function displayBalls() {

      for (let i = 0; i < balls.length; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[balls[i].emotionNumber], 100, 100, ALPHA);
        p.ellipse(balls[i].x, balls[i].y, balls[i].r, balls[i].r);
      }
    }

    //移動体を移動/反射させる関数(※生成された移動体全てを移動)
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
        //displayBall(i);
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

    function ConsumeColor(drawingEmotionNumber: number) {
      if (colorTank[drawingEmotionNumber] > 0) {
        colorTank[drawingEmotionNumber] -= consumeSpeed;
      }
    }

    //マウスのクリック中の動作
    function MouseControl() {
      //感情の色の残量がある場合
      if (colorTank[drawingEmotionNumber] > 0) {
        balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, isColor, drawingEmotionNumber));
        ConsumeColor(drawingEmotionNumber);
      }
      //感情の色がない場合
      else {
        console.error("色の残量がありません。(" + (emotionName[drawingEmotionNumber]) + ")");
      }
    }

    //キーボードによる描画モードの変更
    function KeyboardControl(inputKey: string) {
      //描画サイズの拡大縮小
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
      if (inputKey === "e") { p.saveCanvas('saveCanvas', 'png'); }

      //ポーズモードの切り替え
      if (inputKey === "p") { isPaused = !isPaused; }

      //描画された点が動くかどうかの切り替え
      if (inputKey === "m") { isMoved = !isMoved; }

      //描画色の変更
      if (inputKey === "0") { drawingEmotionNumber = 0; }
      if (inputKey === "1") { drawingEmotionNumber = 1; }
      if (inputKey === "2") { drawingEmotionNumber = 2; }
      if (inputKey === "3") { drawingEmotionNumber = 3; }
      if (inputKey === "4") { drawingEmotionNumber = 4; }
      if (inputKey === "5") { drawingEmotionNumber = 5; }
      if (inputKey === "6") { drawingEmotionNumber = 6; }
      if (inputKey === "7") { drawingEmotionNumber = 7; }
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
          colorTank[i] = data.intense;
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

export function ReturnColorTank() {
  return colorTank;
}

export function ReturnHue() {
  return hue[drawingEmotionNumber];
}

export function ReturnDrawingWeight() {
  return drawingWeight;
}

export default Canvas
