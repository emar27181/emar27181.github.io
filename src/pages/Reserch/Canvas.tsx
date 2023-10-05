/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';
import p5 from 'p5';

let isRandomMove = true;
const MOVE_SPEED = 10;

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DEBUG_FPS = 0.2, DEFAULT_FPS = 10;
const DRAWING_WEIGHT_CHANGE_SPEED = DEFAULT_FPS / 3;
const ALPHA = 5, BACK_GROUND_ALPHA = 15;
const MAX_TANK_VALUE = 100;
let alpha = 5, backgroundAlpha = 15;
let drawingWeight = 20, backgroundColor = "#000000", textSize = 10;
let adjustMode = "w", figureMode = "ellipse";
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let colorTank: number[] = [];
let consumeSpeed = 0.5;
let emotionName: string[] = [];
let drawingEmotionNumber = 0; //drawingEmotionNumber: 描画される感情の色のインデックス番号
let sumIntense = 0;
let fps = DEFAULT_FPS;
let isPaused = false, isMoved = false;
let angle = 0, radius = 0, speed = 1;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    let gravityX = p.width / 2, gravityY = p.height / 2;

    //移動体の自作クラス
    class Ball {
      position: p5.Vector;
      velocity: p5.Vector;
      acceleration: p5.Vector;
      mass: number;
      dx: number = 1;
      dy: number = 2;
      r: number = 100;
      color: string = "red";
      emotionNumber: number = 0; //drawingEmotionNumber: 各感情の色に対して割り振られる0~7の数値
      boundCount: number = 0;

      constructor(x: number, y: number, r: number, color: string, emotionNumber: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.mass = drawingWeight;

        if (isRandomMove) {
          this.dx = MOVE_SPEED * Math.random() - MOVE_SPEED / 2;
          this.dy = MOVE_SPEED * Math.random() - MOVE_SPEED / 2;
        }
        this.r = drawingWeight;
        this.color = color;
        this.emotionNumber = emotionNumber;
        if (DEBUG) {
          //console.log("emotionNumber: " + this.emotionNumber);
        }
      }

      applyForce(force: p5.Vector) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

    }

    //描画ボールに関する変数宣言
    let balls: Array<Ball> = [];
    let dx = 1, dy = 2;
    let isColor = "red";
    let isBallCollisionDetected = false;
    const BALL_SIZE = 2;

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

      if (isPaused) { return; }

      p.blendMode(p.DARKEST);
      p.background(0, 0, 0, backgroundAlpha);
      p.blendMode(p.ADD);

      if (isMoved) {
        moveBalls();
      }

      displayBalls();

      if (DEBUG) { p.frameRate(DEBUG_FPS); }
      else { p.frameRate(fps); }

      if (DEBUG) { console.log("colorTank: " + colorTank); }
    };

    function setColor(emotionNumber: number) {
      if (emotionNumber <= 7) { p.fill(hue[emotionNumber], 100, 100, alpha); }
      else if (emotionNumber === 8) { p.fill(0); }
      else if (emotionNumber === 9) { p.fill(255); }
    }

    function displayFigure(i: number){
      let x = balls[i].position.x;
      let y = balls[i].position.y;
      let r = balls[i].r;

      switch (figureMode) {
        case "ellipse":
          p.ellipse(balls[i].position.x, balls[i].position.y, balls[i].r, balls[i].r);
          break;

        case "rect":
          p.rect(balls[i].position.x, balls[i].position.y, balls[i].r);
          break;

        case "triangle": 
          p.triangle(x, y, x-r/2, y + r, x + r/2, y + r);
      
        default:
          console.error("Invalid figure mode");
          break;
      }
    }

    //移動体を描画する関数
    function displayBalls() {

      for (let i = 0; i < balls.length; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        setColor(balls[i].emotionNumber);
        //p.ellipse(balls[i].position.x, balls[i].position.y, balls[i].r, balls[i].r);
        displayFigure(i);
      }
    }

    //移動体を移動/反射させる関数(※生成された移動体全てを移動)
    function moveBalls() {
      for (let i = 0; i < balls.length; i++) {
        if (isBallCollisionDetected) {
          let nextColorX = p.get(balls[i].position.x + dx, balls[i].position.y);
          let nextColorY = p.get(balls[i].position.x, balls[i].position.y + dy);

          if (nextColorX[0] != 0) {
            balls[i].dx = -balls[i].dx;
            balls[i].boundCount++;
          }
          else if (nextColorY[0] != 0) {
            balls[i].dy = -balls[i].dy;
            balls[i].boundCount++;
          }
        }

        if (balls[i].position.x > p.width || balls[i].position.x < 0) {
          balls[i].dx = -balls[i].dx;
          balls[i].boundCount++;
        }

        else if (balls[i].position.y > p.height || balls[i].position.y < 0) {
          balls[i].dy = -balls[i].dy;
          balls[i].boundCount++;
        }

        balls[i].position.x += balls[i].dx;
        balls[i].position.y += balls[i].dy;
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
      if (drawingEmotionNumber >= 8) {
        balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, isColor, drawingEmotionNumber));
        ConsumeColor(drawingEmotionNumber);
      }

      //感情の色の残量がある場合
      else if (colorTank[drawingEmotionNumber] > 0) {
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
      if (inputKey === "+") {
        if (adjustMode === "w") { drawingWeight += DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "a") { alpha += 0.1 * DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "b") { backgroundAlpha += 0.1 * DRAWING_WEIGHT_CHANGE_SPEED; }
      }
      if (inputKey === "-") {

        if (adjustMode === "w") {
          if (drawingWeight > 0) {
            drawingWeight -= DRAWING_WEIGHT_CHANGE_SPEED;
          }
        }
        else if (adjustMode === "a") {
          if (alpha > 0) {
            alpha -= 0.1 * DRAWING_WEIGHT_CHANGE_SPEED;
          }
        }
        else if (adjustMode === "b") {
          if (backgroundAlpha > 0) {
            backgroundAlpha = 0.1 * DRAWING_WEIGHT_CHANGE_SPEED;
          }
        }
      }

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
      if (inputKey === "w") { adjustMode = "w"; }
      if (inputKey === "b") { adjustMode = "b"; }
      if (inputKey === "a") { adjustMode = "a"; }

      if (inputKey === 'LEFT_ARROW') { fps -= 0.1; console.log("LEFT_ARROW"); }
      if (inputKey === 'RIGHT_ARROW') { fps += 0.1; }

      //ポーズモードの切り替え
      if (inputKey === "p") { isPaused = !isPaused; }

      //描画された点が動くかどうかの切り替え
      if (inputKey === "m") { isMoved = !isMoved; }
      if (inputKey === "r") { isRandomMove = !isRandomMove; }

      //描画色の変更
      if (inputKey === "0") { drawingEmotionNumber = 0; }
      if (inputKey === "1") { drawingEmotionNumber = 1; }
      if (inputKey === "2") { drawingEmotionNumber = 2; }
      if (inputKey === "3") { drawingEmotionNumber = 3; }
      if (inputKey === "4") { drawingEmotionNumber = 4; }
      if (inputKey === "5") { drawingEmotionNumber = 5; }
      if (inputKey === "6") { drawingEmotionNumber = 6; }
      if (inputKey === "7") { drawingEmotionNumber = 7; }
      if (inputKey === "8") { drawingEmotionNumber = 8; }
      if (inputKey === "9") { drawingEmotionNumber = 9; }
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
          colorTank[i] = 0.1 * MAX_TANK_VALUE * data.intense;
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

export function ReturnColorTank() { return colorTank; }
export function ReturnHue() { return hue[drawingEmotionNumber]; }
export function ReturnDrawingWeight() { return drawingWeight; }
export function ReturnIsRandomMove() { return isRandomMove; }
export function ReturnAlpha() { return alpha; }
export function ReturnBackgroundAlpha() { return backgroundAlpha; }
export function ReturnFigureMode() { return figureMode; }

export default Canvas
