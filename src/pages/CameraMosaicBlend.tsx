import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraMosaicBlend() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      //p.createCanvas(512, 512);
      p.createCanvas(p.windowWidth, p.windowHeight);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
      //p.frameRate(1);
    };

    let splitSize = 8, isDrawingShape = "rect", isBackGround = false;
    const EXPANSION = 3, ALPHA = 50;


    p.draw = () => {
      if (isBackGround) { p.background(0); }
      p.image(capture, 0, 0);

      if (p.mouseIsPressed) {
        if (splitSize === 512) { splitSize = 8; }
        else { splitSize *= 2; }
      }

      if (p.keyIsPressed) {
        if (p.key === "1") { p.blendMode(p.DIFFERENCE); }
        else if (p.key === "2") { p.blendMode(p.DARKEST); }
        else if (p.key === "3") { p.blendMode(p.BURN); }
        else if (p.key === "4") { p.blendMode(p.BLEND); }
        else if (p.key === "5") { p.blendMode(p.OVERLAY); }
        else if (p.key === "6") { p.blendMode(p.HARD_LIGHT); }
        else if (p.key === "7") { p.blendMode(p.SOFT_LIGHT); }
        else if (p.key === "r") { isDrawingShape = "rect"; }
        else if (p.key === "e") { isDrawingShape = "ellipse"; }
        else if (p.key === "b") { isBackGround = !isBackGround;}
      }

      for (let i = 0; i < p.width; i += splitSize) {
        for (let j = 0; j < p.height; j += splitSize) {
          let getColor = p.get(i, j);

          if (getColor[0] !== 0 || getColor[1] !== 0 || getColor[2] !== 0) {
            continue;
          }
          //p.image(capture, i, j, splitSize * EXPANSION, splitSize * EXPANSION);

          p.fill(getColor[0], getColor[1], getColor[2], ALPHA);
          if (isDrawingShape === "rect") { p.rect(i, j, splitSize * EXPANSION, splitSize * EXPANSION); }
          else if (isDrawingShape === "ellipse") { p.ellipse(i, j, splitSize * EXPANSION, splitSize * EXPANSION); }
        }
      }

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraMosaicBlend