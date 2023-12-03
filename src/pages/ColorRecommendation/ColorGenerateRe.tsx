import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

let red = 255, green = 0, blue = 0, alpha = 255, h = 0, s = 50, b = 50;
let returnColor: p5.Color;
let isTouchedColorGenerate = false;

export function ColorGanerateRe() {
  const sketch = (p: P5CanvasInstance) => {

    let hue = 0;
    let hueBarX = 50;

    p.setup = () => {
      p.createCanvas(200, 300);
      p.background(0);
    };

    p.draw = () => {
      updateVariables();
      p.fill(255);
      displayColors();
      displayHueBar();
      displayHueBarButton();
    };

    function updateVariables() {
      hue = (hueBarX / p.width) * 360;
    }

    function displayColors() {
      const SPLIT = 100;
      p.colorMode(p.HSB);
      p.noStroke();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          p.fill(hue, j / SPLIT * 100, i / SPLIT * 100);
          p.rect(p.width / SPLIT * i, p.width / SPLIT * j, p.width / SPLIT, p.width / SPLIT);
        }
      }
    }

    function displayHueBar() {
      for (let i = 0; i < 360; i++) {
        p.noStroke();
        p.colorMode(p.HSL, 360, 100, 100);
        p.fill(i, 100, 50);
        p.rect(p.width / 360 * i, p.width + 10, p.width / 360, 20);
      }
    }

    function displayHueBarButton() {
      p.colorMode(p.RGB);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(0.3);
      p.rect(hueBarX, p.width + 10, 2, 20);
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorGanerateRe