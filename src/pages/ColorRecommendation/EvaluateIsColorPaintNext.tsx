
import inputOrderUsedColorScheme from "./data/inputOrderUsedColorsAmount.json";

// used[i][j]に対する推薦recommend[][]にused[i][j+1](次の色)が含まれているかどうか確認する関数
export function isColorPaintNext(i: number, j: number): boolean {
  console.log("inputOrderUsedColorScheme[" + i + "][" + j + "].color = " + inputOrderUsedColorScheme[i][j].color);
  return false;
}

// 生成された推薦する配色の評価をまとめて行う関数
export function evaluateRecommendColorSchemes(): number {
  return 0;
}