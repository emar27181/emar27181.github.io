import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5 from 'p5';
import { calculateLabColorSimilarity } from './CalculateSimilarity';

export function TestDispayIsSameColor() {
  const sketch = (p: P5CanvasInstance) => {

    const SQUARE_WIDTH = 0.04 * (DISPLAY_RATE * window.innerWidth / 3);

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * window.innerWidth / 3, 1.1* DISPLAY_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
      //p.noStroke();
    };

    p.draw = () => {
      p.background(0);

      let count = 1;

      p.fill(255);
      p.textSize(SQUARE_WIDTH);
      p.text(" 　　※以下，HSL色空間による表示", 0, SQUARE_WIDTH);
      const Y_SPACE = 1.2 * SQUARE_WIDTH;

      count++;

      // 色相の差
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(14, 100, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(20, 100, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(25, 100, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(29, 100, 50));
      count++;

      // 彩度の差(->薄)
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 83, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 65, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 50, 50));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 30, 50));

      count++;

      // 明度の差(->明)
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 59));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 65));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 70));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 75));
      count++;

      // 明度の差(->暗)
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 45));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 41));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 36));
      compareColor(0.5 * SQUARE_WIDTH, Y_SPACE * (count++), hslToP5Color(0, 100, 50), hslToP5Color(0, 100, 31));
      count++;
    };

    function hslToP5Color(h: number, s: number, l: number): p5.Color {
      p.colorMode(p.HSL);
      return (p.color(h, s, l));
    }

    function p5ColorToHsl(color: p5.Color) {
      p.colorMode(p.HSL);

      return (p.round(p.hue(color)) + ", " + p.round(p.saturation(color)) + ", " + p.round(p.lightness(color)));
      //return (p.hue(color), p.saturation(color), p.lightness(color));
    }

    function compareColor(x: number, y: number, p5Color1: p5.Color, p5Color2: p5.Color) {
      let simValue = calculateLabColorSimilarity(p5Color1, p5Color2);

      const Y = y + 0.2 * SQUARE_WIDTH;

      p.fill(p5Color1);
      p.rect(x + SQUARE_WIDTH * 3.5, Y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(p5Color2);
      p.rect(x + SQUARE_WIDTH * 11.5, Y, SQUARE_WIDTH, SQUARE_WIDTH);

      p.fill(255);

      p.textSize(SQUARE_WIDTH);
      // p.text(":", x + 1.3 * SQUARE_WIDTH, y + p.textSize());
      //p.text("→ " + p.round(simValue), x + SQUARE_WIDTH * 3.5, y + p.textSize());
      p.text("ΔE(    (" + p5ColorToHsl(p5Color1) + "),     (" + p5ColorToHsl(p5Color2) + ")) = " + p.round(simValue), x + 1.3 * SQUARE_WIDTH, y + p.textSize());
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestDispayIsSameColor