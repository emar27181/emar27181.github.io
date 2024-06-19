
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"
import outputRecommendColorsAmountAll from "./data/output/outputRecommendColorsAmountAll.json"

// used[i][j]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
export function isColorPaintNext(colorSchemeNumber: number, colorNumber: number): boolean {
  //console.log("inputOrderUsedColorScheme[" + i + "][" + (j+1) + "].color = " + inputOrderUsedColorScheme[i][j+1].color);
  console.log("Color paint next is " + inputOrderUsedColorScheme[colorSchemeNumber][colorNumber + 1].color);

  // used[i][j]のに対する推薦配色のセット(未実装)

  let dataRecomenndColorsAmount = outputRecommendColorsAmount.dataRecommendColorsAmount;
  let recomenndColorsAmount = dataRecomenndColorsAmount.map(item => item.colorsAmount); // 配色を抽出し代入
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


  //
  //console.log("outputRecommendColorsAmount = " + outputRecommendColorsAmount.filteredRecommendedColorSchemeAmount);

  // 推薦配色の中に次の色が含まれていなかった場合
  console.log("推薦配色の中に次の色が含まれていませんでした．");
  return false;
}

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): number {
  let recommendColorsAmountAll = outputRecommendColorsAmountAll;

  console.log("recommendColorsAmountAll.length = " + recommendColorsAmountAll.length);
  return 0;
}