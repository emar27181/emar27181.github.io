import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import p5 from 'p5';
import { ReturnIsDesktop } from '../../App';
import { ReturnCameraColors } from '../Reserch/ReturnCameraInfo';
import { ReturnImageColors } from '../Reserch/ReturnImageInfo';

let returnColor: number[] = [0, 0, 0, 255];
let isTouched = false;

export function DisplayUsedColorRatio(displayMode: string) {
  const sketch = (p: P5CanvasInstance) => {
    const SPLIT = 100, CANVAS_WIDTH = 40;
    let canvasColors: p5.Color[][] = [];
    for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    for (let i = 0; i < SPLIT; i++) {
      for (let j = 0; j < SPLIT; j++) {
        canvasColors[i][j] = p.color(0, 0, 0);
      }
    }
    let backGroundColor = p.color(0, 0, 0, 255);
    let canvasWidth = 0, canvasHeight = 0;
    //let colorsAmount: Array<ColorAmount> = new ColorAmount(p.color(0,0,0), 1);
    let colorsAmount: Array<ColorAmount> = [];

    p.setup = () => {
      p.colorMode(p.HSL);
      createCanvas();
      p.background(backGroundColor);
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), SPLIT * SPLIT));
      p.frameRate(1);

    };

    function createCanvas() {
      if (displayMode === "camera") { p.createCanvas(CANVAS_WIDTH, 480); }
      else if (displayMode === "image") { p.createCanvas(CANVAS_WIDTH, 713); }
      else if (displayMode === "canvas") {
        let rate = 0.65;
        if (ReturnIsDesktop()) { p.createCanvas(CANVAS_WIDTH, rate * p.windowWidth / 2); }
        else { p.createCanvas(CANVAS_WIDTH, rate * p.windowWidth); }
      }
    }

    p.draw = () => {
      p.colorMode(p.HSL);
      updateVariables();
      if (p.frameCount === 3) { displayCanvas(); }
      if (p.frameCount % 3 === 0 && displayMode === "canvas") { displayCanvas(); }
    }

    p.keyTyped = () => {
    }

    p.mouseClicked = () => {
      p.colorMode(p.RGB);
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouched = true;
        let getColor = p.get(p.mouseX, p.mouseY);
        returnColor = [p.red(getColor), p.green(getColor), p.blue(getColor), p.alpha(getColor)];

      }
    }
    function displayCanvas() {
      calculateColorsAmount();
      displayColorsAmountRate();
      displayRecommendedColorsAmountRate();
    }

    function displayColorsAmountRate() {
      let y = 0;
      let hueRange = 15;
      p.noStroke();
      for (let i = 0; i < 360; i += hueRange) {
        //色相の最初の値を330に設定
        let hueValue = (330 + i) % 360;
        for (let j = 0; j < colorsAmount.length; j++) {
          let hue = p.hue(colorsAmount[j].color);
          if (hueValue <= hue && hue < hueValue + hueRange) {
            p.fill(colorsAmount[j].color);
            p.rect(0, y, p.width / 2, p.height * (colorsAmount[j].amount / (SPLIT * SPLIT)));
            y += p.height * (colorsAmount[j].amount / (SPLIT * SPLIT));
          }
        }
      }
    }

    function displayRecommendedColorsAmountRate() {
      p.colorMode(p.RGB);
      let y = 0;

      //初期実装として、色の割合をベースカラー70%, アソートカラー25%, アクセントカラー5%で表示

      //アクセントカラーの描画
      p.fill(calculateAccentColor());
      p.rect(p.width / 2, y, p.width, 0.05 * p.height);
      y += 0.05 * p.height;

      //アソートカラーの描画
      p.fill(calculateAssortedColor());
      p.rect(p.width / 2, y, p.width, 0.25 * p.height);
      y += 0.25 * p.height;

      //ベースカラーの描画
      p.fill(calculateBaseColor());
      p.rect(p.width / 2, y, p.width, 0.7 * p.height);
      y += 0.7 * p.height;

    }

    //現在のキャンバスの色の割合のうち最も多い色を返す関数
    function calculateBaseColor(): p5.Color {
      //何も塗られていなかった場合
      if (colorsAmount.length === 1) { return colorsAmount[0].color; }

      let maxIndex = 1;
      for (let i = 1; i < colorsAmount.length; i++) {
        if (colorsAmount[i].amount > colorsAmount[maxIndex].amount) {
          maxIndex = i;
        }
      }
      return colorsAmount[maxIndex].color;
    }


    function calculateAssortedColor(): p5.Color {
      p.colorMode(p.HSL);
      let baseColor = calculateBaseColor();
      let hue = p.hue(baseColor);
      let saturation = 20;
      let lightness = 80;
      return p.color(hue, saturation, lightness);
    }

    function calculateAccentColor(): p5.Color {
      p.colorMode(p.HSL);
      let baseColor = calculateBaseColor();
      let hue = p.hue(baseColor);
      hue = (hue + 180) % 360;
      let saturation = 80;
      let lightness = 20;
      return p.color(hue, saturation, lightness);
    }

    function resetColorsAmount() {
      colorsAmount = [];
      colorsAmount.push(new ColorAmount(p.color(0, 0, 0), 0));
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
      let placeNumber = 10; // place/10の位を四捨五入

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

    function updateVariables() {
      if (displayMode === "canvas") { canvasColors = ReturnCanvasColors(); }
      else if (displayMode === "camera") { canvasColors = ReturnCameraColors(); }
      else if (displayMode === "image") { canvasColors = ReturnImageColors(); }
      let canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
      isTouched = false;
    }
    class ColorAmount {
      color: p5.Color;
      amount: number;

      constructor(color: p5.Color, amount: number) {
        this.color = color;
        this.amount = amount;
      }

      display() {
        console.log("(" + p.red(this.color) + "," + p.green(this.color) + "," + p.blue(this.color) + "): " + this.amount);
      }
    }
  }


  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export function ReturnIsTouchedUsedColorRatio() { return isTouched; }
export function ReturnRecommendedColor() { return returnColor; }

export default DisplayUsedColorRatio