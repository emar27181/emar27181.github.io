import { RGBColor, LabColor, diff, rgb_to_lab } from 'color-diff';
import { ColorAmount } from '../../utils/ColorAmount';
import p5, { Color } from 'p5';
import { estimateColorScheme } from './CalculateColorScheme';
import inputLogUsedColorSchemes from './data/input/inputLogUsedColorSchemes.json'
import {WEIGHTING_COEFFICIENT } from '../../config/constants';

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

// 使用ログの中に引数で受け取った配色があるかどうかを確認する関数
export function searchLogColorScheme(colorscheme: string) {
  for (let i = 0; i < inputLogUsedColorSchemes.length; i++) {
    if (inputLogUsedColorSchemes[i].colorScheme === colorscheme) {
      return inputLogUsedColorSchemes[i].count;
    }
  }
  return 0;
}

// 使用ログ内のイラストの枚数を計算する関数
function calcIllustlationCount(){
  let illustCount = 0;
  for(let i = 0; i < inputLogUsedColorSchemes.length; i++){
    illustCount += inputLogUsedColorSchemes[i].count;
  }
  return illustCount;
}

// 配色技法の使用率によって変動する相違度の調整値を求める関数
// ex) イラストのログを受け取って高頻度(１０枚中７枚とか)に使われた配色技法は優先度を高くする
export function calcSimDiffByUseRate(colorsAmount: ColorAmount[]) {
  //colorScheme: 比較される配色
  //count: 比較される配色のログの中での出現回数

  let colorScheme = estimateColorScheme(colorsAmount);
  let count = searchLogColorScheme(colorScheme);
  const ILLUST_COUNT = calcIllustlationCount();
  //console.log("ILLUST_COUNT" + ILLUST_COUNT );

  if (DEBUG) { console.log(colorScheme + ": " + (ILLUST_COUNT - count)); }

  return ((ILLUST_COUNT - count) / ILLUST_COUNT);
}



// 
export function calculateColorsAmountSimilarity(colorsAmount1: ColorAmount[], colorsAmount2: ColorAmount[], weightingCoefficient: number) {
  // 推薦する配色の過去の使用率に合わせて調整値を設定
  // simValueByUserate: 出現回数が多い程，小さくなる相違度の調整値(0 <= simValueByUserate <= 1)
  let simValueByUseRate = calcSimDiffByUseRate(colorsAmount2);

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

  // simValueBetweenUsedAndRecommend: 配色同士の相違度
  // (0<=simValueBetweenUsedAndRecommend<=1)
  let simValueBetweenUsedAndRecommend = (sumSimilarity / colorsAmount1.length) / 100;

  //console.log((1 - WEIGHTING_COEFFICIENT) * simValueBetweenUsedAndRecommend + " + " + WEIGHTING_COEFFICIENT * simValueByUseRate)

  //WEIGHTING_COEFFICIENT: 重み付け係数(説明では"W"と表記する)
  //(1-W)*(使用配色と推薦配色の相違度) + W*(推薦配色の配色技法の利用率)
  //return ((1 - WEIGHTING_COEFFICIENT) * simValueBetweenUsedAndRecommend + WEIGHTING_COEFFICIENT * simValueByUseRate);
  return ((1 - weightingCoefficient) * simValueBetweenUsedAndRecommend + weightingCoefficient * simValueByUseRate);
}
