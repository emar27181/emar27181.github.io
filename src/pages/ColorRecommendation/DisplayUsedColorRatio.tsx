import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnBackgroundColor, ReturnCanvasColors, ReturnCanvasSize } from '../Reserch/Canvas';
import p5 from 'p5';
import { ReturnIsDesktop } from '../../App';
import { ReturnCameraColors } from '../Reserch/ReturnCameraInfo';
import { ReturnImageColors } from '../Reserch/ReturnImageInfo';

let returnColor: number[] = [0, 0, 0, 255];
let isTouched = false;
const DEBUG = false;

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
    let backgroundColor = p.color(0, 0, 0, 255);
    let canvasWidth = 0, canvasHeight = 0;
    //let colorsAmount: Array<ColorAmount> = new ColorAmount(p.color(0,0,0), 1);
    let colorsAmount: Array<ColorAmount> = [];
    let excludeColor = p.color(0, 0, 0);

    p.setup = () => {
      p.colorMode(p.HSL);
      createCanvas();
      p.background(backgroundColor);
      colorsAmount.push(new ColorAmount(backgroundColor, SPLIT * SPLIT));
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
      //p.background(backgroundColor);
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
      displayColorsAmountRateExcludeBackground(0, p.width / 2);
      displayRecommendedColorsAmountRate(p.width / 2, p.width);
    }

    //背景色を含めて色の比率を表示させる関数
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

    //背景色を除外して色の比率を表示させる関数
    function displayColorsAmountRateExcludeBackground(x1: number, x2: number) {
      let y = 0;
      let saturationRange = 10;
      p.noStroke();

      //excludeColorAmount: 除外された色の量の合計
      let excludeColorAmount = 0;
      for (let i = 0; i < colorsAmount.length; i++) {
        if (equalsColor(backgroundColor, excludeColor)) { continue; }
        if (equalsColor(colorsAmount[i].color, excludeColor)) {
          excludeColorAmount += colorsAmount[i].amount;
        }
      }
      //splitSum: 除外された色を考慮した分割数の合計(colorsAmount[0]には背景色が入っている)
      let splitSum = SPLIT * SPLIT - colorsAmount[0].amount - excludeColorAmount;
      //console.log("splitSum: " + splitSum);

      //彩度を基準に上から描画
      for (let i = 0; i <= 100; i += saturationRange) {
        for (let j = 1; j < colorsAmount.length; j++) {

          //除外された色だった場合
          if (equalsColor(colorsAmount[j].color, excludeColor)) { continue; }

          let saturation = p.saturation(colorsAmount[j].color);
          if (i <= saturation && saturation < (i + saturationRange)) {
            p.fill(colorsAmount[j].color);
            p.rect(x1, y, x2, p.height * (colorsAmount[j].amount / splitSum));
            y += p.height * (colorsAmount[j].amount / splitSum);
          }
        }
      }

      //色相を基準に上から描画
      /*
      for (let i = 0; i < 360; i += hueRange) {
        //色相の最初の値を330に設定
        let hueValue = (330 + i) % 360;
        for (let j = 1; j < colorsAmount.length; j++) {
          let hue = p.hue(colorsAmount[j].color);
          if (hueValue <= hue && hue < hueValue + hueRange) {
            p.fill(colorsAmount[j].color);
            p.rect(0, y, p.width / 2, p.height * (colorsAmount[j].amount / (SPLIT * SPLIT - colorsAmount[0].amount)));
            y += p.height * (colorsAmount[j].amount / (SPLIT * SPLIT - colorsAmount[0].amount));
          }
        }
      }
      */
    }


    function displayRecommendedColorsAmountRate(x1: number, x2: number) {
      p.colorMode(p.RGB);
      let y = 0;

      //初期実装として、色の割合をベースカラー70%, アソートカラー25%, アクセントカラー5%で表示

      //アソートカラーの描画
      p.fill(calculateAssortedColor());
      p.rect(x1, y, x2, 0.25 * p.height);
      y += 0.25 * p.height;

      //ベースカラーの描画
      p.fill(calculateBaseColor());
      p.rect(x1, y, x2, 0.7 * p.height);
      y += 0.7 * p.height;

      //アクセントカラーの描画
      p.fill(calculateAccentColor());
      p.rect(x1, y, x2, 0.05 * p.height);
      y += 0.05 * p.height;

    }

    //現在のキャンバスの色の割合のうち最も多い色を返す関数
    function calculateBaseColor(): p5.Color {
      //何も塗られていなかった場合(配列の長さが1⇒背景色のみ)
      if (colorsAmount.length === 1) { return colorsAmount[0].color; }

      let maxIndex = 1;

      //console.log(colorsAmount[1].color, colorsAmount[1].amount);
      for (let i = 1; i < colorsAmount.length; i++) {
        //除外された色だった場合
        if (equalsColor(colorsAmount[i].color, excludeColor)) { continue; }

        if (colorsAmount[i].amount > colorsAmount[maxIndex].amount) {
          maxIndex = i;
        }
      }

      let hue = p.hue(colorsAmount[maxIndex].color);
      let saturation = 60;
      let lightness = 70;
      return p.color(hue, saturation, lightness);
    }


    function calculateAssortedColor(): p5.Color {
      p.colorMode(p.HSL);
      let baseColor = calculateBaseColor();
      let hue = p.hue(baseColor);
      let saturation = 30;
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
      let placeNumber = 10;

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
      backgroundColor = ReturnBackgroundColor();
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