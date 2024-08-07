import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';
import p5 from 'p5';
import { calculateDominantColor, calculateDyadColor, calculateSplitComplementaryColor, calculateTetradeColor, calculateTriadColor, calculateDominantTone, calculatePentadColor, calculateHexadColor, calculateAnalogyColor, calculateIntermediateColor, addColorSchemesLightnessVariations, calculatePentadColorBkW, calculateHexadBkWColor } from './CalculateColorScheme';
import { LIGHTNESS_DIFF, VARIATIONS_LIGHTNESS_DIFF as lightnessDiffs } from '../../config/constants';
import { DataRecommendColorAmount } from '../../utils/DataRecommendColorAmount';
import { convertToJsonData } from './ConvertToJsonData';
import { JsonDataRecommendColorScheme } from '../../utils/JsonDataRecommendColorScheme';
import { calculateColorsAmountSimilarity } from './CalculateSimilarity';
import { similarityValues } from './CalculateRecommendColors';
import { FilterdColorAmount } from '../../utils/FilteredColorAmount';
//import { recommendedColorSchemeAmount } from './CalculateRecommendColors';

// 引数で受け取る配色に対して推薦する配色群を生成しそのデータをJson形式返す関数
export function CalculateRecommendColorSchemeJsonData(colorSchemeNumber: number, colorNumber: number, colorsAmount: ColorAmount[], lightnessDiffs: number[], weightingCoefficient: number): JsonDataRecommendColorScheme {
  const p = new p5(() => { });

  // 推薦する配色群を保存する二重配列を初期化
  let recommendedColorSchemeAmount: ColorAmount[][] = [];

  // 引数で受け取った配色を基に推薦する配色群を計算(17パターン(2024/06/28時点))
  updateRecommendColorSchemeAmount(colorsAmount, recommendedColorSchemeAmount);

  //推薦された配色群の明度が異なるバリエーションを追加(+2バリエーション(2024/06/28))
  addRecommendColorValiations(recommendedColorSchemeAmount, lightnessDiffs);
  /*
  const RECOMMEND_LENGTH = recommendedColorSchemeAmount.length;
  for (let i = 0; i < RECOMMEND_LENGTH; i++) {

    //addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, + LIGHTNESS_DIFF);
    //addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, - LIGHTNESS_DIFF);
  }
  */

  // 推薦した配色群と使用した色の類似度の計算と配列への代入
  let similarityValues = updateSimilarityValues(colorsAmount, recommendedColorSchemeAmount, weightingCoefficient);

  //使用した配色と推薦する配色群をカラーコードとその色の量のデータに変換して代入
  let filteredOrderUsedColorsAmount: FilterdColorAmount[] = convertToJsonData(colorsAmount);
  let filteredRecommendedColorSchemeAmount: FilterdColorAmount[][] = [];
  for (let i = 0; i < recommendedColorSchemeAmount.length; i++) {
    if (recommendedColorSchemeAmount[i].length === 0) { continue; }
    filteredRecommendedColorSchemeAmount.push(convertToJsonData(recommendedColorSchemeAmount[i]));
    //console.log("filteredRecommendedColorSchemeAmount[" + i + "] = " + filteredRecommendedColorSchemeAmount[i]);
  }

  // 推薦する配色群のデータに類似度の数値を挿入
  let dataRecommendColorsAmount: DataRecommendColorAmount[] = [];
  dataRecommendColorsAmount = addSimilarityValuesTorecommendColorsAmount(filteredRecommendedColorSchemeAmount, similarityValues);

  // dataRecommendColorsAmountを相違度が低い順にソート
  dataRecommendColorsAmount.sort((a, b) => a.similarityValue - b.similarityValue);

  // 
  let addJsonData = updateJsonDataRecommendColorScheme(colorSchemeNumber, colorNumber, filteredOrderUsedColorsAmount, dataRecommendColorsAmount);

  //console.log("addJsonData = " + addJsonData);

  //return recommendedColorSchemeAmount;
  return addJsonData;
}


  //推薦された配色群に異なるバリエーションをまとめて追加する関数
export function addRecommendColorValiations(recommendedColorSchemeAmount: ColorAmount[][], lightnessDiffs: number[]) {
  const RECOMMEND_LENGTH = recommendedColorSchemeAmount.length;
  for (let i = 0; i < RECOMMEND_LENGTH; i++) {

    for (let j = 0; j < lightnessDiffs.length; j++) {
      addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, + lightnessDiffs[j]);
    }

  }
}

