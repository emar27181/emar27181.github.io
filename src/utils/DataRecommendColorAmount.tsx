// 推薦する配色の配列と使用した配色との類似度を保存するインターフェース
export interface DataRecommendColorAmount {
  "similarityValue": number;
  "colorsAmount": number[] | { color: string; amount: number; }[];
  //"colorsAmount": FilterdColorAmount[];
}