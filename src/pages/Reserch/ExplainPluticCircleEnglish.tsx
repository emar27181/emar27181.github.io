import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';

let hueValue: number[] = [];
let emotionIntense: number[] = [];
let emotionName: string[] = [];
const DEBUG = false;



export function ExplainPluticCircleEnglish() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const TEXT_SIZE = 30;
    let displayY = TEXT_SIZE - 5;


    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(0);
      p.frameRate(30); //余計な負荷を掛けないため、fpsを0に設定
      p.textAlign(p.CENTER, p.CENTER);
      fetchData();
    };


    p.draw = () => {
    };


    function displayEmotionExplanation(hueName: string, hueValue: number, emotionIntense: number) {
      p.textSize(TEXT_SIZE);
      p.fill(hueValue, 80, 100, 255);
      p.text(hueName + ": " + emotionIntense, p.width / 2, displayY);
    }

    // バックエンドからJSONデータの取得
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/send-data');
        const jsonData = response.data;
        const parsedData = JSON.parse(jsonData.message);

        //hueとintenseの値を代入
        for (let i = 0; i < 8; i++) {
          let data = parsedData[i];
          hueValue[i] = data.hue;
          emotionIntense[i] = data.intense;
          emotionName[i] = data.name;
          if (DEBUG) {
            /*
            console.log('name[i]: ' + emotionName[i]);
            console.log('hue[i]: ' + hueValue[i]);
            console.log('intense[i]: ' + emotionIntense[i]);
            */
          }
        }

      } catch (error) {
        console.error('エラーが発生しました:', error);
      }
      //それぞれの感情の色と強さの描画
      for (let i = 0; i < 8; i++) {
        if (DEBUG) {
          console.log('name[i]: ' + emotionName[i]);
          console.log('hue[i]: ' + hueValue[i]);
          console.log('intense[i]: ' + emotionIntense[i]);
        }

        //displayEmotionExplanation(emotionName[i], hueValue[i]);
        displayEmotionExplanation(emotionName[i], hueValue[i], emotionIntense[i]);
        //displayEmotionExplanation("red", 30);
        displayY += TEXT_SIZE;
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircleEnglish