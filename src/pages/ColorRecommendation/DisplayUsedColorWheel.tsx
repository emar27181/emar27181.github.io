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

    p.setup = () => {
      let rate = 0.35;
      p.createCanvas(rate * window.innerWidth / 3, rate * window.innerWidth / 3);
      p.noStroke();
      radius = 3 / 8 * p.width;
    }

    p.draw = () => {
      updateVariables();
      p.background(0);
      p.translate(p.width / 2, p.height / 2);

      drawColorWheel(radius, 1);
      drawUsedColorsHue();
      drawColorHue(p.color(0), p.hue(drawingColor));
      drawUsedColorsLine();
      //console.log(usedColors)
    }

    function drawUsedColorsLine() {
      for (let i = 0; i < usedColors.length; i++) {
        for (let j = i + 1; j < usedColors.length; j++) {
          p.stroke(255);
          p.line(usedColors[i].position.x, usedColors[i].position.y, usedColors[j].position.x, usedColors[j].position.y);
        }
      }
    }

    function updateVariables() {
      colorsAmount = ReturnColorsAmount();
      drawingColor = ReturnDrawingColor();
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      //console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }

    function drawUsedColorsHue() {
      p.colorMode(p.RGB);
      let SATURATION_LIMIT = 15;
      for (let i = 0; i < colorsAmount.length; i++) {
        if (colorsAmount[i].amount <= 10 || p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT) { continue; }
        let hue = p.hue(colorsAmount[i].color);
        if ((9 <= hue && hue <= 11) || (32 <= hue && hue <= 34)) { continue; }

        let angle = p.hue(colorsAmount[i].color);
        drawColorHue(p.color(255), angle);

        let x = radius * p.cos(p.radians(angle));
        let y = radius * p.sin(p.radians(angle));
        updateUsedColors(colorsAmount[i].color, x, y);
      }
    }

    function updateUsedColors(color: p5.Color, x: number, y: number) {
      for (let i = 0; i < usedColors.length; i++) {
        if (p.hue(usedColors[i].color) === p.hue(color)) { return; }
      }
      usedColors.push(new UsedColor(color, x, y));
    }

    function drawColorHue(color: p5.Color, angle: number) {
      let x = radius * p.cos(p.radians(angle));
      let y = radius * p.sin(p.radians(angle));

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
    }
    class UsedColor {
      color: p5.Color;
      position: p5.Vector;

      constructor(color: p5.Color, x: number, y: number) {
        this.color = color;
        this.position = p.createVector(x, y);
      }
    }
  }



  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorWheel