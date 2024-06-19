
import p5 from "p5";
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"
import outputRecommendColorsAmountAll from "./data/output/outputRecommendColorsAmountAll.json"
import { calculateLabColorSimilarity } from "./CalculateSimilarity";
import { consoleLogColors } from "../../utils/consoleLogColors";

// used[i][j]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
export function isColorPaintNext(colorSchemeNumber: number, colorNumber: number, recommendIndex: number): boolean {
  // SIM_VALUE_LIMIT: 相違度の限界値(これより相違度が大きい配色は評価されない)
  // conpareCount: used[colorSchemeNmuber][colorNumber]とrecommend[][]が比較した回数を保存する変数
  const SIM_VALUE_LIMIT = 10;
  let compareCount = 0;

  // 次の色が存在しない場合終了
  if (inputOrderUsedColorScheme[colorSchemeNumber].length <= (colorNumber + 1)) {
    return false;
  }

  console.log("------used[" + colorSchemeNumber + "][" + colorNumber + "] --------------------")
  console.log("次の色used[" + colorSchemeNumber + "][" + (colorNumber + 1) + "]は" + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color + "です．");
  consoleLogColors(inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color, inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color)

  // used[colorSchemeNumber][colorNumber]のに対する推薦配色のセット
  let dataRecomenndColorsAmount = outputRecommendColorsAmountAll[recommendIndex].dataRecommendColorsAmount;
  let recomenndColorsAmount = dataRecomenndColorsAmount.map(item => item.colorsAmount); // 配色を抽出し代入


  const p = new p5(() => { });
  // recommend[][]にused[colorSchemeNumber][colorNumber+1](次の色)が含まれているかどうかの確認
  for (let i = 0; i < recomenndColorsAmount.length; i++) {
    // simValue: used[colorSchemeNumber][colorNumber]に対するrecommend[i]の相違度
    let simValue = dataRecomenndColorsAmount[i].similarityValue;

    // 相違度の限界値よりも大きい場合
    if (simValue >= SIM_VALUE_LIMIT) {
      continue;
    }

    for (let j = 0; j < recomenndColorsAmount[i].length; j++) {
      compareCount++;

      let p5Color1 = p.color(recomenndColorsAmount[i][j].color);
      let p5Color2 = p.color(inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color);

      // 推薦配色の中に次の色が含まれていた場合
      if (isSameColor(p5Color1, p5Color2)) {
        //if (recomenndColorsAmount[i][j].color === inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color) {
        console.log("推薦配色の中に次の色が含まれていました．(recomenndColorsAmount[" + i + "][" + j + "].color = " + recomenndColorsAmount[i][j].color + ", compareCount = " + compareCount + ")");
        consoleLogColors(recomenndColorsAmount[i][j].color, recomenndColorsAmount[i][j].color);
        return true;
      }
    }
  }

  // 推薦配色の中に次の色が含まれていなかった場合
  console.log("推薦配色の中に次の色が含まれていませんでした．(compareCount = " + compareCount + ")");
  return false;
}

export function isSameColor(p5Color1: p5.Color, p5Color2: p5.Color): boolean {
  const SIM_VALUE_SAME_COLOR = 10;

  let simValue = calculateLabColorSimilarity(p5Color1, p5Color2);

  return (simValue <= SIM_VALUE_SAME_COLOR);
}

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): number {
  let recommendColorsAmountAll = outputRecommendColorsAmountAll;

  //console.log("recommendColorsAmountAll.length = " + recommendColorsAmountAll.length);

  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    let colorSchemeNumber = recommendColorsAmountAll[i].LOAD_NUMBER[0];
    let colorNumber = recommendColorsAmountAll[i].LOAD_NUMBER[1];
    let dataRecomenndColorsAmount = recommendColorsAmountAll[i].dataRecommendColorsAmount;

    isColorPaintNext(colorSchemeNumber, colorNumber, i);
  }
  return 0;
}