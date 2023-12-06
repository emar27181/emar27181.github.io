import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';
import Color from 'color';

let returnColor = [0, 0, 0];
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
        //hue = hueBarX / p.width * 360;
        returnColor[0] = hueBarX / p.width * 360;
      }
      //明度と彩度による色の表示のクリック
      if (0 <= p.mouseX && p.mouseX <= p.width && 0 <= p.mouseY && p.mouseY <= p.width) {
        setDrawingColor();
      }
      //キャンバスのクリック
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorGenerate = true;
      }
    }

    function updateVariables() {
      //hue = (hueBarX / p.width) * 360;
      isTouchedColorGenerate = false;
      hue = p.hue(ReturnDrawingColor());
      hueBarX = p.hue(ReturnDrawingColor()) / 360 * p.width;
    }

    function setDrawingColor() {
      let color = p.get(p.mouseX, p.mouseY);
      returnColor = [p.hue(color), p.saturation(color), p.lightness(color)];
    }

    function displayDrawingColorInfo() {
      p.noStroke();
      p.fill(255);
      let color = ReturnDrawingColor();
      let text = "rgba(" + p.round(p.red(color)) + "," + p.round(p.green(color)) + "," + p.round(p.blue(color)) + "," + p.round(p.alpha(color)) + ")";
      p.text(text, 0, p.width + 45);
      text = "hsl(" + p.round(p.hue(color)) + "," + p.round(p.saturation(color)) + "," + p.round(p.lightness(color)) + ")";
      p.text(text, 0, p.width + 60);
      text = "hsb(" + p.round(p.hue(color)) + "," + p.round(p.saturation(color)) + "," + p.round(p.brightness(color)) + ")";
      p.text(text, 0, p.width + 75);
      let hex = p.hex([p.red(color), p.green(color), p.blue(color)], 2);
      text = ("#" + hex[0] + hex[1] + hex[2]);
      p.text(text, 0, p.width + 90);
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
      let brightness = p.round(p.brightness(ReturnDrawingColor()));
      let x = 0, y = 0;

      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          /*
          let getColor = p.color(p.get(x, y));
          let getSaturation = p.round(p.saturation(getColor));
          let getBrightness = p.round(p.brightness(getColor));
          if (saturation === getSaturation && brightness === getBrightness) {
            p.fill(0);
            p.rect(x, y, p.width / SPLIT);
          }
          */

          if (saturation === (j / SPLIT * 100) && brightness === (i / SPLIT * 100)) {
            p.fill(0);
            p.rect(p.width / SPLIT * i, p.width / SPLIT * j, p.width / SPLIT);
          }

          x += p.width / SPLIT;
        }
        y += p.width / SPLIT;
        x = 0;
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

export function ReturnColorPaletteValue() {
  return returnColor;
}

export function ReturnIsTouchedColorGenerate() {
  return isTouchedColorGenerate;
}


export default ColorGanerateRe