// 塗った配色を基にいくつかの配色を推薦する配色群を保存する二重配列を更新する関数
export function updateRecommendColorSchemeAmount(baseColorsAmount: ColorAmount[], recommendColorSchemeAmount: ColorAmount[][]) {
  if (typeof (baseColorsAmount) === "undefined") { return; }
  // ベースとなる配色がなかった場合何もせず終了
  if (baseColorsAmount.length === 0) { return; }

  //recommendColorSchemeAmount = [];

  let baseColor = baseColorsAmount[0].color; // 最初に使われた色をベースカラーであると仮定する

  // ベースカラーを基に配列に配色を追加
  calculateDominantColor(recommendColorSchemeAmount, baseColor);
  calculateDyadColor(recommendColorSchemeAmount, baseColor);
  calculateSplitComplementaryColor(recommendColorSchemeAmount, baseColor, 1); // ※スプリットコンプリメンタリーのみ3パターン推薦配色を追加
  calculateSplitComplementaryColor(recommendColorSchemeAmount, baseColor, 2); // ※スプリットコンプリメンタリーのみ3パターン推薦配色を追加
  calculateTetradeColor(recommendColorSchemeAmount, baseColor);
  calculateTriadColor(recommendColorSchemeAmount, baseColor);
  calculateDominantTone(recommendColorSchemeAmount, baseColor);
  calculatePentadColor(recommendColorSchemeAmount, baseColor);
  calculateHexadColor(recommendColorSchemeAmount, baseColor);
  calculateAnalogyColor(recommendColorSchemeAmount, baseColor);
  calculateIntermediateColor(recommendColorSchemeAmount, baseColor);
  calculatePentadColorBkW(recommendColorSchemeAmount, baseColor);
  calculateHexadBkWColor(recommendColorSchemeAmount, baseColor);

  /*
  addColorScheme("dominantColor", baseColor, recommendColorSchemeAmount);
  addColorScheme("dyad", baseColor, recommendColorSchemeAmount);
  addColorScheme("splitComplementary", baseColor, recommendColorSchemeAmount);
  addColorScheme("tetrade", baseColor, recommendColorSchemeAmount);
  addColorScheme("triad", baseColor, recommendColorSchemeAmount);
  addColorScheme("dominantTone", baseColor, recommendColorSchemeAmount);
  addColorScheme("pentad", baseColor, recommendColorSchemeAmount);
  addColorScheme("hexad", baseColor, recommendColorSchemeAmount);
  addColorScheme("analogy", baseColor, recommendColorSchemeAmount);
  addColorScheme("intermediate", baseColor, recommendColorSchemeAmount);
  */
}

// 引数で受け取った配色技法の推薦を推薦する配色群を保存する配列に追加する関数
function addColorScheme(colorScheme: string, baseColor: p5.Color, recommendedColorSchemeAmount: ColorAmount[][]) {

  if (false) { }
  else if (colorScheme === "dominantColor") { calculateDominantColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "dyad") { calculateDyadColor(recommendedColorSchemeAmount, baseColor); }
  //else if (colorScheme === "splitComplementary") { calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "tetrade") { calculateTetradeColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "triad") { calculateTriadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "dominantTone") { calculateDominantTone(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "pentad") { calculatePentadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "hexad") { calculateHexadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "analogy") { calculateAnalogyColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "intermediate") { calculateIntermediateColor(recommendedColorSchemeAmount, baseColor); }
  else { console.error("用意されたものではない配色を推薦しようとしています.(" + colorScheme + ")"); }

}

function updateJsonDataRecommendColorScheme(colorSchemeNumber: number, colorNumber: number, filteredOrderUsedColorsAmount: FilterdColorAmount[], dataRecommendColorsAmount: DataRecommendColorAmount[]) {
  const LOAD_NUMBER = [colorSchemeNumber, colorNumber];

  // 最新のデータを取得
  const addJsonData: JsonDataRecommendColorScheme = {
    LOAD_NUMBER,
    filteredOrderUsedColorsAmount,
    dataRecommendColorsAmount,
  };

  return addJsonData;

}

export function addSimilarityValuesTorecommendColorsAmount(colorsAmount: FilterdColorAmount[][], similarityValues: number[]) {
  let dataColorsAmount: DataRecommendColorAmount[] = [];
  for (let i = 0; i < colorsAmount.length; i++) {
    let addData: DataRecommendColorAmount = {
      "similarityValue": similarityValues[i],
      "colorsAmount": colorsAmount[i]
    }
    dataColorsAmount.push(addData);
    //console.log("dataRecommendColorsAmount[" + i + "] = " + dataColorsAmount[i]);
  }
  return dataColorsAmount;
}

function updateSimilarityValues(orderUsedColorsAmount: ColorAmount[], recommendedColorSchemeAmount: ColorAmount[][], weightingCoefficient: number) {
  let similarityValues: number[] = [];
  for (let i = 0; i < recommendedColorSchemeAmount.length; i++) {
    let simValue = calculateColorsAmountSimilarity(orderUsedColorsAmount, recommendedColorSchemeAmount[i], weightingCoefficient);
    similarityValues[i] = simValue;
  }
  return similarityValues;
}