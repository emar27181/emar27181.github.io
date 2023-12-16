import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount, ReturnColorsAmount } from './DisplayUsedColorRatio';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

let isTouched = false;
let returnColor: number[] = [0, 0, 0, 255];

export function DisplayUsedColorWheel() {
  const sketch = (p: P5CanvasInstance) => {

    let colorsAmount: Array<ColorAmount> = [];
    let usedColors: Array<UsedColor> = [];
    let drawingColor: p5.Color;
    let radius = 0;
    const DEBUG = false;

    p.setup = () => {
      let rate = 0.35;
      p.createCanvas(rate * window.innerWidth / 3, rate * window.innerWidth / 3);
      p.noStroke();
      radius = 3 / 8 * p.width;
      p.frameRate(1);
    }

    p.draw = () => {
      updateVariables();
      p.background(0);
      p.translate(p.width / 2, p.height / 2);

      drawColorWheel(radius, 1);
      updateUsedColors();
      drawUsedColors();
      drawRecommendedColors();
      drawColorHueDot(p.color(255), radius * p.cos(p.radians(p.hue(drawingColor))), radius * p.sin(p.radians(p.hue(drawingColor))));
      //console.log(usedColors)
      if (DEBUG) { console.log("usedColors.length: " + usedColors.length); }

      if (p.mouseIsPressed) { mousePressed(); }
    }

    function mousePressed() {
      // 描画色の色相を変更
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouched = true;
        let radians = p.atan2(p.mouseY - p.width / 2, p.mouseX - p.width / 2);
        let degree = p.round((radians * 180) / p.PI);
        const SPLIT = 15; //SPLIT: 分割する角度
        degree = p.round(degree / SPLIT) * SPLIT;
        degree = (degree + 360) % 360;
        returnColor = [degree, p.saturation(ReturnDrawingColor()), p.lightness(ReturnDrawingColor())];
      }
    }

    function updateVariables() {
      colorsAmount = ReturnColorsAmount();
      drawingColor = ReturnDrawingColor();
      isTouched = false;
    }

    function drawRecommendedColors() {

      //描画色が0色だった場合
      if (usedColors.length === 0) { return; }

      //描画色が1色だった場合
      else if (usedColors.length === 1) {
        let angle = p.hue(usedColors[0].color);
        drawLineIdea(angle);
      }

      //描画色が2色以下だった場合
      else if (usedColors.length === 2) {
        let angle = p.hue(returnBaseColor());
        drawLineModify(angle);
      }

      //描画色が5色以下だった場合
      else if (usedColors.length <= 5) {
        // 全体の色相差が4(60°)以下だった場合
        // 隣接・類似色相配色の推薦
        if (returnHueDifference(false) <= 4) {
          //推薦しなくとも隣接・類似色相配色になっているはず？
        }

        // 全体の色相差が4(60°)より大きい場合
        // 色相の分割による配色の推薦
        else {
          // アクセントカラーを除いた色相差が4(60°)以下だった場合
          // スプリットコンプリメンタリー, トライアドの推薦
          if (returnHueDifference(true) <= 4) {
            //let angle = p.hue(returnAccentColor()); ////キャンバスのアクセントカラーを頂点として二等辺三角形を描画
            let angle = (p.hue(returnBaseColor()) + 180) % 360; //ベースカラーの補色を頂点として二等辺三角形を描画
            drawTriangle(angle, returnHueDifference(true));
          }
          // アクセントカラーを除いた色相差が4(60°)より大きい場合
          // テトラードの推薦
          else {
            let angle = p.hue(returnBaseColor());
            drawRegularPolygon(angle, usedColors.length);
          }
        }
      }

      //描画色が6色以上だった場合
      else if (usedColors.length >= 6) {
        let angle = p.hue(returnBaseColor());
        drawRegularPolygon(angle, usedColors.length);
      }
    }

    //最も使用率の高い色相の平均を返す関数
    function returnBaseColor() {
      let color = p.color(0);
      let cosSum = 0;
      let sinSum = 0;
      for (let i = 0; i < usedColors.length; i++) {
        if (p.hue(usedColors[i].color) === p.hue(returnAccentColor())) { continue; }
        let angle = p.hue(usedColors[i].color);
        let radians = (angle * p.PI) / 180;
        cosSum += p.cos(radians);
        sinSum += p.sin(radians);
      }
      let cosAverage = cosSum / (usedColors.length - 1);
      let sinAverage = sinSum / (usedColors.length - 1);
      let radAverage = p.atan2(sinAverage, cosAverage);
      let degreeAverage = p.round((radAverage * 180) / p.PI);
      degreeAverage = (degreeAverage + 360) % 360;

      p.colorMode(p.HSL);
      color = p.color(degreeAverage, 50, 50);
      p.colorMode(p.RGB);
      return color;
    }

    // キャンバス上でアクセントカラーと判別される色を返す関数
    function returnAccentColor() {
      // 使用色の中でも最も距離が離れている色を使用率が低い色とする
      // hue=[0, 15, 30, 210]があったとき, 210がアクセントカラーとする.

      let distance: number[] = [];
      // 各色相における距離の計算
      // 現在は[i+1], [i+2]の色相を基準に色相差を算出しているため, 
      // 四角形以上の場合正しく色相差を算出できないことがある.(2023/12/15時点)
      for (let i = 0; i < usedColors.length; i++) {
        distance[i] = 0;
        let x1 = usedColors[i].position.x;
        let y1 = usedColors[i].position.y;

        let index = (i + 1) % usedColors.length;
        let x2 = usedColors[index].position.x;
        let y2 = usedColors[index].position.y;
        distance[i] += p.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

        index = (i + 2) % usedColors.length;
        x2 = usedColors[index].position.x;
        y2 = usedColors[index].position.y;
        distance[i] += p.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      }

      //距離の最大値の更新
      let maxDistance = 0;
      let maxDistanceIndexNumber = 0;
      for (let i = 0; i < distance.length; i++) {
        if (distance[i] > maxDistance) {
          maxDistance = distance[i];
          maxDistanceIndexNumber = i;
        }
      }
      return usedColors[maxDistanceIndexNumber].color;
    }

    //2色間の色相差を計算する関数
    function calculateHueDifference(color1: p5.Color, color2: p5.Color) {
      let hueDifference = (p.hue(color1) - p.hue(color2)) / 15; //色相差の計算
      if (hueDifference < 0) { hueDifference = -hueDifference; } //色相差を絶対値に変換
      if (hueDifference > 12) { hueDifference = 24 - hueDifference; } //色相差を0~12の値に変換
      return hueDifference;
    }

    //使用色の最も大きい色相差を返す関数
    function returnHueDifference(isExcludeAccentColor: boolean) {
      //isExcludeAccentColor: アクセントカラーを除外して色相差を計算するかを保存する変数

      let accentColor = returnAccentColor();
      let accentColorNumber = 0;
      let hueDifferenceMax = 0;

      //アクセントカラーのインデックス番号の代入
      for (let i = 0; i < usedColors.length; i++) {
        if (usedColors[i].color === accentColor) {
          accentColorNumber = i;
        }
      }

      for (let i = 0; i < usedColors.length; i++) {
        if (i === accentColorNumber && isExcludeAccentColor) { continue; }
        for (let j = i + 1; j < usedColors.length; j++) {
          if (j === accentColorNumber && isExcludeAccentColor) { continue; }
          let hueDifference = calculateHueDifference(usedColors[i].color, usedColors[j].color) //色相差の計算
          if (hueDifference > hueDifferenceMax) { hueDifferenceMax = hueDifference; } //色相差の最大の更新
        }
      }

      return hueDifferenceMax;
    }

    // 与えられた角度の座標と与えられた色相差の角度の座標に線を結ぶ関数
    function drawLine(angle: number, hueDifference: number, color: p5.Color) {
      //座標の計算
      let x1 = radius * p.cos(p.radians(angle));
      let y1 = radius * p.sin(p.radians(angle));
      let x2 = radius * p.cos(p.radians(angle + hueDifference * 15));
      let y2 = radius * p.sin(p.radians(angle + hueDifference * 15));

      //線の描画
      p.stroke(color);
      p.line(x1, y1, x2, y2);

      //点の描画
      p.stroke(0, 0, 0);
      p.fill(color);
      p.strokeWeight(0.005 * p.width);
      p.ellipse(x1, y1, p.width / 40, p.height / 40);
      p.ellipse(x2, y2, p.width / 40, p.height / 40);
    }


    function drawLineModify(angle: number) {
      if (usedColors.length === 1) { return; }
      let hueDifference = calculateHueDifference(usedColors[0].color, usedColors[1].color)
      if (hueDifference <= 6) { return; } //色相差が6以下だった場合, 何もせず終了

      drawLine(angle, 12, p.color(255, 0, 0, 150));
    }

    // 塗られていない色のアイデアを直線で表示する関数
    function drawLineIdea(angle: number) {
      //補色の描画
      drawLine(angle, 12, p.color(0, 255, 0, 150));
      //類似色の描画
      drawLine(angle, 2, p.color(0, 255, 0, 150));
      drawLine(angle, -2, p.color(0, 255, 0, 150));
    }


    function drawTriangle(angle: number, hueDifference: number) {
      //hueDifference: 分裂された2つの色相"間"の色相差
      //色相差が2(30度)であれば, 色相差を1(15度)で左右に分裂する

      //座標の計算
      let x1 = radius * p.cos(p.radians(angle));
      let y1 = radius * p.sin(p.radians(angle));
      let x2 = radius * p.cos(p.radians(angle + 180 - 15 * hueDifference / 2));
      let y2 = radius * p.sin(p.radians(angle + 180 - 15 * hueDifference / 2));
      let x3 = radius * p.cos(p.radians(angle + 180 + 15 * hueDifference / 2));
      let y3 = radius * p.sin(p.radians(angle + 180 + 15 * hueDifference / 2));

      //線の描画
      p.stroke(255, 0, 0);
      p.noFill();
      p.triangle(x1, y1, x2, y2, x3, y3);
      //点の描画
      p.stroke(0, 0, 0);
      p.fill(255, 0, 0, 150);
      p.strokeWeight(0.005 * p.width);
      p.ellipse(x1, y1, p.width / 40, p.height / 40);
      p.ellipse(x2, y2, p.width / 40, p.height / 40);
      p.ellipse(x3, y3, p.width / 40, p.height / 40);
    }

    function drawRectangle(angle: number, hueDifference: number) {
      //座標の計算
      let x1 = radius * p.cos(p.radians(angle));
      let y1 = radius * p.sin(p.radians(angle));
      let x2 = radius * p.cos(p.radians(angle + 15 * hueDifference));
      let y2 = radius * p.sin(p.radians(angle + 15 * hueDifference));
      let x3 = radius * p.cos(p.radians(angle + 180));
      let y3 = radius * p.sin(p.radians(angle + 180));
      let x4 = radius * p.cos(p.radians(angle + 180 + 15 * hueDifference));
      let y4 = radius * p.sin(p.radians(angle + 180 + 15 * hueDifference));

      //線の描画
      p.stroke(255, 0, 0);
      p.noFill();
      p.quad(x1, y1, x2, y2, x3, y3, x4, y4);
      //点の描画
      p.stroke(0, 0, 0, 150);
      p.strokeWeight(0.005 * p.width);
      p.fill(255, 0, 0);
      p.ellipse(x1, y1, p.width / 40, p.height / 40);
      p.ellipse(x2, y2, p.width / 40, p.height / 40);
      p.ellipse(x3, y3, p.width / 40, p.height / 40);
      p.ellipse(x4, y4, p.width / 40, p.height / 40);
    }


    function drawRegularPolygon(angle: number, number: number) {
      for (let i = 0; i < number; i++) {
        //座標の計算
        let x1 = radius * p.cos(p.radians(angle));
        let y1 = radius * p.sin(p.radians(angle));
        let x2 = radius * p.cos(p.radians(angle + 360 / number));
        let y2 = radius * p.sin(p.radians(angle + 360 / number));
        angle += 360 / number;

        //線の描画
        p.stroke(255, 0, 0, 150);
        p.line(x1, y1, x2, y2);
        //点の描画
        p.fill(255, 0, 0, 150);
        p.ellipse(x1, y1, p.width / 40, p.height / 40);
      }
    }

    function drawUsedColors() {
      if (usedColors.length === 0) { return }

      //点の描画
      for (let i = 0; i < usedColors.length; i++) {
        drawColorHueDot(p.color(0), usedColors[i].position.x, usedColors[i].position.y);
      }

      //線の描画
      let x1 = usedColors[0].position.x;
      let y1 = usedColors[0].position.y;
      let hue = p.round(p.hue(usedColors[0].color));

      for (let i = hue; i <= hue + 360; i++) {
        for (let j = 0; j < usedColors.length; j++) {
          if (p.round(p.hue(usedColors[j].color)) === ((i % 360))) {
            let x2 = usedColors[j].position.x;
            let y2 = usedColors[j].position.y;

            p.stroke(0);
            p.line(x1, y1, x2, y2);

            x1 = x2;
            y1 = y2;
          }
        }
      }
      //最後の点と最初の点の間の線の描画
      p.stroke(0);
      p.line(x1, y1, usedColors[0].position.x, usedColors[0].position.y);

    }

    function updateUsedColors() {
      resetUsedColors();
      p.colorMode(p.RGB);
      let SATURATION_LIMIT = 20;
      let LIGHTNESS_UPPER_LIMIT = 80;
      let LIGHTNESS_LOWER_LIMIT = 25;
      let AMOUNT_LIMIT = 3;

      for (let i = 0; i < colorsAmount.length; i++) {
        if (colorsAmount[i].amount < AMOUNT_LIMIT ||
          p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT ||
          p.lightness(colorsAmount[i].color) >= LIGHTNESS_UPPER_LIMIT ||
          p.lightness(colorsAmount[i].color) <= LIGHTNESS_LOWER_LIMIT) {
          continue;
        }
        let hue = p.hue(colorsAmount[i].color);
        // if ((8 <= hue && hue <= 11) || (32 <= hue && hue <= 34)) { continue; } 

        let angle = p.hue(colorsAmount[i].color);

        updateUsedColor(colorsAmount[i].color, colorsAmount[i].amount);
      }

    }

    function resetUsedColors() {
      usedColors = [];
    }

    function updateUsedColor(color: p5.Color, amount: number,) {
      let hue = p.round(p.hue(color));
      const SPLIT = 15; //SPLIT: 分割する角度(この値で四捨五入(?)される)
      hue = p.round(hue / SPLIT) * SPLIT;
      if (hue === 360) { hue = 0; }

      for (let i = 0; i < usedColors.length; i++) {
        //すでに保存されていた色相だった場合
        if (p.round(p.hue(usedColors[i].color)) === hue) {
          usedColors[i].amount += amount;
          return;
        }
      }

      //まだ保存されていなかった色相だった場合
      p.colorMode(p.HSL);
      let x = radius * p.cos(p.radians(hue));
      let y = radius * p.sin(p.radians(hue));
      usedColors.push(new UsedColor(p.color(hue, 50, 50), amount, x, y));
      p.colorMode(p.RGB);
      if (DEBUG) { console.log(hue); }
    }

    function drawColorHueDot(color: p5.Color, x: number, y: number) {

      p.stroke(0);
      p.fill(color);
      //p.line(0, 0, x, y);
      p.strokeWeight(0.005 * p.width);
      p.ellipse(x, y, 0.03 * p.width);
    }

    function drawColorWheel(radius: number, resolution: number) {
      for (let angle = 0; angle < 360; angle += resolution) {
        let hue = angle;
        let color = p.color('hsb(' + hue + ', 100%, 100%)');

        // 極座標から直交座標に変換
        let x = radius * p.cos(p.radians(angle));
        let y = radius * p.sin(p.radians(angle));

        // 中心から色相環への線を描画
        p.stroke(color);
        p.line(0, 0, x, y);

        // 色相環の点を描画
        p.fill(color);
        p.ellipse(x, y, p.width / 40, p.height / 40);
      }

      //色相差を表す点の追加
      for (let angle = 0; angle < 360; angle += 30) {
        let x = radius * p.cos(p.radians(angle));
        let y = radius * p.sin(p.radians(angle));

        p.noFill();
        p.stroke(0, 0, 0, 100);
        p.ellipse(x, y, p.width / 40, p.height / 40);
      }
    }
    class UsedColor {
      color: p5.Color;
      amount: number;
      position: p5.Vector;

      constructor(color: p5.Color, amount: number, x: number, y: number) {
        this.color = color;
        this.amount = amount;
        this.position = p.createVector(x, y);
      }
    }
  }



  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnIsTouchedUsedColorWheel() { return isTouched; }
export function ReturnColorWheelColor() { return returnColor; }

export default DisplayUsedColorWheel