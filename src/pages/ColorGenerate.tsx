import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    let isColorChanged = false;

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0);
      p.frameRate(10);
      p.colorMode(p.HSB, 360, 100, 100);
    };

    let randomSeed: number;

    p.draw = () => {

      randomSeed = p.round(p.random(0, 360));

      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) {GenerateColor();}
      

    };

    function GenerateColor() {
      p.fill(randomSeed, 50, 50);
      p.rect(0, 0, p.width / 4, p.height);
      p.fill(randomSeed, 100, 100);
      p.rect(p.width/4, 0, p.width / 4 , p.height)
    }

    function oparateKeyboard(key: string) {
      switch (key) {
        case "c": isColorChanged = !isColorChanged; break;
        default: break;
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorGanerate