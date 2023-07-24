import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

// データの取得
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseData.json');
const DATA = await response.json();

export function ExplainPluticCircle() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let hue: number[] = [];
    let intense: number[] = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.frameRate(0); //余計な負荷を掛けないため、fpsを0に設定

      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {
        let data = DATA[i];
        hue[i] = data.hue;
        intense[i] = data.intense;
      }

      let testOutput = displayEmotionExplanation("test input", hue[0]);
      p.fill(255);
      p.text(testOutput, p.width / 2, p.height / 2);
    };

    p.draw = () => {
    };

    function displayEmotionExplanation(hueName: string, hueValue: number) {
      return "test output";
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircle