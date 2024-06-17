
import { initializeOrderUsedColorsAmountByJson } from "./CalculateUsedColors";
import inputOrderUsedColorAmount from "./data/inputOrderUsedColorsAmount.json";
import { CalculateRecommendColorsRe } from "./CalculateRecommendColorsRe";
import { JsonDataRecommendColorScheme } from "../../utils/JsonDataRecommendColorScheme";

// 使用色を保存するjsonファイルにある配色全てに対して，推薦する配色群を作成する関数
export function CreateRecommendColorsAll(): JsonDataRecommendColorScheme[] {

  let jsonData: JsonDataRecommendColorScheme[] = [];

  for (let i = 0; i < inputOrderUsedColorAmount.length; i++) {
    for (let j = 0; j < inputOrderUsedColorAmount[i].length; j++) {

      let usedColorsAmount = initializeOrderUsedColorsAmountByJson(i, j);
      //let recommendColorScheme = CalculateRecommendColorsRe(i, j, usedColorsAmount);

      // used[i][j]に対する推薦をjson形式で保存
      let addJsonData = CalculateRecommendColorsRe(i, j, usedColorsAmount);

      //console.log("(" + i + "," + j + ")");
      //console.log(addJsonData);
      jsonData.push(addJsonData);
    }
  }

  console.log("jsonData: ");
  console.log(jsonData);
  return jsonData;
}