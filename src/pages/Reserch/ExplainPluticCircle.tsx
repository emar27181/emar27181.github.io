import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

// データの取得
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseDataName.json');
const DATA = await response.json();

export function ExplainPluticCircle() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let hueValue: number[] = [];
    let emotionIntense: number[] = [];
    let emotionName: string[] = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(0);
      p.frameRate(0); //余計な負荷を掛けないため、fpsを0に設定

      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {
        let data = DATA[i];

        hueValue[i] = data.hue;
        emotionIntense[i] = data.intense;
        emotionName[i] = data.name;
      }

      displayEmotionExplanation(emotionName[0], hueValue[0]);

    };

    p.draw = () => {
    };

    function displayEmotionExplanation(hueName: string, hueValue: number) {
      p.fill(hueValue, 80, 100, 255);
      p.text(hueName, p.width / 2, p.height / 2);
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircle