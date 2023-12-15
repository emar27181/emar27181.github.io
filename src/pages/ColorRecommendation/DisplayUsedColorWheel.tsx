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

    function returnBaceColor() {
      let amountMax = 0;
      let color = p.color(0);
      for (let i = 0; i < usedColors.length; i++) {
        if (usedColors[i].amount > amountMax) {
          amountMax = usedColors[i].amount;
          color = usedColors[i].color;
        }
      }
      return color;
    }

    function drawRecommendedColors() {
      if (usedColors.length === 0) { return; }

      let angle = p.hue(returnBaceColor());
      drawTriangle(angle, 2);
      //drawTriangle(angle, 3);
      //drawRegularPolygon(angle, 3);
      //drawRegularPolygon(angle, usedColors.length);
    }

    function drawTriangle(angle: number, hueDifference: number) {
      //座標の計算
      let x1 = radius * p.cos(p.radians(angle));
      let y1 = radius * p.sin(p.radians(angle));
      let x2 = radius * p.cos(p.radians(angle + 180 - 15 * hueDifference));
      let y2 = radius * p.sin(p.radians(angle + 180 - 15 * hueDifference));
      let x3 = radius * p.cos(p.radians(angle + 180 + 15 * hueDifference));
      let y3 = radius * p.sin(p.radians(angle + 180 + 15 * hueDifference));
      //let x2 = radius * p.cos(p.radians(angle + 150));
      //let y2 = radius * p.sin(p.radians(angle + 150));
      //let x3 = radius * p.cos(p.radians(angle + 210));
      //let y3 = radius * p.sin(p.radians(angle + 210));

      //線の描画
      p.stroke(255, 0, 0, 150);
      p.noFill();
      p.triangle(x1, y1, x2, y2, x3, y3);
      //点の描画
      p.fill(255, 0, 0, 150);
      p.ellipse(x1, y1, p.width / 40, p.height / 40);
      p.ellipse(x2, y2, p.width / 40, p.height / 40);
      p.ellipse(x3, y3, p.width / 40, p.height / 40);
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
      let SATURATION_LIMIT = 15;
      let LIGHTNESS_LIMIT = 88;
      let AMOUNT_LIMIT = 4;

      for (let i = 0; i < colorsAmount.length; i++) {
        if (colorsAmount[i].amount < AMOUNT_LIMIT ||
          p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT ||
          p.lightness(colorsAmount[i].color) >= LIGHTNESS_LIMIT) {
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
      const SPLIT = 30; //SPLIT: 分割する角度(この値で四捨五入(?)される)
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

      p.stroke(color);
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