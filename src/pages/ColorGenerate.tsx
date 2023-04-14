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
    };

    p.draw = () => {

      let color = (Math.random() * 0xFFFFFF | 0).toString(16);
      let randomColor = "#" + ("000000" + color).slice(-6);
      let colorRandom = p.color(randomColor);

      if (p.keyIsPressed) {
        oparateKeyboard(p.key);
      }

      if (isColorChanged) {
        p.fill(colorRandom);
      }

      p.ellipse(p.width / 2, p.height / 2, 100, 100);
    };

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