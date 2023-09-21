import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

// データの取得
//const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseDataName.json');
//const DATA = await response.json();

export function ExplainPluticCircle() {
  const sketch = (p: P5CanvasInstance) => {
    /*

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const TEXT_SIZE = 30;
    let displayY = TEXT_SIZE - 5;
    let hueValue: number[] = [];
    let emotionIntense: number[] = [];
    let emotionName: string[] = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(0);
      p.frameRate(0); //余計な負荷を掛けないため、fpsを0に設定
      p.textAlign(p.CENTER, p.CENTER);

      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {
        let data = DATA[i];

        hueValue[i] = data.hue;
        emotionIntense[i] = data.intense;
        emotionName[i] = data.name;

        displayEmotionExplanation(emotionName[i], hueValue[i]);
        displayY += TEXT_SIZE;
      }

    };

    
    p.draw = () => {
    };
    

    function displayEmotionExplanation(hueName: string, hueValue: number) {
      p.textSize(TEXT_SIZE);
      p.fill(hueValue, 80, 100, 255);
      p.text(hueName, p.width / 2, displayY);
    }

    */
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircle