import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { ReturnDrawingColor } from '../Reserch/Canvas';

let red = 255, green = 0, blue = 0, alpha = 255, h = 0, s = 50, b = 50;
let returnColor: p5.Color;
let isTouchedColorGenerate = false;

export function ColorGanerate() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 200, CANVAS_HEIGHT = 300, MENU_BAR_WIDTH = 0, MENU_BAR_HEIGHT = 100,
      PALETTE_WIDTH = CANVAS_WIDTH - MENU_BAR_WIDTH, PALETTE_HEIGHT = CANVAS_HEIGHT - MENU_BAR_HEIGHT,
      HUE_BAR_WIDTH = 3, HUE_BAR_HEIGHT = 20, MARGIN_HEIGHT = 10, TEXT_SIZE = 10,
      SPLIT = 100, DEBUG = true;
    let isColorChanged = false, hue = 100, saturation = 0, value = 0;
    let hueBarX = 100, HUE_BAR_Y = CANVAS_HEIGHT - MENU_BAR_HEIGHT + MARGIN_HEIGHT;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      //p.createCanvas(256, 256);
      p.background(0);
      p.frameRate(10);
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();
    };

    let randomSeed: number;

    p.draw = () => {
      isTouchedColorGenerate = false;
      let drawingColor = ReturnDrawingColor();
      red = p.red(drawingColor);
      green = p.green(drawingColor);
      blue = p.blue(drawingColor);
      alpha = p.alpha(drawingColor);

      p.background(0);
      randomSeed = p.round(p.random(0, 360));
      if (p.keyIsPressed) { oparateKeyboard(p.key); }
      if (p.mouseIsPressed) {
        oparateMouse();
        if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
          isTouchedColorGenerate = true;
        }
      }

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
      if (0 < p.mouseX && p.mouseX < p.width && HUE_BAR_Y < p.mouseY && p.mouseY < HUE_BAR_Y + HUE_BAR_HEIGHT) {
        hueBarX = p.mouseX;
      }

    }

    function setColor() {
      if (0 <= p.mouseX && p.mouseX <= PALETTE_WIDTH && 0 <= p.mouseY && p.mouseY <= PALETTE_HEIGHT) {
        let getColor = p.get(p.mouseX, p.mouseY);
        let getColorObject = p.color(getColor);
        red = getColor[0];
        green = getColor[1];
        blue = getColor[2];
        alpha = getColor[3];
        returnColor = getColorObject;
      }
    }

    function setColorHSB() {
      //let getColor = p.get(p.mouseX, p.mouseY);
      //let getColorObject = p.color(getColor);
      //p.colorMode(p.HSL, 360, 100, 100);
      p.colorMode(p.HSL);
      let drawingColor = ReturnDrawingColor()
      h = p.round(p.hue(drawingColor));
      s = p.round(p.saturation(drawingColor));
      b = p.round(p.brightness(drawingColor));
    }

    function displayColorHSB() {
      //let getColor = p.get(p.mouseX, p.mouseY);
      //let getColorObject = p.color(getColor);
      p.textSize(TEXT_SIZE);
      //p.text(getColorObject, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT);
      let text = "hsl(" + h + "," + s + "," + b + ")" + "←なんかバグってる";
      p.text(text, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT + TEXT_SIZE);
      let drawingColor = ReturnDrawingColor();
      let hex = p.hex([p.red(drawingColor), p.green(drawingColor), p.blue(drawingColor)], 2);
      text = ("#" + hex[0] + hex[1] + hex[2]);
      //console.log(hex);
      p.text(text, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT + TEXT_SIZE + TEXT_SIZE);
      //text = '#' + p.hex(getColor);
    }


    function displayColorInfo() {
      //if (p.keyIsPressed && p.key === "s") { setColor(); }
      if (p.mouseIsPressed) { setColor(); } //何故かp.draw()やoparateMouse()でsetColor()を呼ぶとバグる(2023/11/12)
      setColorHSB();
      displayColorHSB();
      let drawingColor = ReturnDrawingColor();

      p.text(drawingColor, 0, HUE_BAR_Y + MARGIN_HEIGHT + HUE_BAR_HEIGHT);
    }

    function generateColor(hue: number) {

      // 特定の色相の表示
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {

          saturation = i * 100 / SPLIT;
          value = j * 100 / SPLIT;

          p.fill(hue, saturation, value);
          p.rect(PALETTE_WIDTH / SPLIT * j, PALETTE_HEIGHT / SPLIT * i, PALETTE_WIDTH / SPLIT + 1, PALETTE_HEIGHT / SPLIT + 1);
        }
      }

      // 色相バーの表示
      for (let i = 0; i < PALETTE_WIDTH; i++) {
        p.noStroke();
        p.fill(360 * i / PALETTE_WIDTH, 100, 100);
        p.rect(i, HUE_BAR_Y, PALETTE_WIDTH / 360 + 1, HUE_BAR_HEIGHT);
      }
      generateObject();
      displayColorInfo();
      displayDrawingColor();

    }

    function displayDrawingColor() {
      p.colorMode(p.RGB);
      p.fill(red, green, blue, alpha);
      //p.ellipse(p.width - 15, p.height - 12, 15);

      p.rect(p.width - 20, p.height - 20, 15);
      p.colorMode(p.HSB);
    }

    function oparateKeyboard(key: string) {
      if (key === "c") { generateColor(randomSeed); }
      if (key === "ArrowRight") { hueBarX += 5; }
      if (key === "ArrowLeft") { hueBarX -= 5; }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnColorPaletteValue() {
  return [red, green, blue, alpha];
  //return returnColor;
}
export function ReturnIsTouchedColorGenerate() {
  return isTouchedColorGenerate;
}

export default ColorGanerate