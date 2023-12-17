import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnBackgroundColor, ReturnCanvasColors, ReturnCanvasSize, ReturnDrawingColor } from '../Reserch/Canvas';
import p5 from 'p5';
import { ReturnIsDesktop } from '../../App';
import { ReturnCameraColors } from '../Reserch/ReturnCameraInfo';
import { ReturnImageColors, ReturnReturnImageInfoCanvasSize } from '../Reserch/ReturnImageInfo';

let returnColor: number[] = [0, 0, 0, 255];
let isTouched = false;
const DEBUG = false;
const SPLIT_CANVAS_WIDTH = 8;
const SPLIT = 100, CANVAS_WIDTH = 0.015 * SPLIT_CANVAS_WIDTH * window.innerWidth;
const SATURATION_LIMIT = 10;
let colorsAmount: Array<ColorAmount> = [];

export function DisplayUsedColorRatio(displayMode: string, loadNumber: number, displayColorSpace: string) {
  const sketch = (p: P5CanvasInstance) => {
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    let backgroundColor = p.color(255, 255, 255, 255);
    let canvasWidth = 0, canvasHeight = 0;
    let lightnessBorderHeight = [0, 0];

    p.setup = () => {
      p.colorMode(p.HSL);
      createCanvas();
      p.background(backgroundColor);
      colorsAmount.push(new ColorAmount(backgroundColor, 0));
      p.frameRate(1);
      //displayCanvas();
    };



    p.draw = () => {
      p.colorMode(p.HSL);
      updateVariables();
      if (p.frameCount === 1 && displayMode === "image") { displayCanvas(); }
      if (p.frameCount === 5 && displayMode === "camera") { displayCanvas(); }
      if (p.frameCount % 3 === 1 && displayMode === "canvas") { displayCanvas(); }
      if (p.mouseIsPressed) { mousePressed(); }
    }

    p.keyTyped = () => {
    }

    //p.mouseClicked = () => {
    function mousePressed() {
      p.colorMode(p.RGB);
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouched = true;
        let getColor = p.color(p.get(p.mouseX, p.mouseY));
        let drawingColor = ReturnDrawingColor();
        let returnHue = p.hue(drawingColor);
        let returnSatuation = p.saturation(drawingColor);
        let returnLightness = p.lightness(drawingColor);
        if (displayColorSpace === "hue") { returnHue = p.hue(getColor); }
        else if (displayColorSpace === "saturation") { returnSatuation = p.saturation(getColor); }
        else if (displayColorSpace === "lightness") { returnLightness = p.lightness(getColor); }

        returnColor = [returnHue, returnSatuation, returnLightness];
      }
    }

    function updateVariables() {
      if (displayMode === "canvas") { canvasColors = ReturnCanvasColors(); }
      else if (displayMode === "camera") { canvasColors = ReturnCameraColors(); }
      else if (displayMode === "image") { canvasColors = ReturnImageColors(loadNumber); }
      //else if (displayMode === "image") { canvasColors = ReturnImageColors(); }
      let createCanvasSize = ReturnReturnImageInfoCanvasSize();
      if (displayMode === "image" && createCanvasSize[0] != 0 && p.frameCount < 2) { p.createCanvas(createCanvasSize[0] / 3, createCanvasSize[1] / 3); }
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
      isTouched = false;
      backgroundColor = ReturnBackgroundColor();
    }



    function createCanvas() {
      if (displayMode === "camera") { p.createCanvas(CANVAS_WIDTH, 480 / 3); }
      else if (displayMode === "image") { p.createCanvas(CANVAS_WIDTH, 512 / 3); }
      else if (displayMode === "canvas") {

        let rate = 0.35;
        p.createCanvas(CANVAS_WIDTH, rate * window.innerWidth / 3);
      }
    }

    function displayCanvas() {
      p.background(backgroundColor);
      calculateColorsAmount();


      for (let i = 0; i < 5; i++) {
        let x = p.width * i / SPLIT_CANVAS_WIDTH, width = p.width / SPLIT_CANVAS_WIDTH;

        if (i === 0) {
          if (displayColorSpace === "hue") { displayColorsByHue(x, width, calculateSplitSum(true), true, false); }
          else if (displayColorSpace === "saturation") { displayColorsBySaturation(x, width, calculateSplitSum(true), true, false); }
          else if (displayColorSpace === "lightness") { displayColorsByLightness(x, width, calculateSplitSum(true), true, false); }
        }
        else if (i === 1) {
          if (displayColorSpace === "hue") { displayColorsByHue(x, width, calculateSplitSum(true), true, true); }
          else if (displayColorSpace === "saturation") { displayColorsBySaturation(x, width, calculateSplitSum(true), true, true); }
          else if (displayColorSpace === "lightness") { displayColorsByLightness(x, width, calculateSplitSum(true), true, true); }
        }
        else if (i === 2) {
          displayTemplateColors(x, width, displayColorSpace);
        }
        else if (i === 3) {
          displayDifferenceFromRecommendColors(x, width, displayColorSpace);
        }
        else if (i === 4) {
          if (displayColorSpace === "hue") { displayColorsByHue(x, width, calculateSplitSum(false), false, false); }
          else if (displayColorSpace === "saturation") { displayColorsBySaturation(x, width, calculateSplitSum(false), false, false); }
          else if (displayColorSpace === "lightness") { displayColorsByLightness(x, width, calculateSplitSum(false), false, false); }
        }
      }
    }

    //除外された色の数の計算を行う関数
    function calculateExcludeColorAmount() {
      //excludeColorAmount: 除外された色の量の合計
      let excludeColorAmount = 0;
      for (let i = 0; i < colorsAmount.length; i++) {
        if (p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT) { excludeColorAmount += colorsAmount[i].amount; }
      }
      return excludeColorAmount;
    }

    function calculateSplitSum(isDisplayOnlyChromaticColor: boolean) {
      if (isDisplayOnlyChromaticColor) { return SPLIT * SPLIT - calculateExcludeColorAmount(); }
      else { return SPLIT * SPLIT; }
    }

    //色相を基準に上から描画する関数
    function displayColorsByHue(x: number, width: number, splitSum: number, isDisplayOnlyChromaticColor: boolean, isDIsplayOnlyHue: boolean) {
      let y = 0;
      let hueRange = 1; //この値を大きくすると何故か表示の縦幅が短くなる
      p.colorMode(p.HSL);
      p.noStroke();

      for (let i = 0; i < 360; i += hueRange) {
        let hueValue = (300 + i) % 360;
        for (let j = 0; j < colorsAmount.length; j++) {
          let hue = p.hue(colorsAmount[j].color);

          if (isDisplayOnlyChromaticColor) {
            //無彩色だった場合
            if (p.saturation(colorsAmount[j].color) <= SATURATION_LIMIT) { continue; }
          }

          //console.log(hueValue + " <= hue < " + (hueValue + hueRange) % 360);
          if (hueValue <= hue && hue < (hueValue + hueRange) % 360) {
            if (isDIsplayOnlyHue) { p.fill(hueValue, 70, 70); }
            else { p.fill(colorsAmount[j].color); }
            p.rect(x, y, width, p.height * (colorsAmount[j].amount / splitSum) + 1);
            y += p.height * (colorsAmount[j].amount / splitSum);
          }
        }
      }
    }

    //彩度を基準に上から描画する関数
    function displayColorsBySaturation(x: number, width: number, splitSum: number, isDisplayOnlyChromaticColor: boolean, isDisplayOnlySaturation: boolean) {
      let y = 0;
      let saturationRange = 10;
      p.noStroke();
      p.colorMode(p.HSB);
      //彩度を基準に上から描画
      for (let i = 0; i <= 100; i += saturationRange) {
        for (let j = 0; j < colorsAmount.length; j++) {

          if (isDisplayOnlyChromaticColor) {
            //無彩色だった場合
            if (p.saturation(colorsAmount[j].color) <= SATURATION_LIMIT) { continue; }
          }

          let saturation = p.saturation(colorsAmount[j].color);
          if (i <= saturation && saturation < (i + saturationRange)) {
            if (isDisplayOnlySaturation) { p.fill(0, i, i); }
            else { p.fill(colorsAmount[j].color); }
            p.rect(x, y, width, p.height * (colorsAmount[j].amount / splitSum) + 1);
            y += p.height * (colorsAmount[j].amount / splitSum);
          }
        }
      }
    }

    //明度を基準に色の比率を表示させる関数
    function displayColorsByLightness(x: number, width: number, splitSum: number, isDisplayOnlyChromaticColor: boolean, isDisplayOnlyLightness: boolean) {
      let y = 0;
      let lightnessRange = 10;
      p.colorMode(p.HSL);

      //明度を基準に上から描画
      for (let i = 0; i < 100; i += lightnessRange) {
        for (let j = 0; j < colorsAmount.length; j++) {
          p.noStroke();
          if (isDisplayOnlyChromaticColor) {
            //無彩色だった場合
            if (p.saturation(colorsAmount[j].color) <= SATURATION_LIMIT) { continue; }
          }

          let lightness = p.lightness(colorsAmount[j].color);
          if (i <= lightness && lightness < (i + lightnessRange)) {
            if (isDisplayOnlyLightness) { p.fill(0, 0, i); }
            else { p.fill(colorsAmount[j].color); }
            p.rect(x, y, width, p.height * (colorsAmount[j].amount / splitSum) + 1);
            y += p.height * (colorsAmount[j].amount / splitSum);

            // 彩度の境の高さを測定
            if (i <= 30) { lightnessBorderHeight[0] = y; }
            else if (i <= 50) { lightnessBorderHeight[1] = y; }
          }

        }
        p.stroke(0, 0, 0);
        //p.line(x, y, width, y);

      }
      p.noStroke();
    }


    function displayDifferenceFromRecommendColors(x: number, width: number, displayColorSpace: string) {
      const BASE_COLOR_RATE = 0.7;
      const ASSORTED_COLOR_RATE = 0.25;
      const ACCENT_COLOR_RATE = 0.05;

      p.fill(255);
      p.rect(x, 0, width, p.height);

      p.colorMode(p.RGB);
      if (displayColorSpace === "lightness") {

        p.fill(0);
        p.rect(x, lightnessBorderHeight[0], width, 3);
        p.rect(x, lightnessBorderHeight[1], width, 3);

        /*
        p.fill(0, 255, 0);
        if (lightnessBorderHeight[0] < BASE_COLOR_RATE * p.height) {
          p.rect(x, lightnessBorderHeight[0], width, BASE_COLOR_RATE * p.height - lightnessBorderHeight[0]);
        }
        else {
          p.rect(x, BASE_COLOR_RATE * p.height, width, lightnessBorderHeight[0] - BASE_COLOR_RATE * p.height);
        }

        p.fill(0, 0, 255);
        if (lightnessBorderHeight[1] < ASSORTED_COLOR_RATE * p.height) {
          p.rect(x, lightnessBorderHeight[1], width, ASSORTED_COLOR_RATE * p.height - lightnessBorderHeight[1]);
        }
        else {
          p.rect(x, ASSORTED_COLOR_RATE * p.height, width, lightnessBorderHeight[1] - ASSORTED_COLOR_RATE * p.height);
        }
        */
      }
    };

    function displayTemplateColors(x: number, width: number, displayColorSpace: string) {
      let y = 0;
      const BASE_COLOR_RATE = 0.7;
      const ASSORTED_COLOR_RATE = 0.25;
      const ACCENT_COLOR_RATE = 0.05;
      if (displayColorSpace === "hue") {
        p.colorMode(p.HSL);
        let hue = p.hue(calculateBaseColor());

        if (hue < (hue + 180) % 360) {
          p.fill(hue, 70, 70);
          p.rect(x, y, width, p.height * 0.95);
          y += p.height * 0.95;
          p.fill((hue + 180) % 360, 70, 70);
          p.rect(x, y, width, p.height * ACCENT_COLOR_RATE);
          y = + p.height * ACCENT_COLOR_RATE;
        }
        else {
          p.fill((hue + 180) % 360, 70, 70);
          p.rect(x, y, width, p.height * ACCENT_COLOR_RATE);
          y = + p.height * ACCENT_COLOR_RATE;
          p.fill(hue, 70, 70);
          p.rect(x, y, width, p.height * 0.95);
          y += p.height * 0.95;
        }
      }
      else if (displayColorSpace === "saturation") {
        p.colorMode(p.HSB);
        p.fill(0, 30, 30);
        p.rect(x, y, width, p.height * BASE_COLOR_RATE);
        y += p.height * BASE_COLOR_RATE;
        p.fill(0, 50, 50);
        p.rect(x, y, width, p.height * ASSORTED_COLOR_RATE);
        y += p.height * ASSORTED_COLOR_RATE
        p.fill(0, 80, 80);
        p.rect(x, y, width, p.height * ACCENT_COLOR_RATE);
        y += p.height * ACCENT_COLOR_RATE;
      }
      else if (displayColorSpace === "lightness") {
        p.colorMode(p.HSL);
        p.fill(0, 0, 30);
        p.rect(x, y, width, p.height * BASE_COLOR_RATE);
        y += p.height * BASE_COLOR_RATE
        p.fill(0, 0, 50);
        p.rect(x, y, width, p.height * ASSORTED_COLOR_RATE);
        y += p.height * ASSORTED_COLOR_RATE
        p.fill(0, 0, 80);
        p.rect(x, y, width, p.height * ACCENT_COLOR_RATE);
        y += p.height * ACCENT_COLOR_RATE
      }

    }

    function displayRecommendedColorsAmountRate(x: number, width: number, hueDifference: number) {
      p.colorMode(p.RGB);
      let y = 0;
      const BASE_COLOR_RATE = 0.7;
      const ASSORTED_COLOR_RATE = 0.25;
      const ACCENT_COLOR_RATE = 0.05;

      //初期実装として、色の割合をベースカラー70%, アソートカラー25%, アクセントカラー5%で表示

      //アソートカラーの描画
      p.fill(calculateAssortedColor(hueDifference));
      p.rect(x, y, width, ASSORTED_COLOR_RATE * p.height);
      y += ASSORTED_COLOR_RATE * p.height;

      //ベースカラーの描画
      p.fill(calculateBaseColor());
      p.rect(x, y, width, BASE_COLOR_RATE * p.height);
      y += BASE_COLOR_RATE * p.height;

      //アクセントカラーの描画
      p.fill(calculateAccentColor(hueDifference));
      p.rect(x, y, width, ACCENT_COLOR_RATE * p.height);
      y += ACCENT_COLOR_RATE * p.height;

    }

    //現在のキャンバスの色の割合のうち最も多い色を返す関数
    function calculateBaseColor(): p5.Color {
      //何も塗られていなかった場合(配列の長さが2⇒rgb(0,0,0)とrgb(255,255,255)のみ)
      if (colorsAmount.length <= 2) { return colorsAmount[0].color; }

      let maxIndex = 2;

      for (let i = 2; i < colorsAmount.length; i++) {
        //除外された色だった場合
        if (p.saturation(colorsAmount[i].color) <= SATURATION_LIMIT) { continue; }

        if (colorsAmount[i].amount > colorsAmount[maxIndex].amount) {
          maxIndex = i;
        }
      }

      let hue = p.hue(colorsAmount[maxIndex].color);
      let saturation = 60;
      let lightness = 70;
      return p.color(hue, saturation, lightness);
    }


    function calculateAssortedColor(hueDifference: number): p5.Color {
      p.colorMode(p.HSL);
      let baseColor = calculateBaseColor();
      let hue = p.hue(baseColor);
      hue = (hue + hueDifference * 15) % 360;
      let saturation = 30;
      let lightness = 80;
      return p.color(hue, saturation, lightness);
    }

    function calculateAccentColor(hueDifference: number): p5.Color {
      p.colorMode(p.HSL);
      let baseColor = calculateBaseColor();
      let hue = p.hue(baseColor);
      hue = (hue + hueDifference * 15) % 360;
      let saturation = 80;
      let lightness = 30;
      return p.color(hue, saturation, lightness);
    }

    function resetColorsAmount() {
      colorsAmount = [];
      colorsAmount.push(new ColorAmount(backgroundColor, 0));
    }

    function calculateColorsAmount() {
      resetColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateColorsAmount(color);
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }

      //確認用出力
      if (DEBUG) {
        console.log("--- " + p.frameCount + " ---");
        for (let i = 0; i < colorsAmount.length; i++) {
          console.log("[" + i + "]: (" + p.red(colorsAmount[i].color) + "," + p.green(colorsAmount[i].color) + "," + p.blue(colorsAmount[i].color) + ") =  " + colorsAmount[i].amount);
        }
      }
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      //console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }

    function updateColorsAmount(color: p5.Color) {
      //color: 探索対象の色
      p.colorMode(p.RGB);

      // placeNumber: 四捨五入する位の10倍の値
      let placeNumber = 1;

      //1の位を四捨五入した値に変更
      color = p.color(p.round(p.red(color) / placeNumber) * placeNumber, p.round(p.green(color) / placeNumber) * placeNumber, p.round(p.blue(color) / placeNumber) * placeNumber);
      for (let i = 0; i < colorsAmount.length; i++) {
        //すでに出てきた色であった場合
        if (equalsColor(colorsAmount[i].color, color)) {
          colorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      colorsAmount[colorsAmount.length] = new ColorAmount(color, 1);
    }
  }


  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export class ColorAmount {
  color: p5.Color;
  amount: number;

  constructor(color: p5.Color, amount: number) {
    this.color = color;
    this.amount = amount;
  }

}

export function ReturnIsTouchedUsedColorRatio() { return isTouched; }
export function ReturnRecommendedColor() { return returnColor; }
export function ReturnColorsAmount() {
  //console.log(colorsAmount);
  return colorsAmount;
}

export default DisplayUsedColorRatio