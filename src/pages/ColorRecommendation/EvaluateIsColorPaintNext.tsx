
import p5 from "p5";
import inputOrderUsedColorScheme from "./data/input/inputOrderUsedColorsAmount.json";
//import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"
//import outputRecommendColorsAmountAll from "./data/output/outputRecommendColorsAmountAll.json"
import outputRecommendColorsSchemeAll_LIGHT_10_20 from "./data/output/outputRecommendColorsSchemeAll_LIGHT=_-10_10_-20_20.json"
import { calculateLabColorSimilarity } from "./CalculateSimilarity";
import { consoleLogColors } from "../../utils/consoleLogColors";
//import { MAX_RECOMMENDED_COLOR_SCHEME_LENGTH, SIM_VALUE_DISPLAY_LIMIT, SIM_VALUE_SAME_COLOR, IS_EVALUATE_TIMING_DRAW_COLOR } from "../../config/constants";
import { MAX_RECOMMENDED_COLOR_SCHEME_LENGTH, SIM_VALUE_DISPLAY_LIMIT } from "../../config/constants";
import { PrecisionAtK } from "../../utils/PrecisionAtK";
import { RecallAtK } from "../../utils/RecallAtK";

// compareCountSum: 使用配色と推薦配色の比較を行った回数を保存する変数
// sumRecommendColorSchemeExcludeFirstColorReco: 1色目を基に推薦するのを除外した推薦配色群の合計
// evaluateedUsedColorSchemeCount: 評価対象の使用配色の数
// IS_PRINT_IS_EXIST_SAME_COLOR: 次の色が含まれているかどうかの情報をコンソール表示させるかどうかを保存する変数
let compareCountSum = 0;
let sumRecommendColorSchemeExcludeFirstColorReco = 0;
//let evaluatedUsedColorSchemeCount = 0;
const DEBUG = false;
const IS_PRINT_IS_EXIST_SAME_COLOR = true;

let recalls: RecallAtK[] = [];
for (let i = 0; i < MAX_RECOMMENDED_COLOR_SCHEME_LENGTH; i++) {
  recalls[i] = {
    k: i,
    recall: 0,
    colorCountAve: 0,
  }
}


// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(SAME: number, TIME: number[] ): RecallAtK[] {

  //createRecalls(IS_EVALUATE_TIMING_DRAW_COLOR);
  createRecalls(SAME, TIME, outputRecommendColorsSchemeAll_LIGHT_10_20);
  updateRecallsColorCountAve(outputRecommendColorsSchemeAll_LIGHT_10_20);

  return recalls;
}

// k種類目の配色を推薦するときの色の数の平均を計算する関数
export function updateRecallsColorCountAve(outputRecommendColorsAmountAll: any) {
  let recommendColorsAmountAll = outputRecommendColorsAmountAll;

  // illust: 読込んだイラストの番号
  for (let illust = 0; illust < recommendColorsAmountAll.length; illust++) {
    //console.log("---illust = " + illust + "------------");

    // patternNum: 配色パターンの番号
    for (let patternNum = 0; patternNum < recommendColorsAmountAll[illust].dataRecommendColorsAmount.length; patternNum++) {
      //console.log("[" + patternNum + "] = " + recommendColorsAmountAll[illust].dataRecommendColorsAmount[patternNum].colorsAmount.length);
      recalls[patternNum].colorCountAve += recommendColorsAmountAll[illust].dataRecommendColorsAmount[patternNum].colorsAmount.length;
    }
  }

  for (let i = 0; i < recalls.length; i++) {
    let ave = recalls[i].colorCountAve / recommendColorsAmountAll.length;
    ave = Math.round(ave * 100) / 100;
    recalls[i].colorCountAve = ave;
  }
}

// 評価対象の使用配色の数を計算する関数
function calculateEvaluatedUsedColorSchemeCount(IS_EVALUATE_TIMING_DRAW_COLOR: number[]): number {
  let evaluatedUsedColorSchemeCountValue = 0;
  for (let i = 0; i < inputOrderUsedColorScheme.length; i++) {
    for (let j = 0; j < inputOrderUsedColorScheme[i].length; j++) {
      // jが評価対象のインデックス番号かのチェック
      let isEvaluated = false;
      for (let k = 0; k < IS_EVALUATE_TIMING_DRAW_COLOR.length; k++) {
        if (j === IS_EVALUATE_TIMING_DRAW_COLOR[k]) {
          isEvaluated = true;
          break;
        }
      }

      if (isEvaluated) {
        evaluatedUsedColorSchemeCountValue++;
      }
    }
  }
  return evaluatedUsedColorSchemeCountValue;
}

