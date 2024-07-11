import { RGBColor, LabColor, diff, rgb_to_lab } from 'color-diff';
import { ColorAmount } from '../../utils/ColorAmount';
import p5, { Color } from 'p5';
import { estimateColorScheme } from './CalculateColorScheme';
import inputLogUsedColorSchemes from './data/inputLogUsedColorSchemes.json'

const DEBUG = false;

// RGB値をLabColor値(人間から見た類似度を計算するのに使う表示系？)に変換し相違度を比較する関数
export function calculateLabColorSimilarity(p5Color1: Color, p5Color2: Color): number {

  const p = new p5(() => { });

  let color1: number[] = [p.red(p5Color1), p.green(p5Color1), p.blue(p5Color1)];
  let color2: number[] = [p.red(p5Color2), p.green(p5Color2), p.blue(p5Color2)];

  const rgbColor1: RGBColor = { R: color1[0], G: color1[1], B: color1[2] };
  const rgbColor2: RGBColor = { R: color2[0], G: color2[1], B: color2[2] };

  const labColor1: LabColor = rgb_to_lab(rgbColor1);
  const labColor2: LabColor = rgb_to_lab(rgbColor2);

  return diff(labColor1, labColor2);
}


/*
export function calculateColorsAmountSimilarityP0(colorsAmount1: ColorAmount[], colorsAmount2: ColorAmount[]) {

  const p = new p5(() => { });
  let sum: number[] = [];

  if ((typeof (colorsAmount1) === 'undefined') || (typeof (colorsAmount2) === 'undefined')) { return -2; }
  if (colorsAmount1.length === 0 || colorsAmount2.length === 0) { return -1; }

  // 配列内の各色ごとに類似度を計算しその合計を求める
  for (let j = 0; j < colorsAmount2.length; j++) {
    //j: colorAmount2の比較を開始するインデックス
    sum[j] = 0;
    for (let i = 0; i < colorsAmount1.length; i++) {
      if (colorsAmount2.length - 1 < i) { continue; }
      let p5Color1: Color = colorsAmount1[i].color;
      let p5Color2: Color = colorsAmount2[j % colorsAmount2.length].color; //colorAmount2の比較を開始するインデックスをずらしていく

      if (DEBUG) {
        //console.log("(" + color1 + ") (" + color2 + ")");
        //console.log("calculateLabColorSimilarity(color1, color2) = " + calculateLabColorSimilarity(color1, color2))
        console.log("(" + j + ", " + i + ")");
      }


      sum[j] += calculateLabColorSimilarity(p5Color1, p5Color2);
    }

    // 比較する配列の長さに応じてsumの最大値は変動するため最大値が100になるように修正
    sum[j] = sum[j] / colorsAmount1.length;
  }

  let minSum = sum[0];
  let aveSum = 0;

  for (let i = 0; i < sum.length; i++) {
    //console.log("sum[" + i + "] = " + sum[i]);
    if (sum[i] < minSum) { minSum = sum[i]; }
    aveSum += sum[i];
  }

  aveSum = aveSum / sum.length;

  //console.log("minSum: " + minSum);
  //console.log("aveSum: " + aveSum);

  // 合計の最小値を採用すると全て同じ数値になってしまう
  return minSum;
  //return aveSum;
}

export function calculateColorsAmountSimilarityP1(colorsAmount1: ColorAmount[], colorsAmount2: ColorAmount[]) {

  const p = new p5(() => { });
  let sumSimilarity: number = 0;

  if ((typeof (colorsAmount1) === 'undefined') || (typeof (colorsAmount2) === 'undefined')) { return -2; }
  if (colorsAmount1.length === 0 || colorsAmount2.length === 0) { return -1; }

  //if (colorsAmount1.length < colorsAmount2.length) {
  // usedIndex: 最小値を保存するインデックスとして使用された場合trueを保存する関数
  let usedIndex: boolean[] = [];
  for (let i = 0; i < colorsAmount1.length; i++) {
    usedIndex.push(false);
  }

  for (let i = 0; i < colorsAmount1.length; i++) {
    // min: colorsAmount1[i].colorと比較して最も相違度が低かった値
    let min = calculateLabColorSimilarity(colorsAmount1[i].color, colorsAmount2[0].color);
    let minIndex = 0;
    for (let j = 0; j < colorsAmount2.length; j++) {
      // jがすでに比較されたインデックスだった場合
      if (usedIndex[j]) { continue; }

      // 最小値の更新
      let simValue = calculateLabColorSimilarity(colorsAmount1[i].color, colorsAmount2[j].color);
      if (simValue < min) {
        min = simValue;
        minIndex = j;
      }
    }

    // 類似度の合計と使用したインデックスを更新
    sumSimilarity += min;
    usedIndex[minIndex] = true;
  }
  //}

  if (DEBUG) {
    //console.log("colorsAmount1.length = " + colorsAmount1.length + ", sumSimilarity = " + Math.round(sumSimilarity));
    console.log("sumSimilarity / colorsAmount1.length = " + sumSimilarity / colorsAmount1.length);
  }

  return (sumSimilarity / colorsAmount1.length);
}
*/

// 使用ログの中に引数で受け取った配色があるかどうかを確認する関数
export function searchLogColorScheme(colorscheme: string) {
  for (let i = 0; i < inputLogUsedColorSchemes.length; i++) {
    if (inputLogUsedColorSchemes[i].colorScheme === colorscheme) {
      return inputLogUsedColorSchemes[i].count;
    }
  }
  return 0;
}

// 配色技法の使用率によって変動する相違度の調整値を求める関数
// ex) イラストのログを受け取って高頻度(１０枚中７枚とか)に使われた配色技法は優先度を高くする
export function calcSimDiffByUseRate(colorsAmount: ColorAmount[]) {
  //MAX_COUNT: ログのイラストの枚数
  //colorScheme: 比較される配色
  //count: 比較される配色のログの中での出現回数
  const MAX_COUNT = 10;
  let colorScheme = estimateColorScheme(colorsAmount);
  let count = searchLogColorScheme(colorScheme);

  console.log(colorScheme + ": " + (MAX_COUNT - count));

  return (MAX_COUNT - count);
}

// 
export function calculateColorsAmountSimilarity(colorsAmount1: ColorAmount[], colorsAmount2: ColorAmount[]) {
  // 推薦する配色の過去の使用率に合わせて調整値を設定
  // simDiff: 出現回数が多い程，小さくなる相違度の調整値(0 <= simDiff <= 10)
  let simDiff = calcSimDiffByUseRate(colorsAmount2);

  // colorsAmount1: 使用された配色
  // colorsAmount2: 比較される配色
  const p = new p5(() => { });
  let sumSimilarity: number = 0;
  let usedIndex1: number[] = [];
  let usedIndex2: number[] = [];
  let minIndexNumberArray: number[] = [];

  if ((typeof (colorsAmount1) === 'undefined') || (typeof (colorsAmount2) === 'undefined')) { return -2; }
  if (colorsAmount1.length === 0 || colorsAmount2.length === 0) { return -1; }

  for (let i = 0; i < colorsAmount1.length; i++) {
    // 使用済みのインデックスだった場合処理飛ばし
    let isContinued1 = false;
    for (let k = 0; k < usedIndex1.length; k++) {
      // iが使用済みのインデックスだった場合
      if (i === usedIndex1[k]) { isContinued1 = true; }
    }


    let minIndex = 0;
    let minSimValue = calculateLabColorSimilarity(colorsAmount1[i].color, colorsAmount2[0].color);
    for (let j = 0; j < colorsAmount2.length; j++) {
      let isContinued2 = false;

      // 使用済みのインデックスだった場合処理飛ばし
      for (let k = 0; k < usedIndex2.length; k++) {
        // jが使用済みのインデックスだった場合
        if (j === usedIndex2[k]) { isContinued2 = true; }
      }
      if (isContinued2) { continue; }

      //console.log("(i, j) = (" + i + "," + j + ")");


      // colorsAmount1[i]に対してcolorsAmount2[j]と最も相違度が小さいものを計測
      let simValue = calculateLabColorSimilarity(colorsAmount1[i].color, colorsAmount2[j].color);
      if (simValue < minSimValue) {
        minSimValue = simValue;

        //最も相違度が小さいとされたインデックスを使用済みとして記録
        usedIndex1.push(i);
        usedIndex2.push(j);
        minIndex = j;
      }
      //console.log("minIndex = " + minIndex);
    }

    minIndexNumberArray.push(minIndex);
    //console.log(minIndexNumberArray);

    sumSimilarity += minSimValue;
  }

  for (let i = 0; i < minIndexNumberArray.length; i++) {
    colorsAmount2.splice(minIndexNumberArray[i], 1);
    for (let j = 0; j < minIndexNumberArray.length; j++) {
      minIndexNumberArray[j] -= 1;
    }
  }

  let simValue = sumSimilarity / colorsAmount1.length;
  simValue += simDiff;

  return (simValue);
}
