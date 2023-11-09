/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';
import p5 from 'p5';
import { ReturnColorsInfo, ColorInfo } from './ReturnCameraInfo';
import { ReturnImageColorsInfo } from './ReturnImageInfo';
import { ReturnTrackingData } from './ReturnTrackingInfo';
import { judgeDistance } from './DisplayGravityPlace';
import { ReturnColorPaletteValue } from '../ColorRecommendation/ColorGenerate';
//import { ReturnTrackingData } from '../TestHandsfree';

let isRandomMove = true;
const MOVE_SPEED = 10;

const IS_NO_STROKE = true, DEBUG = false;
const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
const DEBUG_FPS = 0.2, DEFAULT_FPS = 10;
const DRAWING_WEIGHT_CHANGE_SPEED = DEFAULT_FPS / 3;
const ALPHA = 5, BACK_GROUND_ALPHA = 15;
const GRAVITY_MAX = 100;
const MAX_TANK_VALUE = 100;
const TRACKING_WIDTH = 300, TRACKING_HEIGHT = 150;
const IS_TEST_MODE = true;
let alpha = 50, backgroundAlpha = 15;
let drawingWeight = 1, backgroundColor = "#000000", textSize = 10;
let adjustMode = "w", figureMode = "ellipse", clickMode = "draw";
let hue: number[] = [];
let intense: number[] = [];
let colorWidth: number[] = [];
let colorTank: number[] = [];
let consumeSpeed = 0.5;
let emotionName: string[] = [];
let drawingEmotionNumber = 0; //drawingEmotionNumber: 描画される感情の色のインデックス番号
let sumIntense = 0;
let mouseColor = [0, 0, 0, 0];
let fps = DEFAULT_FPS;
let standardDeviationLimit = 20, resistanceValue = 0.99;
let isPaused = false, isMovedStraight = false, isFixedGravity = true, isMovedGravity = true, isBackground = true;
let isMoveBallGravity = false, isTrackingGravity = true;
let isMouseGravity = false;
let angle = 0, radius = 0, speed = 1;
let gravityX: number[] = [], gravityY: number[] = [];
let trackingData: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0]];
let trackingX1 = trackingData[0][0]; //人差し指のx座標
let trackingY1 = trackingData[0][1]; //人差し指のy座標
let trackingX2 = trackingData[0][2]; //親指のx座標
let trackingY2 = trackingData[0][3]; //親指のy座標
let trackingX3 = trackingData[1][0]; //人差し指のx座標
let trackingY3 = trackingData[1][1]; //人差し指のy座標
let trackingX4 = trackingData[1][2]; //親指のx座標
let trackingY4 = trackingData[1][3]; //親指のy座標
//let returnDrawingColor: p5.Color = new p5.Color();
let returnDrawingColor: p5.Color;

