import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512, SPLIT = 20;
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
      p.text("画面をクリックしてください。", p.width / 2, p.height / 2);
    };

    let randomSeed: number;

    p.draw = () => {

      randomSeed = p.round(p.random(0, 360));

      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) { GenerateColor(); }


    };

    function generateColor(hue: number) {
      let drawingWidth = p.width - MENU_BAR_WIDTH;
      let drawingHeight = p.height - MENU_BAR_HEIGHT;

      // 特定の色相の表示
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {

          saturation = i * 100 / SPLIT;
          value = j * 100 / SPLIT;

        p.fill(hue, saturation, value);
          p.rect(drawingWidth / SPLIT * j, drawingHeight / SPLIT * i, drawingWidth / SPLIT + 1, drawingHeight / SPLIT + 1);
        }
      }

      // メニューバーの表示
      for (let i = 0; i < p.width; i++) {
        p.fill(360 * i / p.width, 100, 100);
        p.rect(i, drawingHeight + 10, p.width / 360, 20);
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