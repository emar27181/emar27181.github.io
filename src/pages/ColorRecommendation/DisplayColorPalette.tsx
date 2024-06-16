import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnUsedColorsAmount, ReturnUsedColorSchemeAmount, ReturnUsedColorSchemeAmountOnlyMainColor, ReturnOrderUsedColorsAmount } from './CalculateUsedColors';
import { ReturnRecommendedColorSchemeAmount } from './CalculateRecommendColors';
import { ColorAmount } from '../../utils/ColorAmount';
import { DISPLAY_RATE, DISPLAY_USED_COLOR_WHEEL_RATE, LIGHTNESS_DIFF } from '../../config/constants';
import p5 from 'p5';
import { calculateColorsAmountSimilarity, calculateLabColorSimilarity } from '../ColorRecommendation/CalculateSimilarity';
import { ReturnIsMouseReleased } from '../Reserch/Canvas';
import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import { displayOrderIndex, similarityValues } from './CalculateRecommendColors';

let isTouhched: boolean;
let isCanvasMouseReleased: boolean = false;
let drawingColor: number[];
const DEBUG: boolean = true;


export function DisplayColorPalette() {
  const sketch = (p: P5CanvasInstance) => {
    const HEIGHT_COLOR_PALETTE = 0.015 * window.innerWidth;
    const IS_DISPLAY_COLOR_PALETTE_BY_RATIO = false;
    const IS_DISPLAY_COLOR_PALETTE_BY_SQUARE = true;
    const IS_DISPLAY_INDEX_NUMBER = true;
    let usedColorsAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmount: Array<ColorAmount> = [];
    let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];
    let orderUsedColorsAmount: Array<ColorAmount> = [];
    //let recommendedColorSchemeAmount: Array<ColorAmount> = [];
    //let recommendedColorSchemeAmount: ColorAmount[][] ;
    let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];

    //let displayOrderIndex: number[] = [];

    p.setup = () => {
      p.createCanvas(DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3, 1.5 * DISPLAY_RATE * DISPLAY_USED_COLOR_WHEEL_RATE * window.innerWidth / 3);
      p.background(0);
      p.frameRate(1);
      initializeVariables();
    };

    function initializeVariables() {
      for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
      recommendedColorSchemeAmount[0][0] = new ColorAmount(p.color(255), 0);
      drawingColor = [255, 255, 255, 255];
      isTouhched = false;
    }

    p.draw = () => {
      updateVariables();
      p.background(0);
      //displayColorPalettes(usedColorSchemeAmountOnlyMainColor, 0);
      displayColorPalettes(orderUsedColorsAmount, 0);

      if (DEBUG) {
        //console.log("calculateDisplayOrder(recommendedColorSchemeAmount) = " + calculateDisplayOrder(recommendedColorSchemeAmount));
      }
    };

    p.mousePressed = () => {
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height) {
        isTouhched = true;
        drawingColor = p.get(p.mouseX, p.mouseY);
      }
    }


    function displayColorPalettes(colorSchemeAmount: ColorAmount[], x: number) {
      let countDisplayColorPalette = 0;
      const WIDTH_USED_COLOR_PALETTE = HEIGHT_COLOR_PALETTE * colorSchemeAmount.length;

      let add_width = 0;
      if (IS_DISPLAY_INDEX_NUMBER) { add_width += HEIGHT_COLOR_PALETTE; }
      const X_RECOMMEND_COLOR_PALLETE = x + WIDTH_USED_COLOR_PALETTE + HEIGHT_COLOR_PALETTE + add_width;

      if (IS_DISPLAY_COLOR_PALETTE_BY_RATIO) {
        displayColorPaletteByRatio(colorSchemeAmount, x, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
        //displayColorPaletteByRatio(orderUsedColorsAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
        //displayColorPaletteByRatio(usedColorSchemeAmountOnlyMainColor, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
        // displayColorPaletteByRatio(usedColorsAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
        //displayColorPaletteByRatio(usedColorSchemeAmount, 0, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

        // ↓
        drawTriangle(countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);

        for (let i = 0; i < recommendedColorSchemeAmount.length; i++) {
          displayColorPaletteByRatio(recommendedColorSchemeAmount[i], X_RECOMMEND_COLOR_PALLETE, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE);
        }
      }

      if (IS_DISPLAY_COLOR_PALETTE_BY_SQUARE) {
        //---------------------------------------------------------
        countDisplayColorPalette++; //空行の表示分のインクリメント

        // 使用色のカラーパレットの描画
        displayColorPaletteBySquare(colorSchemeAmount, x, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE, +LIGHTNESS_DIFF);
        p.textSize(0.5 * HEIGHT_COLOR_PALETTE);
        p.text("+", x + HEIGHT_COLOR_PALETTE * colorSchemeAmount.length + p.textSize(), countDisplayColorPalette * HEIGHT_COLOR_PALETTE + p.textSize());
        displayColorPaletteBySquare(colorSchemeAmount, x, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE, +0);
        displayColorPaletteBySquare(colorSchemeAmount, x, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE, -LIGHTNESS_DIFF);

        // カラーパレットを描画するy座標の調整
        countDisplayColorPalette--;
        countDisplayColorPalette--;

        // ↓
        //drawTriangle(countDisplayColorPalette * HEIGHT_COLOR_PALETTE);

        // 推薦色のカラーパレットの描画
        for (let i = 0; i < displayOrderIndex.length; i++) {
          if (recommendedColorSchemeAmount[displayOrderIndex[i]].length === 0) { continue; }

          displayColorPaletteBySquare(recommendedColorSchemeAmount[displayOrderIndex[i]], X_RECOMMEND_COLOR_PALLETE, countDisplayColorPalette++ * HEIGHT_COLOR_PALETTE, 0);

          //インデックス番号の描画
          p.textSize(0.5 * HEIGHT_COLOR_PALETTE);
          p.textAlign(p.CENTER, p.CENTER);
          p.noStroke();


          if (IS_DISPLAY_INDEX_NUMBER) {
            p.fill(255);
            p.text("[" + displayOrderIndex[i] + "]", X_RECOMMEND_COLOR_PALLETE - HEIGHT_COLOR_PALETTE + p.textSize(), (countDisplayColorPalette - 1) * HEIGHT_COLOR_PALETTE + p.textSize());
          }
          p.fill(0);
          p.text(p.round(similarityValues[displayOrderIndex[i]]), X_RECOMMEND_COLOR_PALLETE + p.textSize(), (countDisplayColorPalette - 1) * HEIGHT_COLOR_PALETTE + p.textSize());

        }
      }
    }

    function displayRecommendColorPalette(colorsAmount: ColorAmount[]) {

    }

    function drawTriangle(y: number) {
      p.fill(255);
      p.noStroke();
      p.triangle(0.47 * p.width, y + 0.3 * HEIGHT_COLOR_PALETTE, 0.53 * p.width, y + 0.3 * HEIGHT_COLOR_PALETTE, 0.5 * p.width, y + 0.7 * HEIGHT_COLOR_PALETTE);
    }

    function updateVariables() {
      isCanvasMouseReleased = ReturnIsMouseReleased();
      usedColorsAmount = ReturnUsedColorsAmount();
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      usedColorSchemeAmountOnlyMainColor = ReturnUsedColorSchemeAmountOnlyMainColor();
      orderUsedColorsAmount = ReturnOrderUsedColorsAmount();
      recommendedColorSchemeAmount = ReturnRecommendedColorSchemeAmount();
      isTouhched = false;
      if (isCanvasMouseReleased || isUpdateRecommendColorsScheme) {
        //displayOrderIndex = calculateDisplayOrder(recommendedColorSchemeAmount);
      }
    }

    function displayColorPaletteByRatio(colorsAmount: ColorAmount[], x: number, y: number) {
      // 量の総和の計算
      let sumAmount = 0;
      for (let i = 0; i < colorsAmount.length; i++) {
        sumAmount += colorsAmount[i].amount;
      }

      // 使用色の描画
      p.noStroke();
      for (let i = 0; i < colorsAmount.length; i++) {
        p.stroke(20);
        p.strokeWeight(p.width * 0.003);
        p.fill(colorsAmount[i].color);
        p.rect(x, y, p.width / sumAmount * colorsAmount[i].amount, HEIGHT_COLOR_PALETTE);
        x += p.width / sumAmount * colorsAmount[i].amount;
      }

      //外枠の描画
      /*
      p.stroke(20);
      p.strokeWeight(0.003 * p.width);
      p.fill(255, 0, 0);
      p.rect(x, y, p.width, ONE_COLOR_PALETTE_SIZE);
      */
    }

    function displayColorPaletteBySquare(colorsAmount: ColorAmount[], x: number, y: number, lightnessDiff: number) {
      if (typeof (colorsAmount) === "undefined") { return; }

      p.colorMode(p.HSL);
      p.strokeWeight(0.01 * p.width);
      for (let i = 0; i < colorsAmount.length; i++) {
        p.stroke(20);
        let color = colorsAmount[i].color;
        let hue = p.hue(color);
        let saturation = p.saturation(color);
        let lightness = p.lightness(color) + lightnessDiff;
        p.fill(p.color(hue, saturation, lightness));
        //p.fill(colorsAmount[i].color);
        p.rect(x + i * HEIGHT_COLOR_PALETTE, y, HEIGHT_COLOR_PALETTE, HEIGHT_COLOR_PALETTE);
        //確認用出力
        p.fill(255);
        p.stroke(0, 0, 0, 30);
        p.textAlign(p.CENTER, p.CENTER);
        //p.text(p.round(p.hue(colorsAmount[i].color)), x + i * ONE_COLOR_PALETTE_SIZE + ONE_COLOR_PALETTE_SIZE / 2, y + ONE_COLOR_PALETTE_SIZE / 2);
      }
    }

    /*
    function calculateDisplayOrder(colorsAmount: ColorAmount[][]) {
      if (colorsAmount.length === 0) { return []; }

      let similarityValue: number[] = [];
      for (let i = 0; i < colorsAmount.length; i++) {
        similarityValue[i] = calculateColorsAmountSimilarity(orderUsedColorsAmount, colorsAmount[i]);
      }

      if (DEBUG) {
        for (let i = 0; i < similarityValue.length; i++) {
          console.log("similarityValue[" + i + "] = " + Math.round(similarityValue[i]));
        }
      }

      // インデックスと対応するsimilarityValueの値をペアにする
      let indexedSimilarity: { index: number, value: number }[] = similarityValue.map((value, index) => ({ index, value }));

      // similarityValueの値でソートする
      indexedSimilarity.sort((a, b) => a.value - b.value);

      // ソートされたペアからインデックス番号を取り出す
      let sortedIndex: number[] = indexedSimilarity.map(item => item.index);

      return sortedIndex;
    }
    */



  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayColorPalette
export function ReturnIsTouchedOfDisplayColorPalette() { return isTouhched; }
export function ReturnDrawingColorOfDisplayColorPalette() { return drawingColor; }