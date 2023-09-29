import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import axios from 'axios';

// データの取得
//const response = await fetch('src/pages/ColorRecommendation/data/ColorIntenseDataName.json');
//const DATA = await response.json();

export function ExplainPluticCircle() {
  const sketch = (p: P5CanvasInstance) => {


    let hueValue: number[] = [];
    let emotionIntense: number[] = [];
    let emotionName: string[] = [];
    const DEBUG = false;

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    const TEXT_SIZE = 30;
    let displayY = TEXT_SIZE - 5;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(0);
      p.frameRate(0); //余計な負荷を掛けないため、fpsを0に設定
      p.textAlign(p.CENTER, p.CENTER);
      fetchData();

      //hueとintenseの値を代入
      /*
      for (let i = 0; i < 8; i++) {
        let data = DATA[i];

        hueValue[i] = data.hue;
        emotionIntense[i] = data.intense;
        emotionName[i] = data.name;

        displayEmotionExplanation(emotionName[i], hueValue[i]);
        displayY += TEXT_SIZE;
      }
      */

    };


    p.draw = () => {
    };

    function returnJapaneseEmotionName(emotionName: string) {
      switch (emotionName) {
        case "anger":
          return "怒り";
          break;
        case "anticipation":
          return "期待";
          break;
        case "joy":
          return "喜び";
          break;
        case "trust":
          return "信頼";
          break;
        case "fear":
          return "恐れ";
          break;
        case "surprise":
          return "驚き"
          break;
        case "sadness":
          return "悲しみ";
          break;
        case "disgust":
          return "嫌悪";
          break;
        default:
          return "error";
          break;
      }
    }

    function displayEmotionExplanation(emotionNumber: number, hueName: string, hueValue: number) {
      p.textSize(TEXT_SIZE);
      p.fill(hueValue, 80, 100, 255);
      p.text(returnJapaneseEmotionName(hueName) + "(キー: " + emotionNumber + ")", p.width / 2, displayY);
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

        displayEmotionExplanation(i, emotionName[i], hueValue[i]);
        //displayEmotionExplanation(emotionName[i], hueValue[i], emotionIntense[i]);
        //displayEmotionExplanation("red", 30);
        displayY += TEXT_SIZE;
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ExplainPluticCircle