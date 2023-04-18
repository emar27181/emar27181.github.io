import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 500, CANVAS_HEIGHT = 600, MENU_BAR_WIDTH = 0, MENU_BAR_HEIGHT = 100, SPLIT = 20, DEBUG = true;
    let isColorChanged = false, hue = 100, saturation = 0, value = 0;
    let hueBarX = 50, HUE_BAR_Y = CANVAS_HEIGHT - MENU_BAR_HEIGHT + 10;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.frameRate(10);
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();


      p.fill("#FFFFFF");
      p.textSize(20);
      p.textAlign("center", "center");
      p.text("Cをクリックしてください。", p.width / 2, p.height / 2);

    };

    let randomSeed: number;

    p.draw = () => {

      randomSeed = p.round(p.random(0, 360));
      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) { oparateMouse(); }

      if(DEBUG){
        //console.log("mouseX: " + p.mouseX + " y: " + p.mouseY);
      }
    };

    function generateObject(){
      // 色相バーの表示
      p.fill(255);
      p.rect(hueBarX, HUE_BAR_Y, 3, 20);

    }

    function oparateMouse() {
      let getColor = p.get(p.mouseX, p.mouseY);
      let color = p.color(getColor);
      if (DEBUG) {
        console.log("hue(color): " + p.hue(color));
        console.log("saturation(color): " + p.saturation(color));
      }

      generateColor(p.hue(color));

      
    }

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
        p.fill(360 * i / p.width, 99, 100);
        p.rect(i, drawingHeight + 10, p.width / 360, 20);
      }
      generateObject();


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