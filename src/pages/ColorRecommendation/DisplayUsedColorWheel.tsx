import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount, ReturnColorsAmount } from './DisplayUsedColorRatio';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

export function DisplayUsedColorWheel() {
  const sketch = (p: P5CanvasInstance) => {

    let colorsAmount: Array<ColorAmount> = [];
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
      drawUsedColorHue();
      drawDrawingColorHue();
    }

    function updateVariables() {
      colorsAmount = ReturnColorsAmount();
      drawingColor = ReturnDrawingColor();
    }

    function drawUsedColorHue() {
      let SATURATION_LIMIT = 15;
      for (let i = 0; i < colorsAmount.length; i++) {
        if (colorsAmount[i].amount <= 20 || p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT) { continue; }
        let angle = p.hue(colorsAmount[i].color);
        let x = radius * p.cos(p.radians(angle));
        let y = radius * p.sin(p.radians(angle));

        p.noFill();
        p.stroke(255);
        p.strokeWeight(0.005 * p.width);
        p.ellipse(x, y, 0.03 * p.width);
      }
    }
    function drawDrawingColorHue() {
      let angle = p.hue(drawingColor);
      let x = radius * p.cos(p.radians(angle));
      let y = radius * p.sin(p.radians(angle));

      p.noFill();
      p.stroke(0);
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
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUsedColorWheel