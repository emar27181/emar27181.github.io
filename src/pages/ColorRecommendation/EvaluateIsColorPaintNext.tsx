
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";
import outputRecommendColorsAmount from "./data/output/outputRecommendColorsAmount.json"

// used[i][j]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
export function isColorPaintNext(i: number, j: number): boolean {
  //console.log("inputOrderUsedColorScheme[" + i + "][" + (j+1) + "].color = " + inputOrderUsedColorScheme[i][j+1].color);
  console.log("Color paint next is " + inputOrderUsedColorScheme[i][j + 1].color);

  // used[i][j]のに対する推薦配色のセット(未実装)

  //
  console.log("outputRecommendColorsAmount = " + outputRecommendColorsAmount.filteredRecommendedColorSchemeAmount);

  return false;
}

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): number {
  return 0;
}