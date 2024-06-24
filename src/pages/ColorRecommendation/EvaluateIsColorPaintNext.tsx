
import p5 from "p5";
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"
import outputRecommendColorsAmountAll from "./data/output/outputRecommendColorsAmountAll.json"
import { calculateLabColorSimilarity } from "./CalculateSimilarity";
import { consoleLogColors } from "../../utils/consoleLogColors";
import { IS_EVALUATE_TIMING_DRAW_COLOR, MAX_RECOMMENDED_COLOR_SCHEME_LENGTH, SIM_VALUE_DISPLAY_LIMIT, SIM_VALUE_SAME_COLOR } from "../../config/constants";
import { PrecisionAtK } from "../../utils/PrecisionAtK";
import { RecallAtK } from "../../utils/RecallAtK";

// compareCountSum: 使用配色と推薦配色の比較を行った回数を保存する変数
// sumRecommendColorSchemeExcludeFirstColorReco: 1色目を基に推薦するのを除外した推薦配色群の合計
// evaluateedUsedColorSchemeCount: 評価対象の使用配色の数
// IS_PRINT_IS_EXIST_SAME_COLOR: 次の色が含まれているかどうかの情報をコンソール表示させるかどうかを保存する変数
let compareCountSum = 0;
let sumRecommendColorSchemeExcludeFirstColorReco = 0;
let evaluatedUsedColorSchemeCount = 0;
const IS_PRINT_IS_EXIST_SAME_COLOR = true;

let recalls: RecallAtK[] = [];
for (let i = 0; i < MAX_RECOMMENDED_COLOR_SCHEME_LENGTH; i++) {
  recalls[i] = {
    k: i,
    recall: 0
  }
}


// 評価対象の使用配色の数
//function calculateEvaluatedUsedColorSchemeCount() {
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
      evaluatedUsedColorSchemeCount++;
    }
  }
}
//}

// jsonファイルを基にused[colorSchemeNumber][colorNumber]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
// colorSchemeNumber: 読込む使用配色のインデックス番号を保存する変数
// colorNumber: 使用配色のどの色までインデックス番号まで読み込むかを保存する変数
// recommendIndex: 推薦した配色群を保存する配列の読込むインデックス番号を保存する変数
export function isColorPaintNext(colorSchemeNumber: number, colorNumber: number, recommendIndex: number, simValueThresholdIsDisplay: number, simValueThresholdIsSameColor: number): boolean {
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
        //if (recomenndColorsAmount[i][j].color === inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color) {
        //console.log("推薦配色の中に次の色が含まれていました．(recomenndColorsAmount[" + i + "][" + j + "].color = " + recomenndColorsAmount[i][j].color + ", compareCount = " + compareCount + ")");

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
  //console.log("推薦配色の中に次の色が含まれていませんでした．(compareCount = " + compareCount + ")");
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

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): RecallAtK[] {

  let recommendColorsAmountAll = outputRecommendColorsAmountAll;
  let sumRecommendColorScheme = 0;
  let precisions: PrecisionAtK[] = [];
  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    sumRecommendColorScheme += recommendColorsAmountAll[i].dataRecommendColorsAmount.length;
  }


  // 表示させるかどうかを保存する変数によってp@kの計算
  //for (let simValueThresholdIsDisplay = 100; simValueThresholdIsDisplay <= 100;) {
  compareCountSum = 0;
  sumRecommendColorSchemeExcludeFirstColorReco = 0;

  // correctCount: 推薦した配色群の中で次に塗る色を予測できていていた個数
  // sumRecommendColorScheme: 推薦配色群の合計
  let correctCount = 0;

  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    let colorSchemeNumber = recommendColorsAmountAll[i].LOAD_NUMBER[0];
    let colorNumber = recommendColorsAmountAll[i].LOAD_NUMBER[1];
    let dataRecomenndColorsAmount = recommendColorsAmountAll[i].dataRecommendColorsAmount;
    //sumRecommendColorScheme += dataRecomenndColorsAmount.length;

    // 1色目(used[colorSchemeNumber][0])を塗った後の2色目(used[colorSchemeNumber][1])を当てるのはほぼ不可能なためスキップ
    //if (colorNumber === 0) { continue; }


    // isEvaluateTiming: 今スロットに入っている色を評価するかどうかを保存する変数
    let isEvaluateTiming = false;
    for (let t = 0; t < IS_EVALUATE_TIMING_DRAW_COLOR.length; t++) {
      if (colorNumber === IS_EVALUATE_TIMING_DRAW_COLOR[t]) {
        isEvaluateTiming = true;
      }
    }

    // 評価するタイミングでは無かった場合，何もせず修了(次の色の処理へ移動)
    if (!isEvaluateTiming) { continue; }

    //console.log("evaluate of used[" + colorSchemeNumber + "][" + colorNumber + "] is called");

    // 次の色が含まれているかどうかの評価
    //if (isColorPaintNext(colorSchemeNumber, colorNumber, i, simValueThresholdIsDisplay, SIM_VALUE_SAME_COLOR)) {
    if (isColorPaintNext(colorSchemeNumber, colorNumber, i, SIM_VALUE_DISPLAY_LIMIT, SIM_VALUE_SAME_COLOR)) {
      correctCount++;
    }
  }

  let newK = compareCountSum;
  let newPrecision = (Math.round((correctCount / compareCountSum) * 100)) / 100;
  const newPrecisionAtK: PrecisionAtK = {
    precision: newPrecision,
    k: newK
  };
  precisions.push(newPrecisionAtK);

    // recallの値の計算
    for (let i = 0; i < recalls.length; i++) {
      recalls[i].recall = recalls[i].recall / evaluatedUsedColorSchemeCount;
    }

  console.log(recalls);
  console.log("--- (表示(評価)するかどうかを判定する相違度の閾値) = " + SIM_VALUE_DISPLAY_LIMIT + " -----");
  //console.log("--- (表示(評価)するかどうかを判定する相違度の閾値) = " + simValueThresholdIsDisplay + " -----");
  console.log("次に塗る色を予測できていていた確率((次の色があった数)/(評価した使用配色の数))は" + Math.round(correctCount / evaluatedUsedColorSchemeCount * 100) + "%(" + correctCount + "/" + evaluatedUsedColorSchemeCount + ")です．");
  let text = ("推薦した配色群の中で次に塗る色を予測できていていた確率: p@" + compareCountSum + " = " + (Math.round((correctCount / compareCountSum) * 100)) / 100 + " (" + correctCount + "/" + compareCountSum + ")です．\n");
  consoleLogColors(text, "#AA5500");
  //console.log("推薦した配色群の中で次に塗る色を予測できていていた確率は" + Math.round(correctCount / compareCountSum * 100) + "%(" + correctCount + "/" + compareCountSum + ")です．");


  // 閾値のインクリメント
  //simValueThresholdIsDisplay += 101
  /*
  if (simValueThresholdIsDisplay < 10) {
    simValueThresholdIsDisplay++;
  }
  else if (simValueThresholdIsDisplay < 50) {
    simValueThresholdIsDisplay += 5;
  }
  else {
    simValueThresholdIsDisplay += 10
  }*/
  //}

  //console.log(precisions);

  console.log("-------------------------------------");
  console.log("(生成した推薦する配色の“中で評価した配色”の数) = " + sumRecommendColorSchemeExcludeFirstColorReco);
  console.log("(生成した推薦する配色の“全体”の数) = " + sumRecommendColorScheme + "(※誤差あり)");
  console.log("(同じ色かどうかを判定する相違度の閾値) = " + SIM_VALUE_SAME_COLOR);

  return recalls;
}