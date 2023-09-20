import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';


// データの取得
/*
const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseData.json');
const DATA = await response.json();
*/
//console.log("DATA: " + DATA);// 確認用出力

export function DisplayEmotionColorRatio() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 16;
    let hue: number[] = [];
    let intense: number[] = [];
    let colorWidth: number[] = [];
    let sumIntense = 0;
    const DEBUG = false;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.frameRate(1);
      p.noStroke();

      //hueとintenseの値を代入
      /*
      for (let i = 0; i < 8; i++) {

        let data = DATA[i];
        hue[i] = data.hue;
        intense[i] = data.intense;
        sumIntense += data.intense;
        //console.log("data[" + i + "]: " + data);
        //console.log("hue[" + i + "]: " + hue + ", intense[" + i + "]: " + intense);
      }
      */

      fetchData();

      //描画する横幅の計算と代入
      /*
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        console.log('intense[i]: ' + intense[i]);
        console.log("colorWidth[" + i + "] = " + colorWidth[i]);
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, 0, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i];
        //console.log("hue[i] = " + hue[i] + ", startWidth: " + startWidth + ", endWidth: " + endWidth);
      }
      */
      //displayColorPalette();

    };



    p.draw = () => {
      displayColorPalette();
    };

    function displayColorPalette() {

      //描画する横幅の計算と代入
      for (let i = 0; i < 8; i++) {
        colorWidth[i] = CANVAS_WIDTH * intense[i] / sumIntense;
        if (DEBUG) { console.log("colorWidth[" + i + "] = " + colorWidth[i]); }
      }

      //色の割合に基づいて描画
      let startWidth = 0, endWidth = colorWidth[0];
      for (let i = 0; i < 8; i++) {
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.fill(hue[i], 80, 100, 255);
        p.rect(startWidth, 0, endWidth, CANVAS_HEIGHT);

        startWidth += colorWidth[i];
        endWidth += colorWidth[i+1];
        if (DEBUG) { console.log("hue[i] = " + hue[i] + ", startWidth: " + startWidth + ", endWidth: " + endWidth); }
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