// jsonファイルを基にused[colorSchemeNumber][colorNumber]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
// colorSchemeNumber: 読込む使用配色のインデックス番号を保存する変数
// colorNumber: 使用配色のどの色までインデックス番号まで読み込むかを保存する変数
// recommendIndex: 推薦した配色群を保存する配列の読込むインデックス番号を保存する変数
export function isColorPaintNext(colorSchemeNumber: number, colorNumber: number, recommendIndex: number, simValueThresholdIsDisplay: number, simValueThresholdIsSameColor: number, outputRecommendColorsAmountAll: any): boolean {
  // SIM_VALUE_LIMIT: 相違度の限界値(これより相違度が大きい配色は評価されない)
  // conpareCount: used[colorSchemeNmuber][colorNumber+1]とrecommend[][]が比較した回数を保存する変数

  let compareCount = 0;

  // 次の色が存在しない場合終了
  if (inputOrderUsedColorScheme[colorSchemeNumber].length <= (colorNumber + 1)) {
    return false;
  }



  if (IS_PRINT_IS_EXIST_SAME_COLOR) {
    console.log("------used[" + colorSchemeNumber + "][" + colorNumber + "] --------------------")
    console.log("次の色used[" + colorSchemeNumber + "][" + (colorNumber + 1) + "]は" + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color + "です．");
    consoleLogColors(("■■■used=“" + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color + "”■■■■■■■■■"), inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color)
  }

  // used[colorSchemeNumber][colorNumber]のに対する推薦配色のセット
  let dataRecomenndColorsAmount = outputRecommendColorsAmountAll[recommendIndex].dataRecommendColorsAmount;
  let recomenndColorsAmount = dataRecomenndColorsAmount.map(item => item.colorsAmount); // 配色を抽出し代入
  sumRecommendColorSchemeExcludeFirstColorReco += recomenndColorsAmount.length;
  const p = new p5(() => { });

  // recommend[][]にused[colorSchemeNumber][colorNumber+1](次の色)が含まれているかどうかの確認
  for (let i = 0; i < recomenndColorsAmount.length; i++) {
    // simValue: used[colorSchemeNumber][colorNumber]に対するrecommend[i]の相違度
    let simValue = dataRecomenndColorsAmount[i].similarityValue;

    // 相違度の限界値よりも大きい場合
    if (simValue > simValueThresholdIsDisplay) {
      continue;
    }

    for (let j = 0; j < recomenndColorsAmount[i].length; j++) {
      compareCount++;

      let p5Color1 = p.color(recomenndColorsAmount[i][j].color);
      let p5Color2 = p.color(inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color);

      // 推薦配色の中に次の色が含まれていた場合
      if (isSameColor(p5Color1, p5Color2, simValueThresholdIsSameColor)) {

        if (IS_PRINT_IS_EXIST_SAME_COLOR) {
          consoleLogColors(("■■■reco=“" + recomenndColorsAmount[i][j].color + "”■■■■■■■■■"), recomenndColorsAmount[i][j].color);
          let text = ("推薦配色の中に次の色が含まれていました．(recomenndColorsAmount[" + i + "][" + j + "].color = " + recomenndColorsAmount[i][j].color + ", k = " + (i + 1) + ", simValue = " + simValue + ")");
          //let text = ("推薦配色の中に次の色が含まれていました．(recomenndColorsAmount[" + i + "][" + j + "].color = " + recomenndColorsAmount[i][j].color + ", compareCount = " + compareCount + ", simValue = " + simValue + ")");
          consoleLogColors(text, "#AA5500");
        }
        compareCountSum += compareCount;

        //for (let k = compareCount; k < recalls.length; k++) {
        for (let k = i + 1; k < recalls.length; k++) {
          recalls[k].recall++;
        }
        return true;
      }
    }
  }

  // 推薦配色の中に次の色が含まれていなかった場合
  if (IS_PRINT_IS_EXIST_SAME_COLOR) {
    //let text = ("推薦配色の中に次の色が含まれていませんでした．(compareCount = " + compareCount + ")");
    let text = ("推薦配色の中に次の色が含まれていませんでした．(k = " + recomenndColorsAmount.length + ")");
    consoleLogColors(text, "#0000DD");
  }
  compareCountSum += compareCount;
  return false;
}

