
import { initializeOrderUsedColorsAmountByJson } from "./CalculateUsedColors";
import inputOrderUsedColorAmount from "./data/input/inputOrderUsedColorsAmount.json";
import { CalculateRecommendColorSchemeJsonData } from "./CalculateRecommendColorSchemeJsonData";
import { JsonDataRecommendColorScheme } from "../../utils/JsonDataRecommendColorScheme";

// 使用色を保存するjsonファイルにある配色全てに対して，推薦する配色群を作成する関数
export function CreateRecommendColorsAll(LOAD_ILLUST_COUNT: number, LOAD_TIMING: number, lightnessDiffs: number[]): JsonDataRecommendColorScheme[] {

  let jsonData: JsonDataRecommendColorScheme[] = [];

  for (let i = 0; i < inputOrderUsedColorAmount.length; i++) {

    if(i >= LOAD_ILLUST_COUNT){ continue; }

    for (let j = 0; j < inputOrderUsedColorAmount[i].length; j++) {

      if(j >= LOAD_TIMING){ continue; }
      let usedColorsAmount = initializeOrderUsedColorsAmountByJson(i, j);
      //let recommendColorScheme = CalculateRecommendColorsRe(i, j, usedColorsAmount);

      // used[i][j]に対する推薦をjson形式で保存
      let addJsonData = CalculateRecommendColorSchemeJsonData(i, j, usedColorsAmount, lightnessDiffs);

      //console.log("(" + i + "," + j + ")");
      //console.log(addJsonData);
      jsonData.push(addJsonData);
    }
  }

  console.log("jsonData: ");
  console.log(jsonData);
  return jsonData;
}