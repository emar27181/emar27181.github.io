import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

// データの取得
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseData.json');
const DATA = await response.json();
//console.log("DATA: " + DATA);// 確認用出力

export function DisplayEmotionColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 16;
    let hue: number[] = [];
    let intense: number[] = [];
    let colorWidth: number[] = [];
    let sumIntense = 0;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.frameRate(1);
      p.noStroke();

      //hueとintenseの値を代入
      for (let i = 0; i < 8; i++) {

        let data = DATA[i];
        hue[i] = data.hue;
        intense[i] = data.intense;
        sumIntense += data.intense;
        //console.log("data[" + i + "]: " + data);
        //console.log("hue[" + i + "]: " + hue + ", intense[" + i + "]: " + intense);
      }

      //描画する横幅の計算と代入
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        console.log("colorWidth[" + i + "] = " + colorWidth[i]);
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, 0, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i];
        console.log("hue[i] = " + hue[i] + ", startWidth: " + startWidth + ", endWidth: " + endWidth);
      }

    };



    p.draw = () => {

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayEmotionColorRatio