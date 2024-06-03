import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnOrderUsedColors, ReturnOrderUsedColorsAmount, ReturnUsedColorSchemeAmountOnlyMainColor } from './CalculateUsedColors';
import p5 from 'p5';
import Color from 'color';
import { calculateLabColorSimilarity, calculateColorsAmountSimilarity } from '../ColorRecommendation/CalculateSimilarity';
import { calculateDominantColor, calculateDyadColor, calculateSplitComplementaryColor, calculateTriadColor, calculateTetradeColor, calculateDominantTone, calculatePentadColor, calculateHexadColor, calculateAnalogyColor, calculateIntermediateColor } from './CalculateColorScheme';
import { ReturnIsMouseReleased } from '../Reserch/Canvas';

const DEBUG = false;

let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];
let orderUsedColorsAmount: Array<ColorAmount> = [];
let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];

let orderUsedColorsDifference: number[] = [];
let orderUsedColorsDifferenceExcludeBaseColor: number[] = [];
let isCanvasMouseReleased = false;
export let isUpdateRecommendColorsScheme: boolean = false;
//let orderUsedColors: Array<p5.Color> = [];

export function CalculateRecommendColors() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      initializeVariables();
      p.frameRate(1);
    };

    function initializeVariables() {
      //for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
      recommendedColorSchemeAmount[0] = [];
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
    }

    p.draw = () => {
      updateVariables();
      //calculateRecommendColorSchemeAmount();
      if (isUpdateRecommendColorsScheme) {
        calculateRecommendColorSchemeAmountBySimilarity(orderUsedColorsAmount);
        //calculateRecommendColorSchemeAmountBySimilarity(usedColorSchemeAmountOnlyMainColor);
        console.log("recommendColorScheme was updated");
        isUpdateRecommendColorsScheme = false;
      }

      if (DEBUG) {
        //console.log("colorSimilarityLab(~): " + calculateLabColorSimilarity([255, 255, 255], [0, 0, 0]));
        console.log("calculateColorsAmountSimilarity(~,~) = " + calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[0]));
        //console.log("isUpdateRecommendColorsScheme = " + isUpdateRecommendColorsScheme);
      }

    };

    function updateVariables() {
      usedColorSchemeAmount = ReturnUsedColorSchemeAmount();
      usedColorSchemeAmountOnlyMainColor = ReturnUsedColorSchemeAmountOnlyMainColor();
      //orderUsedColors = ReturnOrderUsedColors();
      orderUsedColorsAmount = ReturnOrderUsedColorsAmount();
      isCanvasMouseReleased = ReturnIsMouseReleased();

      orderUsedColorsDifference = calculateHueDifference(orderUsedColorsAmount, 0, false, -1);
      orderUsedColorsDifferenceExcludeBaseColor = calculateHueDifference(orderUsedColorsAmount, 1, true, 0);
    }

    // 塗った配色と推薦する配色の類似度で配色を推薦する関数
    function calculateRecommendColorSchemeAmountBySimilarity(colorsAmount: ColorAmount[]) {
      if (colorsAmount.length === 0) { return; }
      resetRecommendedColorSchemeAmount();
      let baseColor = colorsAmount[0].color; // 最初に使われた色をベースカラーであると仮定する

      calculateColorScheme("dominantColor", baseColor);
      calculateColorScheme("dyad", baseColor);
      calculateColorScheme("splitComplementary", baseColor);
      calculateColorScheme("tetrade", baseColor);
      calculateColorScheme("triad", baseColor);
      calculateColorScheme("dominantTone", baseColor);
      calculateColorScheme("pentad", baseColor);
      calculateColorScheme("hexad", baseColor);
      calculateColorScheme("analogy", baseColor);
      calculateColorScheme("intermediate", baseColor);
    }

    // 推薦しようとしている配色の類似度を調べ，閾値以上だった場合追加を取り消す関数
    function calculateColorScheme(colorScheme: string, baseColor: p5.Color) {
      const VALUE = 40;

      if (colorScheme === "dominantColor") {
        calculateDominantColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "dyad") {
        calculateDyadColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "splitComplementary") {
        calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "tetrade") {
        calculateTetradeColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "triad") {
        calculateTriadColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "dominantTone") {
        calculateDominantTone(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "pentad") {
        calculatePentadColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "hexad") {
        calculateHexadColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "analogy") {
        calculateAnalogyColor(recommendedColorSchemeAmount, baseColor);
      }
      else if (colorScheme === "intermediate") {
        calculateIntermediateColor(recommendedColorSchemeAmount, baseColor);
      }
      else {
        console.error("用意されたものではない配色を推薦しようとしています.(" + colorScheme + ")");
      }

      // 閾値よりも相違度(?)が高かった場合その配色を削除
      if (calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[recommendedColorSchemeAmount.length - 1]) > VALUE) {
        recommendedColorSchemeAmount.pop();
      };

    }

    //塗った色の数によって配色を推薦する関数
    function calculateRecommendColorSchemeAmount() {

      let maxHueDifference = calculateMaxHueDifference(orderUsedColorsDifference);
      let maxHueDifferenceExcludeBaseColor = calculateMaxHueDifference(orderUsedColorsDifferenceExcludeBaseColor);

      if (DEBUG) {
        console.log("maxHueDifference = " + maxHueDifference);
        console.log("maxHueDifferenceExcludeBaseColor = " + maxHueDifferenceExcludeBaseColor);
      }

      let i = 0;
      if (orderUsedColorsAmount.length === 0) { return; }

      resetRecommendedColorSchemeAmount();

      let baseColor = orderUsedColorsAmount[0].color; // 最初に使われた色をベースカラーであると仮定する

      // 使われた色の数が1色だった場合
      if (orderUsedColorsAmount.length === 1) {
        calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        calculateDyadColor(recommendedColorSchemeAmount, baseColor);
        calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
      }

      // 使われた色の数が2色だった場合
      else if (orderUsedColorsAmount.length === 2) {
        if (maxHueDifference >= 90) {
          calculateDyadColor(recommendedColorSchemeAmount, baseColor);
          calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
        }
        else if (maxHueDifferenceExcludeBaseColor >= 60) {
          calculateTriadColor(recommendedColorSchemeAmount, baseColor);
        }
        else {
          calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        }
      }

      // 使われた色の数が3色以上だった場合
      else if (orderUsedColorsAmount.length >= 3) {
        if (maxHueDifference <= 90) {
          calculateDominantColor(recommendedColorSchemeAmount, baseColor);
        }
        else if (maxHueDifferenceExcludeBaseColor >= 60) {
          calculateTetradeColor(recommendedColorSchemeAmount, baseColor);
        }
        else {
          //calculateTriadColor(recommendedColorSchemeAmount, baseColor);
          calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
        }
      }
    }

    function calculateMaxHueDifference(hueDifferences: number[]) {
      let max = 0;
      for (let i = 0; i < hueDifferences.length; i++) {
        if (hueDifferences[i] > max) { max = hueDifferences[i]; }
      }

      return max;
    }

    function calculateHueDifference(colorsAmount: ColorAmount[], comparedColorIndex: number, isExcludeBaseColor: boolean, excludeColorIndex: number) {
      if (colorsAmount.length <= 1) { return []; }

      let comparedColor = colorsAmount[comparedColorIndex].color;
      let comparedHue = p.hue(comparedColor);
      let hueDifferences: number[] = [];

      for (let i = 0; i < colorsAmount.length; i++) {
        //if (i === baseColorIndex) { continue; }
        if (isExcludeBaseColor && (i === excludeColorIndex)) { continue; }

        let hue = p.hue(colorsAmount[i].color);
        let hueDifference = comparedHue - hue;
        hueDifference = p.round(hueDifference);
        if (hueDifference < 0) { hueDifference = -hueDifference; } //角度の差が負の値だった場合の修正
        if (hueDifference > 180) { hueDifference = 360 - hueDifference; } //角度の差が180度よりも大きい場合の修正

        hueDifferences.push(hueDifference);
      }

      //console.log(hueDifferences);
      return hueDifferences;

    }


    function resetRecommendedColorSchemeAmount() {
      recommendedColorSchemeAmount = [];
      //for (let i = 0; i < 10; i++) { recommendedColorSchemeAmount[i] = []; }
    }

    function calculateColorsAmount(colorAmount: ColorAmount[]) {
      let sumAmount = 0;
      for (let i = 0; i < colorAmount.length; i++) {
        sumAmount += colorAmount[i].amount;
      }
      return sumAmount;
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateRecommendColors
export function ReturnRecommendedColorSchemeAmount() { return recommendedColorSchemeAmount; }
export function ReturnOrderUsedColorsDifference() { return orderUsedColorsDifference; }
export function SetIsUpdateRecommendColorsScheme() { isUpdateRecommendColorsScheme = true; }