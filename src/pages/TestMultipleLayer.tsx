import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Graphics } from 'p5';

export function TestMultipleLayer() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let mainCanvas: Graphics;
    let additionalLayer: Graphics;

    p.setup = () => {
      p.createCanvas(400, 400);

      mainCanvas = p.createGraphics(p.width, p.height);
      additionalLayer = p.createGraphics(p.width, p.height);
    }

    p.draw = () => {
      // メインのキャンバスに描画
      mainCanvas.background(220);
      mainCanvas.ellipse(p.mouseX, p.mouseY, 50, 50);

      // 追加のレイヤーに描画
      additionalLayer.background(255, 0, 0, 1);
      additionalLayer.rect(50, 50, 100, 100);

      // メインのキャンバスに追加のレイヤーを合成
      p.image(mainCanvas, 0, 0);
      p.image(additionalLayer, 0, 0);
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestMultipleLayer