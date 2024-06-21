import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ColorAmount } from '../../utils/ColorAmount';
import { ReturnUsedColorSchemeAmount } from './CalculateUsedColors';
import { ReturnOrderUsedColors, ReturnOrderUsedColorsAmount, ReturnUsedColorSchemeAmountOnlyMainColor } from './CalculateUsedColors';
import p5 from 'p5';
import Color from 'color';
import { calculateLabColorSimilarity, calculateColorsAmountSimilarity } from '../ColorRecommendation/CalculateSimilarity';
import { calculateDominantColor, calculateDyadColor, calculateSplitComplementaryColor, calculateTriadColor, calculateTetradeColor, calculateDominantTone, calculatePentadColor, calculateHexadColor, calculateAnalogyColor, calculateIntermediateColor, addColorSchemesLightnessVariations, calculatePentadColorBkW } from './CalculateColorScheme';
import { ReturnIsMouseReleased } from '../Reserch/Canvas';
import { convertToJsonData } from './ConvertToJsonData';
import { LIGHTNESS_DIFF } from '../../config/constants';
import { isColorPaintNext } from './EvaluateIsColorPaintNext';
import { LOAD_USED_COLOR_NUMBER, LOAD_USED_COLOR_SCHEME_NUMBER } from '../../config/constants.dev';
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json";
import { DataRecommendColorAmount, addSimilarityValuesTorecommendColorsAmount } from '../../components/ButtonSaveColorScheme';
import { JsonDataRecommendColorScheme } from '../../utils/JsonDataRecommendColorScheme';
import { updateRecommendColorSchemeAmount } from './CalculateRecommendColorSchemeJsonData';

const DEBUG = false;

export let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];
export let orderUsedColorsAmount: Array<ColorAmount> = [];
export let filteredOrderUsedColorsAmount: number[] | { color: string; amount: number; }[] = [];
export let filteredRecommendedColorSchemeAmount: number[][] | { color: string; amount: number; }[][] = [];
let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];

export let similarityValues: number[] = [];
export let displayOrderIndex: number[] = [];
export let jsonDataRecommendColorScheme: JsonDataRecommendColorScheme[] = []

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
      if (isUpdateRecommendColorsScheme) {
        updateVariables();

        // 推薦配色群のスロットのリセット
        recommendedColorSchemeAmount = [];

        //推薦する配色の追加
        updateRecommendColorSchemeAmount(orderUsedColorsAmount, recommendedColorSchemeAmount);
        //calculateRecommendColorSchemeAmountBySimilarity(orderUsedColorsAmount);

        //推薦された配色群の明度が異なるバリエーションを追加
        const RECOMMEND_LENGTH = recommendedColorSchemeAmount.length;
        for (let i = 0; i < RECOMMEND_LENGTH; i++) {
          addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, + LIGHTNESS_DIFF);
          addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, - LIGHTNESS_DIFF);
        }

        //推薦する配色群をjson型に変換されたデータに変換して代入
        filteredOrderUsedColorsAmount = convertToJsonData(orderUsedColorsAmount);
        for (let i = 0; i < recommendedColorSchemeAmount.length; i++) {
          filteredRecommendedColorSchemeAmount[i] = convertToJsonData(recommendedColorSchemeAmount[i]);
          //console.log("filteredRecommendedColorSchemeAmount[" + i + "] = " + filteredRecommendedColorSchemeAmount[i]);
        }
        console.log("filteredRecommendedColorSchemeAmount is updated");

        //推薦する配色の相違度を更新
        updateSimilarityValues();

        //相違度を基に表示する順序を保存する配列の更新
        displayOrderIndex = calculateDisplayOrder();

        //calculateRecommendColorSchemeAmountBySimilarity(usedColorSchemeAmountOnlyMainColor);
        console.log("recommendColorScheme was updated");

        // 推薦された配色に次の色が含まれているかの確認
        // 現在isColorPaintNext()では推薦した配色群"全体"と使用した配色で比較しているため推薦した配色"単体"に対して使用不可
        //isColorPaintNext(LOAD_USED_COLOR_SCHEME_NUMBER, LOAD_USED_COLOR_NUMBER, -1);

        jsonDataRecommendColorScheme = [];
        jsonDataRecommendColorScheme.push(updateJsonDataRecommendColorScheme(0, 0));
        jsonDataRecommendColorScheme.push(updateJsonDataRecommendColorScheme(0, 1));


        isUpdateRecommendColorsScheme = false;
      }

      if (DEBUG) {
        //console.log("colorSimilarityLab(~): " + calculateLabColorSimilarity([255, 255, 255], [0, 0, 0]));
        console.log("calculateColorsAmountSimilarity(~,~) = " + calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[0]));
        //console.log("isUpdateRecommendColorsScheme = " + isUpdateRecommendColorsScheme);
        //console.log("similarityValues = " + similarityValues);
        //console.log("recommendedColorSchemeAmount.length = " + recommendedColorSchemeAmount.length);
        //console.log("displayOrderIndex = " + displayOrderIndex);
        //console.log(filteredOrderUsedColorsAmount);
        //console.log("filteredOrderUsedColorsAmount = " + filteredOrderUsedColorsAmount);
        //console.log(filteredRecommendedColorSchemeAmount);
        //console.log("filteredRecommendedColorSchemeAmount = " + filteredRecommendedColorSchemeAmount);

      }

    };

    function updateJsonDataRecommendColorScheme(colorSchemeNumber: number, colorNumber: number) {
      const LOAD_NUMBER = [colorSchemeNumber, colorNumber];
      let dataRecommendColorsAmount: DataRecommendColorAmount[] = [];
      dataRecommendColorsAmount = addSimilarityValuesTorecommendColorsAmount(filteredRecommendedColorSchemeAmount)

      // 最新のデータを取得
      const addJsonData: JsonDataRecommendColorScheme = {
        LOAD_NUMBER,
        filteredOrderUsedColorsAmount,
        dataRecommendColorsAmount,
        //filteredRecommendedColorSchemeAmount,
      };

      return addJsonData;

    }

    //推薦する配色のうち類似度が小さい順に表示させるためのインデックス番号を保存する配列を計算する関数
    function calculateDisplayOrder() {

      if (DEBUG) {
        for (let i = 0; i < similarityValues.length; i++) {
          console.log("similarityValue[" + i + "] = " + Math.round(similarityValues[i]));
        }
      }

      // インデックスと対応するsimilarityValueの値をペアにする
      let indexedSimilarity: { index: number, value: number }[] = similarityValues.map((value, index) => ({ index, value }));

      // similarityValuesの値でソートする
      indexedSimilarity.sort((a, b) => a.value - b.value);

      // ソートされたペアからインデックス番号を取り出す
      let sortedIndex: number[] = indexedSimilarity.map(item => item.index);

      return sortedIndex;
    }

    p.keyPressed = () => {
      if (p.key === "k") {
        deleteOrderUsedColorSchemeAmount();
        console.log("called");
      }
    }

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


      // ベースカラーを基に配列に配色を追加
      calculateDominantColor(recommendedColorSchemeAmount, baseColor);
      calculateDyadColor(recommendedColorSchemeAmount, baseColor);
      calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor);
      calculateTetradeColor(recommendedColorSchemeAmount, baseColor);
      calculateTriadColor(recommendedColorSchemeAmount, baseColor);
      calculateDominantTone(recommendedColorSchemeAmount, baseColor);
      calculatePentadColor(recommendedColorSchemeAmount, baseColor);
      calculateHexadColor(recommendedColorSchemeAmount, baseColor);
      calculateAnalogyColor(recommendedColorSchemeAmount, baseColor);
      calculateIntermediateColor(recommendedColorSchemeAmount, baseColor);
      calculatePentadColorBkW(recommendedColorSchemeAmount, baseColor);
      /*
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
      */
    }

    // 推薦しようとしている配色の類似度を調べ，閾値以上だった場合追加を取り消す関数
    function calculateColorScheme(colorScheme: string, baseColor: p5.Color) {
      const VALUE = 100;

      if (colorScheme === "dominantColor") { calculateDominantColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "dyad") { calculateDyadColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "splitComplementary") { calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "tetrade") { calculateTetradeColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "triad") { calculateTriadColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "dominantTone") { calculateDominantTone(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "pentad") { calculatePentadColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "hexad") { calculateHexadColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "analogy") { calculateAnalogyColor(recommendedColorSchemeAmount, baseColor); }
      else if (colorScheme === "intermediate") { calculateIntermediateColor(recommendedColorSchemeAmount, baseColor); }
      else { console.error("用意されたものではない配色を推薦しようとしています.(" + colorScheme + ")"); }

      /*
      let simValue = calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[recommendedColorSchemeAmount.length - 1]);

      // 閾値よりも相違度が高かった場合その配色を削除
      if (simValue > VALUE) {
        recommendedColorSchemeAmount.pop();
      }
      // 閾値よりも相違度が高かった場合その配色の相違度を配列に保存
      else {
        similarityValues[recommendedColorSchemeAmount.length - 1] = p.round(simValue);
      }

      */
      //console.log("recommendedColorSchemeAmount.length = " + recommendedColorSchemeAmount.length);
    }

    function updateSimilarityValues() {
      similarityValues = [];
      for (let i = 0; i < recommendedColorSchemeAmount.length; i++) {
        let simValue = calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[i]);
        similarityValues[i] = simValue;
      }
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

    function deleteOrderUsedColorSchemeAmount() {
      orderUsedColorsAmount.shift();
      SetIsUpdateRecommendColorsScheme();
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