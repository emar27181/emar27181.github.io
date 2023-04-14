import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512, SPLIT = 10;
    let isColorChanged = false;

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0);
      p.frameRate(10);
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();

      p.fill("#FFFFFF");
      p.textSize(20);
      p.textAlign("center", "center");
      p.text("画面をクリックしてください。", p.width/2 , p.height/2);
    };

    let randomSeed: number;

    p.draw = () => {

      randomSeed = p.round(p.random(0, 360));

      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) {GenerateColor();}
      

    };

    function GenerateColor() {
      let hue = randomSeed;

      for (let i = 0; i < SPLIT; i++) {

      let saturation = i * 100/SPLIT + 100/SPLIT;
      let value = i * 100/SPLIT + 100/SPLIT;
      
        p.fill(hue, saturation, value);
        p.rect(p.width/SPLIT * i, 0, p.width / SPLIT, p.height);
      }
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