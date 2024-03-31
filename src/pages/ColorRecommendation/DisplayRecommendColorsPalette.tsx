import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';
import { usedColorsHue, RecommendedColorsHue } from './DisplayUsedColorWheel';
import p5 from 'p5';

export function DisplayRecommendColorsPalette() {
  const sketch = (p: P5CanvasInstance) => {
    const ONE_COLOR_PALETTE_SIZE = 0.03 * window.innerWidth;

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3);
      //p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 25);
      p.background(0);
      p.frameRate(1);
    };

    p.draw = () => {
      p.background(0);

      displayColorsHue(usedColorsHue, 0, 0);
      drawArrow(p.createVector(ONE_COLOR_PALETTE_SIZE / 2, 1.2 * ONE_COLOR_PALETTE_SIZE), 0.5 * ONE_COLOR_PALETTE_SIZE, p.PI / 2); // 例: 45度の角度で100ピクセルの矢印を描画
      displayColorsHue(RecommendedColorsHue, 0, 2 * ONE_COLOR_PALETTE_SIZE);

      p.strokeWeight(0.001 * window.innerWidth);
      p.stroke(0);
      p.line(0, p.height / 2, p.width, p.height / 2);
    };


    function displayColorsHue(colorsHue: number[], x: number, y: number) {
      p.colorMode(p.HSL);
      p.strokeWeight(0.01 * p.width);
      for (let i = 0; i < colorsHue.length; i++) {
        p.stroke(0);
        p.fill(colorsHue[i], 50, 50);
        p.rect(x + i * ONE_COLOR_PALETTE_SIZE, y, ONE_COLOR_PALETTE_SIZE, ONE_COLOR_PALETTE_SIZE);
        //確認用出力
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.noStroke();
        p.text(colorsHue[i], x + i * ONE_COLOR_PALETTE_SIZE + ONE_COLOR_PALETTE_SIZE / 2, y + ONE_COLOR_PALETTE_SIZE / 2);
      }
    }

    // 矢印を描画する関数
    function drawArrow(base: p5.Vector, len: number, angle: number) {
      p.stroke(255);
      p.fill(255);
      p.push(); // 座標系を保存

      // 矢印の軸の向きを決定
      p.translate(base.x, base.y);
      p.rotate(angle);

      // 矢印の本体を描画
      p.line(0, 0, len, 0);

      // 矢印の先端を描画
      p.translate(len, 0);
      p.triangle(-len * 0.05, len * 0.03, 0, 0, -len * 0.05, -len * 0.03);

      p.pop(); // 座標系を復元
    }

    //色相順に使用色を表示させる関数
    /*
    function displayColorsHue(ColorsHue: number[], y1: number, y2: number) {
      p.colorMode(p.HSL);
      p.noStroke();
      let x = 0;
      for (let i = 0; i < 360; i++) {
        for (let j = 0; j < ColorsHue.length; j++) {
          //if (p.round(ColorsHue[j] / 15) * 15 === i) {
          if (p.round(ColorsHue[j]) === i) {
            p.fill(ColorsHue[j], 100, 50);
            //p.fill(0, 50, 50);
            p.rect(x, y1, x + (p.width / ColorsHue.length), y2);
            //p.rect(i * (p.width / ColorsHue.length), 0, (i + 1) * (p.width / ColorsHue.length), p.height);
            x += p.width / ColorsHue.length;
            //console.log(i);
          }
        }
      }
    }
    */
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayRecommendColorsPalette