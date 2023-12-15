import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount, ReturnColorsAmount } from './DisplayUsedColorRatio';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

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
    }

    function updateVariables() {
      colorsAmount = ReturnColorsAmount();
      drawingColor = ReturnDrawingColor();
    }

    //最も使用率の高い色相の平均を返す関数
    function returnBaseColor() {
      let color = p.color(0);
      let accentColor = returnAccentColor();
      let hueSum = 0;

      let hueMin = p.hue(usedColors[0].color);
      /*
      for (let i = 0; i < usedColors.length; i++) {
        if (p.hue(usedColors[i].color) === p.hue(returnAccentColor())) { continue; }
        if (p.hue(usedColors[i].color) < hueMin) {
          hueMin = p.hue(usedColors[i].color);
        }
      }
      p.colorMode(p.HSL);
      color = p.color(hueMin + returnSplitHueDifference() * 15 / 2, 50, 50);
      p.colorMode(p.RGB);

      return color;
      */


      for (let i = 0; i < usedColors.length; i++) {
        if (usedColors[i].color === accentColor) { continue; }
        hueSum += p.hue(usedColors[i].color);
      }
      let hueAverage = hueSum / (usedColors.length - 1);
      p.colorMode(p.HSL);
      color = p.color(hueAverage, 50, 50);
      p.colorMode(p.RGB);

      return color;

      /*
      //0をまたぐかどうかの判定
      let flag1 = false, flag2 = false; //両方trueなら0を跨いでいる
      for (let i = 0; i < usedColors.length; i++) {
        let hue = p.hue(usedColors[i].color);
        if (270 <= hue && hue <= 360) { flag1 = true; }
        if (0 <= hue && hue <= 90) { flag2 = true; }
      }

      //0を跨いでいる場合
      if (flag1 && flag2) {
        for (let i = 0; i < usedColors.length; i++) {
          if (usedColors[i].color === accentColor) { continue; }
          let hue = p.hue(usedColors[i].color);
          if (0 <= hue && hue <= 90) { hue = hue + 360; }
          hueSum += p.hue(usedColors[i].color);
        }
        let hueAverage = (hueSum / (usedColors.length - 1)) % 360 + 180;
        p.colorMode(p.HSL);
        color = p.color(hueAverage, 50, 50);
        p.colorMode(p.RGB);

        return color;
      }

      //0を跨いでいない場合
      else {
        for (let i = 0; i < usedColors.length; i++) {
          if (usedColors[i].color === accentColor) { continue; }
          hueSum += p.hue(usedColors[i].color);
        }
        let hueAverage = hueSum / (usedColors.length - 1);
        p.colorMode(p.HSL);
        color = p.color(hueAverage, 50, 50);
        p.colorMode(p.RGB);

        return color;
      }
      */

      /*
      let amountMax = 0;
      let color = p.color(0);
      for (let i = 0; i < usedColors.length; i++) {
        if (usedColors[i].amount > amountMax) {
          amountMax = usedColors[i].amount;
          color = usedColors[i].color;
        }
      }
      return color;
      */
    }

    // キャンバス上でアクセントカラーと判別される色を返す関数
    function returnAccentColor() {
      // 使用色の中でも最も距離が離れている色を使用率が低い色とする
      // hue=[0, 15, 30, 210]があったとき, 210がアクセントカラーとする.

      // 本来アクセントカラーはベースカラー, メインカラーの180度反対の色相にするべき?
      // hue=[0, 15, 30, 210]があったとき, [0, 15, 30]の平均の反対の195をアクセントカラーとする.

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

    //アクセントカラー以外の色の色相差を返す関数
    function returnSplitHueDifference() {
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
        if (i === accentColorNumber) { continue; }
        for (let j = i + 1; j < usedColors.length; j++) {
          if (j === accentColorNumber) { continue; }
          let hueDifference = calculateHueDifference(usedColors[i].color, usedColors[j].color) //色相差の計算
          if (hueDifference > hueDifferenceMax) { hueDifferenceMax = hueDifference; } //色相差の最大の更新
        }
      }

      return hueDifferenceMax;
    }

    function drawRecommendedColors() {
      if (usedColors.length === 0) { return; }

      if (usedColors.length <= 2) {
        let angle = p.hue(returnBaseColor());
        drawLine(angle);
      }
      else if (usedColors.length <= 5) {
        //let angle = p.hue(returnAccentColor()); ////キャンバスのアクセントカラーを頂点として二等辺三角形を描画
        let angle = (p.hue(returnBaseColor()) + 180) % 360; //ベースカラーの補色を頂点として二等辺三角形を描画
        drawTriangle(angle, returnSplitHueDifference());
        //drawTriangle(angle, 2);
        //drawTriangle(angle, 3);
      }
      else if (usedColors.length <= 5) {
        let angle = p.hue(returnBaseColor());
        drawRectangle(angle, 4);
        //drawRectangle(angle, 2);
      }
      else if (usedColors.length >= 6) {
        let angle = p.hue(returnBaseColor());
        //drawRegularPolygon(angle, 3);
        drawRegularPolygon(angle, usedColors.length);
      }
    }

    function drawLine(angle: number) {
      let hueDifference = calculateHueDifference(usedColors[0].color, usedColors[1].color)
      if (hueDifference <= 6) { return; } //色相差が6以下だった場合, 何もせず終了

      //座標の計算
      let x1 = radius * p.cos(p.radians(angle));
      let y1 = radius * p.sin(p.radians(angle));
      let x2 = radius * p.cos(p.radians(angle + 180));
      let y2 = radius * p.sin(p.radians(angle + 180));

      //線の描画
      p.stroke(255, 0, 0, 150);
      p.line(x1, y1, x2, y2);

      //点の描画
      p.stroke(0, 0, 0);
      p.fill(255, 0, 0, 150);
      p.strokeWeight(0.005 * p.width);
      p.ellipse(x1, y1, p.width / 40, p.height / 40);
      p.ellipse(x2, y2, p.width / 40, p.height / 40);
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

export default DisplayUsedColorWheel