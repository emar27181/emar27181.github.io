import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize } from '../Reserch/Canvas';
import ColorTestData from '../../data/colorTestData.json';
import * as fs from 'fs';
import axios from 'axios';

//let jsonFilePath = '../../data/colorTestData.json';
let jsonFilePath = 'src/data/colorTestData.json';
let isTouchedColorRatio = false;
let red = 0, green = 0, blue = 0, alpha = 0;
let hue: number[] = [], saturation: number[] = [], lightness: number[] = [];
fetchData();

export function DisplayColorRatio() {
  const sketch = (p: P5CanvasInstance) => {
    const CANVAS_SIZE = ReturnCanvasSize();

    p.setup = () => {
      let rate = 0.65;
      p.createCanvas(rate * p.windowWidth / 2, 20);
      //p.createCanvas(CANVAS_SIZE[0], 20);
      p.background(0);
      p.noStroke();
      displayColors();
      console.log(hue[0])
    };


    p.draw = () => {
      p.colorMode(p.HSL, 360, 100, 100);
      isTouchedColorRatio = false;

      if (p.mouseIsPressed) { mouseControl(); }
    };

    function editJson() {
      // JSON ファイルを読み込む
      //const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
      //const jsonData = JSON.parse(rawData);
      //console.log(jsonData);
      // JSONファイルをフェッチする

      // JSONファイルの読み込み
      /*
      const readJsonFile = (filePath: string): any => {
        try {
          const data = fs.readFileSync(filePath, 'utf-8');
          return JSON.parse(data);
        } catch (error) {
          console.error('Error reading JSON file:', error);
          return null;
        }
      };

      // JSONファイルの書き込み
      const writeJsonFile = (filePath: string, data: any): void => {
        try {
          const jsonData = JSON.stringify(data, null, 2);
          fs.writeFileSync(filePath, jsonData, 'utf-8');
          console.log('JSON file written successfully.');
        } catch (error) {
          console.error('Error writing JSON file:', error);
        }
      };

      const jsonData = readJsonFile(jsonFilePath);
      jsonData[0].hue = 45;
      writeJsonFile(jsonFilePath, jsonData);
      */


      fetch(jsonFilePath)
        .then(response => response.json())
        .then(jsonData => {
          // JSONデータを変更する（例： "name"プロパティを変更）
          jsonData[0].hue = 45;
          console.log(jsonData);
        })
        .catch(error => console.error('JSONの読み込みエラー:', error));


      //fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

    }


    function displayColors() {
      for (let i = 0; i < hue.length; i++) {
        p.colorMode(p.HSL);
        p.fill(hue[i], saturation[i], lightness[i]);
        p.rect(p.width / hue.length * i, 0, p.width / hue.length, p.height);
      }
      /*
      for (let i = 0; i < jsonData.length; i++) {
        p.colorMode(p.HSL, 360, 100, 100);
        p.fill(ColorTestData[i].hue, ColorTestData[i].saturation, ColorTestData[i].lightness);
        p.rect(p.width / jsonData.length * i, 0, p.width / jsonData.length, p.height);
      }
      */
    }

    function mouseControl() {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouchedColorRatio = true;
        p.colorMode(p.RGB);
        let getColor = p.get(p.mouseX, p.mouseY);
        let getColorObject = p.color(getColor);
        red = getColor[0];
        green = getColor[1];
        blue = getColor[2];
        alpha = getColor[3];
        // console.log(red, green, blue, alpha);
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:5000/api/send-color-combination-data');
    const jsonData = response.data;
    const parsedJsonData = JSON.parse(jsonData);

    for (let i = 0; i < parsedJsonData.length; i++) {
      let data = parsedJsonData[i];
      hue[i] = data.hue;
      saturation[i] = data.saturation;
      lightness[i] = data.lightness;
      //console.log("hue[" + i + "]: " + hue[i] + ", saturation[" + i + "]: " + saturation[i] + ", lightness[" + i + "]: " + lightness[i]);
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

export function ReturnColorRatioValue() {
  return [red, green, blue, alpha];
}
export function ReturnIsTouchedColorRatio() {
  return isTouchedColorRatio;
}

export default DisplayColorRatio