export function isSameColor(p5Color1: p5.Color, p5Color2: p5.Color, simValueThresholdIsSameColor: number): boolean {

  let simValue = calculateLabColorSimilarity(p5Color1, p5Color2);

  return (simValue <= simValueThresholdIsSameColor);
}


// recall@kのデータを生成する関数
function createRecalls(SAME: number , isEvaluatedTimingDrawColor: number[], outputRecommendColorsAmountAll: any) {
  // correctCount: 推薦した配色群の中で次に塗る色を予測できていていた個数
  // sumRecommendColorScheme: 推薦配色群の合計
  compareCountSum = 0;
  sumRecommendColorSchemeExcludeFirstColorReco = 0;
  let evaluateCount = 0;
  let correctCount = 0;
  let sumRecommendColorScheme = 0;
  let recommendColorsAmountAll = outputRecommendColorsAmountAll;
  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    sumRecommendColorScheme += recommendColorsAmountAll[i].dataRecommendColorsAmount.length;
  }
  //let evaluateCount: number = calculateEvaluatedUsedColorSchemeCount(isEvaluatedTimingDrawColor);
  console.log("評価した使用配色の数は" + evaluateCount + "です．(used[n][" + isEvaluatedTimingDrawColor + "]の次の色が含まれているかどうか)(n=0,1,2...))");

  // recall@kの計算
  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    let colorSchemeNumber = recommendColorsAmountAll[i].LOAD_NUMBER[0];
    let colorNumber = recommendColorsAmountAll[i].LOAD_NUMBER[1];
    let dataRecomenndColorsAmount = recommendColorsAmountAll[i].dataRecommendColorsAmount;

    // isEvaluateTiming: 今スロットに入っている色を評価するかどうかを保存する変数
    let isEvaluateTiming = false;
    for (let t = 0; t < isEvaluatedTimingDrawColor.length; t++) {
      if (colorNumber === isEvaluatedTimingDrawColor[t]) {
        isEvaluateTiming = true;
      }
    }

    // 評価するタイミングでは無かった場合，何もせず修了(次の色の処理へ移動)
    if (!isEvaluateTiming) { continue; }

    if (DEBUG) { console.log("evaluate of used[" + colorSchemeNumber + "][" + colorNumber + "] is called"); }

    // 次の色が含まれているかどうかの評価
    if (isColorPaintNext(colorSchemeNumber, colorNumber, i, SIM_VALUE_DISPLAY_LIMIT, SAME, outputRecommendColorsAmountAll)) {
      correctCount++;
    }
    evaluateCount++;
    console.log("evaluateCount = " + evaluateCount);

  }

  let newK = compareCountSum;
  let newPrecision = (Math.round((correctCount / compareCountSum) * 100)) / 100;

  console.log("racalls");
  console.log(recalls);
  // recallの値の計算
  for (let i = 0; i < recalls.length; i++) {
    recalls[i].recall = recalls[i].recall / evaluateCount;
  }

  console.log("--- (表示(評価)するかどうかを判定する相違度の閾値) = " + SIM_VALUE_DISPLAY_LIMIT + " -----");
  console.log("次に塗る色を予測できていていた確率((次の色があった数)/(評価した使用配色の数))は" + Math.round(correctCount / evaluateCount * 100) + "%(" + correctCount + "/" + evaluateCount + ")です．");
  let text = ("推薦した配色群の中で次に塗る色を予測できていていた確率: p@" + compareCountSum + " = " + (Math.round((correctCount / compareCountSum) * 100)) / 100 + " (" + correctCount + "/" + compareCountSum + ")です．\n");
  consoleLogColors(text, "#AA5500");

  console.log("-------------------------------------");
  console.log("(生成した推薦する配色の“中で評価した配色”の数) = " + sumRecommendColorSchemeExcludeFirstColorReco);
  console.log("(生成した推薦する配色の“全体”の数) = " + sumRecommendColorScheme + "(※誤差あり)");
  console.log("(同じ色かどうかを判定する相違度の閾値) = " + SAME);

}