let canvasWidth = 0, canvasHeight = 0, mouseX = 0, mouseY = 0;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    //移動体の自作クラス
    class Ball {
      position: p5.Vector;
      velocity: p5.Vector;
      acceleration: p5.Vector;
      mass: number;
      figure: string;
      dx: number = 1;
      dy: number = 2;
      r: number = 100;
      color: p5.Color;
      emotionNumber: number = 0; //drawingEmotionNumber: 各感情の色に対して割り振られる0~7の数値
      boundCount: number = 0;

      constructor(x: number, y: number, r: number, color: p5.Color, emotionNumber: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.mass = 1;
        this.figure = figureMode;

        if (isRandomMove) {
          this.dx = MOVE_SPEED * Math.random() - MOVE_SPEED / 2;
          this.dy = MOVE_SPEED * Math.random() - MOVE_SPEED / 2;
        }
        this.r = drawingWeight;
        this.color = color;
        this.emotionNumber = emotionNumber;
        if (DEBUG) { console.log("emotionNumber: " + this.emotionNumber); }
      }

      applyForce(force: p5.Vector) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(50);
        this.velocity.mult(resistanceValue);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display() {
        setColor(this.color);
        displayFigure(this.position.x, this.position.y, this.r, this.figure);
      }

    }

    //描画ボールに関する変数宣言
    let balls: Array<Ball> = [];
    let ballsGravity: Array<Ball> = [];
    let ballsTrackigGravity: Array<Ball> = [];
    ballsTrackigGravity.push(new Ball(0, 0, 100, p.color(0, 255, 0), 9)); //1番目に認識される手
    ballsTrackigGravity.push(new Ball(0, 0, 100, p.color(0, 255, 0), 9)); //2番目に認識される手
    let dx = 1, dy = 2;
    let isColor = p.color(255, 0, 0);
    let isBallCollisionDetected = false;
    const BALL_SIZE = 2;
    let ColorsInfo: Array<ColorInfo>;
    let drawingColor = p.color(255, 51, 105);
    returnDrawingColor = p.color(255, 0, 0);
    fetchData(); //データの取得

    function addCameraBalls() {
      ColorsInfo = ReturnColorsInfo();
      if (DEBUG) { console.log(ColorsInfo); }
      for (let i = 0; i < ColorsInfo.length; i++) {
        balls.push(new Ball(ColorsInfo[i].x, ColorsInfo[i].y, drawingWeight,
          p.color(ColorsInfo[i].color[0], ColorsInfo[i].color[1], ColorsInfo[i].color[2], alpha), -1));
      }
    }
    function addImageBalls() {
      ColorsInfo = ReturnImageColorsInfo();
      if (DEBUG) { console.log(ColorsInfo); }
      for (let i = 0; i < ColorsInfo.length; i++) {
        balls.push(new Ball(ColorsInfo[i].x, ColorsInfo[i].y, drawingWeight,
          p.color(ColorsInfo[i].color[0], ColorsInfo[i].color[1], ColorsInfo[i].color[2], alpha), -1));
      }
    }

    p.setup = () => {
      p.createCanvas(p.windowHeight / 2, p.windowHeight / 2);
      canvasWidth = p.width, canvasHeight = p.height;
      //ballsGravity.push(new Ball(p.width / 2, p.height / 2, 10, p.color(255, 0, 0), 9));
      p.background(backgroundColor);
      //p.colorMode(p.RGB, 360, 100, 100, 100);
      if (IS_NO_STROKE) { p.noStroke(); }
    };

    p.draw = () => {
      UpdateVariables();

      p.colorMode(p.RGB);
      if (p.keyIsPressed) { p.keyPressed(); }
      if (p.mouseIsPressed) { MouseControl(); }
      getMouseColor();

      if (isPaused) { return; }

      if (isBackground) {
        p.blendMode(p.DARKEST);
        p.background(0, 0, 0, backgroundAlpha);
        p.blendMode(p.ADD);
      }

      if (isMovedStraight) { moveBalls(); }
      if (isMovedGravity) { moveBallsGravity(); }
      if (isMoveBallGravity) { moveStraight(ballsGravity[0]); }

      displayBalls();

      if (DEBUG) { p.frameRate(DEBUG_FPS); }
      else { p.frameRate(fps); }
      if (DEBUG) { console.log("colorTank: " + colorTank); }
    };

    function UpdateVariables() {
      mouseX = p.mouseX, mouseY = p.mouseY;
      if (ReturnTrackingData().length === 2) { trackingData = ReturnTrackingData(); }
      //console.log(trackingData);
      trackingX1 = trackingData[0][0]; //人差し指のx座標
      trackingY1 = trackingData[0][1]; //人差し指のy座標
      trackingX2 = trackingData[0][2]; //親指のx座標
      trackingY2 = trackingData[0][3]; //親指のy座標
      trackingX3 = trackingData[1][0]; //人差し指のx座標
      trackingY3 = trackingData[1][1]; //人差し指のy座標
      trackingX4 = trackingData[1][2]; //親指のx座標
      trackingY4 = trackingData[1][3]; //親指のy座標
      ballsTrackigGravity[0].position.x = trackingX1;
      ballsTrackigGravity[0].position.y = trackingY1;
      ballsTrackigGravity[1].position.x = trackingX3;
      ballsTrackigGravity[1].position.y = trackingY3;
      let color = ReturnColorPaletteValue();
      drawingColor = p.color(color[0], color[1], color[2], color[3]);
      returnDrawingColor = drawingColor;

      /*
      p.fill(0);
      p.ellipse(p.width / 2, p.height / 2, 100);
      p.fill(color[0], color[1], color[2], color[3]);
      p.ellipse(p.width / 2, p.height / 2, 100);
      */

      /*
      let testArray = [[0, 1, 2, 3], [4, 5, 6, 7]];
      console.log(testArray[0][2]);
      */
      //console.log("(x, y) = " + ballsTrackigGravity[0].position.x + ", " + ballsTrackigGravity[0].position.y);
    }

    function getMouseColor() {
      let getColor = p.get(p.mouseX, p.mouseY);
      mouseColor[0] = getColor[0];
      mouseColor[1] = getColor[1];
      mouseColor[2] = getColor[2];
      mouseColor[3] = getColor[3];
      //console.log(mouseColor);
    }

    function setColor(color: p5.Color) {
      let r = p.red(color);
      let g = p.green(color);
      let b = p.blue(color);
      p.fill(r, g, b, alpha);
      //console.log(r, g, b, alpha);
    }

    function displayFigure(x: number, y: number, r: number, figureMode: string) {
      switch (figureMode) {
        case "ellipse":
          p.ellipse(x, y, r, r);
          break;

        case "rect":
          p.rect(x, y, r);
          break;

        case "triangle":
          p.triangle(x, y, x - r / 2, y + r, x + r / 2, y + r);
          break;

        default:
          console.error("Invalid figure mode");
          break;
      }
    }

    function isDisplayColor(r: number, g: number, b: number): boolean {
      let ave = (r + g + b) / 3;
      let variance = ((r - ave) * (r - ave) + (g - ave) * (g - ave) + (b - ave) * (b - ave)) / 3;
      let sd = Math.sqrt(variance);
      return (sd >= standardDeviationLimit);
      //return (!(r >= 200 && g >= 200 && b >= 200));
    }

    //移動体を描画する関数
    function displayBalls() {
      //移動体の描画
      for (let i = 0; i < balls.length; i++) {
        let r = p.red(balls[i].color);
        let g = p.green(balls[i].color);
        let b = p.blue(balls[i].color);
        //条件を満たす場合にのみ
        if (isDisplayColor(r, g, b)) { balls[i].display() }
        //else { balls[i].display(); }
      }

      //トラッキングの描画
      if (judgeDistance(trackingData[0][2], trackingData[0][3], trackingData[0][4], trackingData[0][5])) {
        ballsTrackigGravity[0].display();
      }
      if (judgeDistance(trackingData[1][2], trackingData[1][3], trackingData[1][4], trackingData[1][5])) {
        ballsTrackigGravity[1].display();
      }

    }

    function moveStraight(ball: Ball) {
      if (isBallCollisionDetected) {
        let nextColorX = p.get(ball.position.x + dx, ball.position.y);
        let nextColorY = p.get(ball.position.x, ball.position.y + dy);

        if (nextColorX[0] != 0) {
          ball.dx = -ball.dx;
          ball.boundCount++;
        }
        else if (nextColorY[0] != 0) {
          ball.dy = -ball.dy;
          ball.boundCount++;
        }
      }

      if (ball.position.x > p.width || ball.position.x < 0) {
        ball.dx = -ball.dx;
        ball.boundCount++;
      }

      else if (ball.position.y > p.height || ball.position.y < 0) {
        ball.dy = -ball.dy;
        ball.boundCount++;
      }

      ball.position.x += ball.dx;
      ball.position.y += ball.dy;
    }

    function moveGravity(ball: Ball, x: number, y: number) {
      //let gravity = p.createVector(p.mouseX, p.mouseY);
      if (x != -1 && y != -1) {
        let gravity = p.createVector(x, y);
        gravity.sub(ball.position);
        let distanceSq = gravity.magSq();
        distanceSq = p.constrain(distanceSq, 10, 1000); // 距離が0になるのを防止
        let strength = GRAVITY_MAX / distanceSq; // 引力の強さ
        gravity.setMag(strength);
        ball.applyForce(gravity);
      }
      ball.update();
    }

    //移動体を移動/反射させる関数(※生成された移動体全てを移動)
    function moveBalls() {
      for (let i = 0; i < balls.length; i++) {
        moveStraight(balls[i]);
        //if (p.mouseIsPressed) { moveGravity(balls[i]); }
      }
    }

    function moveBallTrackingGravity(ball: Ball, x1: number, y1: number, x2: number, y2: number) {
      if (judgeDistance(x1, y1, x2, y2)) { moveGravity(ball, x1, y1); }
    }

    function moveBallsGravity() {
      for (let i = 0; i < balls.length; i++) {
        //固定された重力場での重力移動
        if (isFixedGravity) {
          for (let j = 0; j < ballsGravity.length; j++) {
            moveGravity(balls[i], ballsGravity[j].position.x, ballsGravity[j].position.y);
          }
        }
        // マウスの座標での重力移動
        if (clickMode === "gravity" && p.mouseIsPressed) { moveGravity(balls[i], p.mouseX, p.mouseY); }
        // トラッキングの手の座標での重力移動
        if (isTrackingGravity) {
          moveBallTrackingGravity(balls[i], trackingX1, trackingY1, trackingX2, trackingY2);
          moveBallTrackingGravity(balls[i], trackingX3, trackingY3, trackingX4, trackingY4);
        }
        // 慣性移動
        moveGravity(balls[i], -1, -1);
      }
    }

    function ConsumeColor(drawingEmotionNumber: number) {
      if (colorTank[drawingEmotionNumber] > 0) {
        colorTank[drawingEmotionNumber] -= consumeSpeed;
      }
    }

    function addBall() {
      balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, drawingColor, drawingEmotionNumber));

      //感情の色ではない色を追加する場合
      /*
      if (drawingEmotionNumber >= 8) {
        isColor = p.color(hue[drawingEmotionNumber], 100, 100, alpha);
        balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, isColor, drawingEmotionNumber));
        ConsumeColor(drawingEmotionNumber);
      }
      */
      //感情の色の残量がある場合
      /*
      if (colorTank[drawingEmotionNumber] > 0) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        isColor = p.color(hue[drawingEmotionNumber], 100, 100, alpha);
        balls.push(new Ball(p.mouseX, p.mouseY, BALL_SIZE, isColor, drawingEmotionNumber));
        ConsumeColor(drawingEmotionNumber);
      }
      //感情の色がない場合
      else { console.error("色の残量がありません。(" + (emotionName[drawingEmotionNumber]) + ")"); }
      */
    }

    //マウスのクリック中の動作
    function MouseControl() {
      if (clickMode === "draw") { addBall(); }
      //else if (clickMode === "gravity") { moveBallsGravity(p.mouseX, p.mouseY); }
      if (clickMode === "newGravityBall") {
        ballsGravity.push(new Ball(p.mouseX, p.mouseY, 10, p.color(255, 0, 0), 9));
        gravityX.push(p.mouseX);
        gravityY.push(p.mouseY);

        /*
        console.log("gravityX");
        console.log(gravityX);
        console.log("gravityY");
        console.log(gravityY);
        */
      }
    }

    //キーボードによる操作(タイプして離れるまで繰り返し呼び出し)
    p.keyPressed = () => {
      //描画サイズの拡大縮小
      if (p.key === "+") {
        if (adjustMode === "w") { drawingWeight += DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "a") { alpha += DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "b") { backgroundAlpha += DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "sd") { standardDeviationLimit += DRAWING_WEIGHT_CHANGE_SPEED; }
        else if (adjustMode === "resistance") { resistanceValue += 0.01 * DRAWING_WEIGHT_CHANGE_SPEED; }
      }
      if (p.key === "-") {
        if (adjustMode === "w") {
          if (drawingWeight > 0) { drawingWeight -= DRAWING_WEIGHT_CHANGE_SPEED; }
        }
        else if (adjustMode === "a") {
          if (alpha > 0) { alpha -= DRAWING_WEIGHT_CHANGE_SPEED; }
        }
        else if (adjustMode === "b") {
          if (backgroundAlpha > 0) { backgroundAlpha -= DRAWING_WEIGHT_CHANGE_SPEED; }
        }
        else if (adjustMode === "sd") {
          if (standardDeviationLimit > 0) { standardDeviationLimit -= DRAWING_WEIGHT_CHANGE_SPEED; }
        }
        else if (adjustMode === "resistance") {
          if (resistanceValue > 0) {
            resistanceValue -= 0.01 * DRAWING_WEIGHT_CHANGE_SPEED;
          }
        }
      }
    }

    //キーボードによる操作(タイプして離れるまでに1度だけ呼び出し)
    p.keyTyped = () => {
      if (p.key === "s") {
        //スポイト機能
        let input = p.get(p.mouseX, p.mouseY);
        drawingColor = p.color(input[0], input[1], input[2], input[3]);
        if (DEBUG) {
          //console.log("drawingColor: " + drawingColor);
          //console.log("typeof:" + typeof (drawingColor));
        }
      }
      if (p.key === "d") {
        addCameraBalls();
        displayBalls();
        p.saveCanvas('saveInitialCanvas', 'png');
      }
      if (p.key === "i") {
        addImageBalls();
        displayBalls();
      }

      if (p.key === "e") { p.saveCanvas('saveCanvas', 'png'); }
      if (p.key === "w") { adjustMode = "w"; }
      if (p.key === "b") { adjustMode = "b"; }
      if (p.key === "a") { adjustMode = "a"; }
      if (p.key === "v") { adjustMode = "sd"; }
      if (p.key === "t") { adjustMode = "resistance"; }

      if (p.key === ";") { figureMode = "ellipse"; }
      if (p.key === ":") { figureMode = "rect"; }
      if (p.key === "]") { figureMode = "triangle"; }

      if (p.key === 'LEFT_ARROW') { fps -= 0.1; console.log("LEFT_ARROW"); }
      if (p.key === 'RIGHT_ARROW') { fps += 0.1; }

      if (p.key === 'k') { balls.splice(0, balls.length); }

      //ポーズモードの切り替え
      if (p.key === "p") { isPaused = !isPaused; }
      if (p.key === "f") { isFixedGravity = !isFixedGravity; }
      if (p.key === "y") { isTrackingGravity = !isTrackingGravity; }

      //描画された点が動くかどうかの切り替え
      if (p.key === "m") { isMovedStraight = !isMovedStraight; }
      if (p.key === "r") { isRandomMove = !isRandomMove; }
      if (p.key === "g") { isMovedGravity = !isMovedGravity; }
      if (p.key === "u") { isBackground = !isBackground; }

      if (p.key === "c") {
        if (clickMode === "draw") {
          clickMode = "gravity"
          isMouseGravity = true;
          ;
        }
        else if (clickMode === "newGravityBall") {
          clickMode = "draw";
          isMouseGravity = false;
        }
        else if (clickMode === "gravity") {
          clickMode = "newGravityBall";
          isMouseGravity = false;
        }
      }

      //描画色の変更
      if (p.key === "0") { drawingEmotionNumber = 0; }
      if (p.key === "1") { drawingEmotionNumber = 1; }
      if (p.key === "2") { drawingEmotionNumber = 2; }
      if (p.key === "3") { drawingEmotionNumber = 3; }
      if (p.key === "4") { drawingEmotionNumber = 4; }
      if (p.key === "5") { drawingEmotionNumber = 5; }
      if (p.key === "6") { drawingEmotionNumber = 6; }
      if (p.key === "7") { drawingEmotionNumber = 7; }
      if (p.key === "8") { drawingEmotionNumber = 8; }
      if (p.key === "9") { drawingEmotionNumber = 9; }
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
export function ReturnClickMode() { return clickMode; }
export function ReturnIsFixedGravity() { return isFixedGravity; }
export function ReturnIsMovedGravity() { return isMovedGravity; }
export function ReturnIsMovedStraight() { return isMovedStraight; }
export function ReturnIsBackground() { return isBackground; }
export function ReturnMouseColor() { return mouseColor; }
export function ReturnStandardDeviationLimit() { return standardDeviationLimit; }
export function ReturnResistanceValue() { return resistanceValue; }
export function ReturnGravityX() { return gravityX; }
export function ReturnGravityY() { return gravityY; }
export function ReturnCanvasSize() { return [canvasWidth, canvasHeight]; }
export function ReturnMouseXY() { return [mouseX, mouseY]; }
export function ReturnIsMouseGravity() { return isMouseGravity; }
export function ReturnIsTrackingGravity() { return isTrackingGravity; }
export function ReturnDrawingColor() { return returnDrawingColor; }

export default Canvas
