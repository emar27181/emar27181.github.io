import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';
import { ReturnColorTank } from './Canvas';
import { ReturnIsDesktop } from '../../App';

export function DisplayEmotionColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 16;
    let hue: number[] = [];
    let intense: number[] = [];
    let colorWidth: number[] = [];
    let drawingColorWidth: number[] = [];
    let sumIntense = 0;
    let colorTank: number[] = [];
    const DEBUG = false;

    p.setup = () => {
      let rate = 0.65;
      if (ReturnIsDesktop()) { p.createCanvas(rate * p.windowWidth / 2, 20); }
      else { p.createCanvas(rate * p.windowWidth, 20); }
      p.background(0);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.frameRate(1);
      p.noStroke();
      fetchData();
      colorTank = ReturnColorTank();
    };



    p.draw = () => {
      p.background(0);
      displayColorPalette();
      colorTank = ReturnColorTank();
      //console.log("colorTank: " + colorTank);
    };

    function displayColorPalette() {
      //描画する横幅の計算と代入
      if (DEBUG) { console.log("------------------------"); }
      for (let i = 0; i < 8; i++) {
        drawingColorWidth[i] = p.width * colorTank[i] / sumIntense;
        colorWidth[i] = p.width * intense[i] / sumIntense;
        if (DEBUG) {
          console.log("colorWidth[" + i + "] = " + p.round(colorWidth[i]));
        }
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[i], 80, 100, 255);
        //p.rect(startWidth, p.height - 20, endWidth, p.height);
        p.rect(startWidth, p.height - 20, drawingColorWidth[i], p.height);

        if (DEBUG) {
          console.log("hue[i] = " + hue[i] + ", startWidth: " + p.round(startWidth) + ", endWidth: " + p.round(endWidth));
        }

        startWidth += colorWidth[i];
        endWidth += colorWidth[i + 1];
      }
    }

    async function fetchData() {
      try {
        if (DEBUG) { console.log("fetchData is called"); }
        const response = await axios.get('http://localhost:5000/api/send-data');
        const jsonData = response.data;
        const parsedData = JSON.parse(jsonData.message);

        //hueとintenseの値を代入
        for (let i = 0; i < 8; i++) {
          let data = parsedData[i];
          hue[i] = data.hue;
          intense[i] = data.intense;
          sumIntense += data.intense;
          //console.log('hue[i]: ' + hue[i]);
          //console.log('intense[i]: ' + intense[i]);
        }

      } catch (error) {
        console.error('エラーが発生しました:', error);
      }
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayEmotionColorRatio