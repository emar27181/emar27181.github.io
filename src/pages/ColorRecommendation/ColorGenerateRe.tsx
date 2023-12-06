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
    const SPLIT = 100;

    p.setup = () => {
      p.createCanvas(200, 300);
      p.background(0);
      p.textSize(10);
    };

    p.draw = () => {
      updateVariables();
      if (p.mouseIsPressed) { mousePressed(); }
      p.background(0);
      //p.fill(255);
      displayColors();
      displayColorsDot();
      displayHueBar();
      displayHueBarButton();
      displayDrawingColor();
      displayDrawingColorInfo();
    };

    function mousePressed() {
      //色相バーのクリック
      if (0 <= p.mouseX && p.mouseX <= p.width && p.width + 10 <= p.mouseY && p.mouseY <= p.width + 30) {
        hueBarX = p.mouseX;
      }
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorGenerate = true;
      }
    }

    function updateVariables() {
      //hue = (hueBarX / p.width) * 360;
      isTouchedColorGenerate = false;
      hue = p.hue(ReturnDrawingColor());
    }

    function displayDrawingColorInfo() {
      p.noStroke();
      p.fill(255);
      let color = ReturnDrawingColor();
      let text = "rgba(" + p.red(color) + "," + p.green(color) + "," + p.blue(color) + "," + p.alpha(color) + ")";
      p.text(text, 0, p.width + 45);
      text = "hsl(" + p.round(p.hue(color)) + "," + p.round(p.saturation(color)) + "," + p.round(p.lightness(color)) + ")";
      p.text(text, 0, p.width + 60);
      let hex = p.hex([p.red(color), p.green(color), p.blue(color)], 2);
      text = ("#" + hex[0] + hex[1] + hex[2]);
      p.text(text, 0, p.width + 75);
    }

    function displayDrawingColor() {
      p.stroke(255);
      p.fill(ReturnDrawingColor());
      p.rect(p.width - 30, p.height - 30, 20, 20);
    }

    function displayColors() {
      p.colorMode(p.HSB);
      p.noStroke();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          p.fill(hue, j / SPLIT * 100, i / SPLIT * 100);
          p.rect(p.width / SPLIT * i, p.width / SPLIT * j, p.width / SPLIT, p.width / SPLIT);
        }
      }
    }

    function displayColorsDot() {
      p.colorMode(p.HSB);
      let saturation = p.round(p.saturation(ReturnDrawingColor()));
      let blightness = p.round(p.brightness(ReturnDrawingColor()));

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          if (saturation === (j / SPLIT * 100) && blightness === (i / SPLIT * 100)) {
            p.fill(0);
            p.rect(p.width / SPLIT * i, p.width / SPLIT * j, p.width / SPLIT);
          }
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

export function ReturnIsTouchedColorGenerate() {
  return isTouchedColorGenerate;
}


export default ColorGanerateRe