
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"
import outputRecommendColorsAmountAll from "./data/output/outputRecommendColorsAmountAll.json"

// used[i][j]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
export function isColorPaintNext(colorSchemeNumber: number, colorNumber: number, recommendIndex: number): boolean {
  // 次の色が存在しない場合終了
  if (inputOrderUsedColorScheme[colorSchemeNumber].length <= (colorNumber + 1)) {
    return false;
  }

  console.log("used[" + colorSchemeNumber + "][" + colorNumber + "] --------------")
  console.log("次の色used[" + colorSchemeNumber + "][" + (colorNumber +1)+  "]は" + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color + "です．");
  //console.log("Color paint next is " + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color);

  // used[i][j]のに対する推薦配色のセット
  let dataRecomenndColorsAmount = outputRecommendColorsAmountAll[recommendIndex].dataRecommendColorsAmount;
  let recomenndColorsAmount = dataRecomenndColorsAmount.map(item => item.colorsAmount); // 配色を抽出し代入

  // recommend[][]にused[i][j+1](次の色)が含まれているかどうかの確認
  for (let i = 0; i < recomenndColorsAmount.length; i++) {
    for (let j = 0; j < recomenndColorsAmount[i].length; j++) {
      //console.log("recomenndColorsAmount[" + i + "][" + j + "].color  = " + recomenndColorsAmount[i][j].color);
      // 推薦配色の中に次の色が含まれていた場合
      if (recomenndColorsAmount[i][j].color === inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color) {
        console.log("推薦配色の中に次の色が含まれていました．(recomenndColorsAmount[" + i + "][" + j + "])");
        return true;
      }
    }
  }

  // 推薦配色の中に次の色が含まれていなかった場合
  console.log("推薦配色の中に次の色が含まれていませんでした．");
  return false;
}

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): number {
  let recommendColorsAmountAll = outputRecommendColorsAmountAll;

  console.log("recommendColorsAmountAll.length = " + recommendColorsAmountAll.length);

  for (let i = 0; i < recommendColorsAmountAll.length; i++) {
    let colorSchemeNumber = recommendColorsAmountAll[i].LOAD_NUMBER[0];
    let colorNumber = recommendColorsAmountAll[i].LOAD_NUMBER[1];
    let dataRecomenndColorsAmount = recommendColorsAmountAll[i].dataRecommendColorsAmount;

    isColorPaintNext(colorSchemeNumber, colorNumber, i);
  }
  return 0;
}