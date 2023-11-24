import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from '../Reserch/Canvas';
import ColorTestData from '../../data/colorTestData.json';


let isTouchedColorRatio = false;
let red = 0, green = 0, blue = 0, alpha = 0;

export function DisplayColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = ReturnCanvasSize();
    let jsonData = ColorTestData;
    let hue = jsonData[0].hue, saturation = jsonData[0].saturation, lightness = jsonData[0].lightness;

    p.setup = () => {
      let rate = 0.65;
      p.createCanvas(rate * p.windowWidth / 2, 20);
      //p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0);
      p.noStroke();
      displayColors();

    };


    p.draw = () => {
      p.colorMode(p.HSL, 360, 100, 100);
      isTouchedColorRatio = false;

      if (p.mouseIsPressed) { mouseControl(); }
    };

    function displayColors() {
      for (let i = 0; i < jsonData.length; i++) {
        p.colorMode(p.HSL, 360, 100, 100);
        p.fill(ColorTestData[i].hue, ColorTestData[i].saturation, ColorTestData[i].lightness);
        p.rect(p.width / jsonData.length * i, 0, p.width / jsonData.length, p.height);
      }
    }

    function mouseControl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorRatio = true;
        p.colorMode(p.RGB);
        let getColor = p.get(p.mouseX, p.mouseY);
        let getColorObject = p.color(getColor);
        red = getColor[0];
        green = getColor[1];
        blue = getColor[2];
        alpha = getColor[3];
        // console.log(red, green, blue, alpha);
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnColorRatioValue() {
  return [red, green, blue, alpha];
}
export function ReturnIsTouchedColorRatio() {
  return isTouchedColorRatio;
}

export default DisplayColorRatio