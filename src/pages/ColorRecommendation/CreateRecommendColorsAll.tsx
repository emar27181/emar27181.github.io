
import { initializeOrderUsedColorsAmountByJson } from "./CalculateUsedColors";
import inputOrderUsedColorAmount from "./data/inputOrderUsedColorsAmount.json";
import { CalculateRecommendColorsRe } from "./CalculateRecommendColorsRe";

// 使用色を保存するjsonファイルにある配色全てに対して，推薦する配色群を作成する関数
export function CreateRecommendColorsAll() {

  for (let i = 0; i < inputOrderUsedColorAmount.length; i++) {
    for (let j = 0; j < inputOrderUsedColorAmount[i].length; j++) {

      let usedColorsAmount = initializeOrderUsedColorsAmountByJson(i, j);
      let recommendColorScheme = CalculateRecommendColorsRe(usedColorsAmount);

      // 推薦する配色群を保存する二重配列に使用色(i, j)に対する推薦を更新
      recommendColorScheme =  CalculateRecommendColorsRe(usedColorsAmount);
      console.log(recommendColorScheme);

      // used[i][j]に対する推薦をjson形式で保存(未実装)

      console.log("(" + i + "," + j + ")");
    }
  }


}