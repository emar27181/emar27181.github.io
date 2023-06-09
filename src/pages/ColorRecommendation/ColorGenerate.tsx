import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 300, MENU_BAR_WIDTH = 0, MENU_BAR_HEIGHT = 100,
      DRAWING_WIDTH = CANVAS_WIDTH - MENU_BAR_WIDTH, DRAWING_HEIGHT = CANVAS_HEIGHT - MENU_BAR_HEIGHT,
      HUE_BAR_WIDTH = 3, HUE_BAR_HEIGHT = 20, MARGIN_HEIGHT = 10, TEXT_SIZE = 10,
      SPLIT = 20, DEBUG = true;
    let isColorChanged = false, hue = 100, saturation = 0, value = 0;
    let hueBarX = 100, HUE_BAR_Y = CANVAS_HEIGHT - MENU_BAR_HEIGHT + MARGIN_HEIGHT;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.frameRate(10);
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();
    };

    let randomSeed: number;

    p.draw = () => {

      p.background(0);
      randomSeed = p.round(p.random(0, 360));
      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) { oparateMouse(); }

      hue = 360 * hueBarX / CANVAS_WIDTH;
      generateColor(hue);

      if (DEBUG) {
        //console.log("mouseX: " + p.mouseX + " y: " + p.mouseY);
      }
    };

    function generateObject() {
      // 色相バーの表示
      p.fill(255);
      p.rect(hueBarX, HUE_BAR_Y, HUE_BAR_WIDTH, HUE_BAR_HEIGHT);

    }

    function oparateMouse() {
      //色相バーの処理
      if (HUE_BAR_Y < p.mouseY && p.mouseY < HUE_BAR_Y + HUE_BAR_HEIGHT) {
        hueBarX = p.mouseX;
      }


    }

    function displayColorInfo() {
      let getColor = p.get(p.mouseX, p.mouseY);
      let getColorObject = p.color(getColor);
      let h = p.round(p.hue(getColorObject));
      let s = p.round(p.saturation(getColorObject));
      let b = p.round(p.brightness(getColorObject));
      p.textSize(TEXT_SIZE);
      p.text(getColorObject, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT);
      let text = "hsb(" + h + "," + s + "," + b + ")" + "←なんかバグってる";
      p.text(text, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT + TEXT_SIZE);
      text = '#' + p.hex(getColor);
      //text = '#' + p.hex(getColorObject); 
      //text = getColor.toString("rrggbb");
      p.text(text, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT + TEXT_SIZE * 2);
    }

    function generateColor(hue: number) {

      // 特定の色相の表示
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {

          saturation = i * 100 / SPLIT;
          value = j * 100 / SPLIT;

          p.fill(hue, saturation, value);
          p.rect(DRAWING_WIDTH / SPLIT * j, DRAWING_HEIGHT / SPLIT * i, DRAWING_WIDTH / SPLIT + 1, DRAWING_HEIGHT / SPLIT + 1);
        }
      }

      // 色相バーの表示
      for (let i = 0; i < p.width; i++) {
        p.fill(360 * i / p.width, 100, 100);
        p.rect(i, HUE_BAR_Y, p.width / 360, HUE_BAR_HEIGHT);
      }
      generateObject();
      displayColorInfo();

    }

    function oparateKeyboard(key: string) {
      switch (key) {
        case "c": generateColor(randomSeed); break;
        default: break;
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ColorGanerate