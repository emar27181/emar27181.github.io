
import { initializeOrderUsedColorsAmountByJson } from "./CalculateUsedColors";
import inputOrderUsedColorAmount from "./data/inputOrderUsedColorsAmount.json";
import { CalculateRecommendColorsRe } from "./CalculateRecommendColorsRe";

// 使用色を保存するjsonファイルにある配色全てに対して，推薦する配色群を作成する関数
export function CreateRecommendColorsAll() {

  for (let i = 0; i < inputOrderUsedColorAmount.length; i++) {
    for (let j = 0; j < inputOrderUsedColorAmount[i].length; j++) {

      let usedColorsAmount = initializeOrderUsedColorsAmountByJson(i, j);
      //console.log(usedColorsAmount);
      let recommendColorScheme = CalculateRecommendColorsRe(usedColorsAmount);
      console.log(recommendColorScheme);

      console.log("(" + i + "," + j + ")");
    }
  }


}