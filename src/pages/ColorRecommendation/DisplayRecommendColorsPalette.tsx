import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE } from '../../config/constants';
import { usedColorsHue, RecommendedColorsHue } from './DisplayUsedColorWheel';

export function DisplayRecommendColorsPalette() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 25);
      p.background(0);
      p.frameRate(1);
    };

    p.draw = () => {
      //console.log(usedColorsHue);
      //console.log(RecommendedColorsHue);
      p.background(0);
      displayColorsHue(usedColorsHue, 0, p.height / 2);
      displayColorsHue(RecommendedColorsHue, p.height / 2, p.height);
      p.strokeWeight(0.001 * window.innerWidth);
      p.stroke(0);
      p.line(0, p.height / 2, p.width, p.height / 2);
    };


    //色相順に使用色を表示させる関数
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
      /*
      for (let i = 0; i < ColorsHue.length; i++) {
        p.fill(ColorsHue[i], 50, 50);
        p.rect(i * (p.width / ColorsHue.length), 0, (i + 1) * (p.width / ColorsHue.length), p.height);
      }
      */
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayRecommendColorsPalette