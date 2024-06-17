import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';
import p5 from 'p5';
import { calculateDominantColor, calculateDyadColor, calculateSplitComplementaryColor, calculateTetradeColor, calculateTriadColor, calculateDominantTone, calculatePentadColor, calculateHexadColor, calculateAnalogyColor, calculateIntermediateColor, addColorSchemesLightnessVariations } from './CalculateColorScheme';
import { LIGHTNESS_DIFF } from '../../config/constants';
//import { recommendedColorSchemeAmount } from './CalculateRecommendColors';

// 引数で受け取る配色に対して推薦する配色群を生成し返す関数
export function CalculateRecommendColorsRe(colorsAmount: ColorAmount[]): ColorAmount[][] {
  const p = new p5(() => { });

  // 推薦する配色群を保存する二重配列を初期化
  let recommendedColorSchemeAmount: ColorAmount[][] = [];

  // 引数で受け取った配色を基に推薦する配色群を計算
  updateRecommendColorSchemeAmount(colorsAmount, recommendedColorSchemeAmount);

  //推薦された配色群の明度が異なるバリエーションを追加
  const RECOMMEND_LENGTH = recommendedColorSchemeAmount.length;
  for (let i = 0; i < RECOMMEND_LENGTH; i++) {
    addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, + LIGHTNESS_DIFF);
    addColorSchemesLightnessVariations(recommendedColorSchemeAmount, i, - LIGHTNESS_DIFF);
  }

  return recommendedColorSchemeAmount;
}

// 塗った配色を基にいくつかの配色を推薦する配色群を保存する二重配列を更新する関数
function updateRecommendColorSchemeAmount(baseColorsAmount: ColorAmount[], recommendColorSchemeAmount: ColorAmount[][]) {
  // ベースとなる配色がなかった場合何もせず終了
  if (baseColorsAmount.length === 0) { return; }

  //recommendColorSchemeAmount = [];

  let baseColor = baseColorsAmount[0].color; // 最初に使われた色をベースカラーであると仮定する

  // ベースカラーを基に配列に配色を追加
  calculateDominantColor(recommendColorSchemeAmount, baseColor);
  calculateDyadColor(recommendColorSchemeAmount, baseColor);
  calculateSplitComplementaryColor(recommendColorSchemeAmount, baseColor);
  calculateTetradeColor(recommendColorSchemeAmount, baseColor);
  calculateTriadColor(recommendColorSchemeAmount, baseColor);
  calculateDominantTone(recommendColorSchemeAmount, baseColor);
  calculatePentadColor(recommendColorSchemeAmount, baseColor);
  calculateHexadColor(recommendColorSchemeAmount, baseColor);
  calculateAnalogyColor(recommendColorSchemeAmount, baseColor);
  calculateIntermediateColor(recommendColorSchemeAmount, baseColor);

  /*
  addColorScheme("dominantColor", baseColor, recommendColorSchemeAmount);
  addColorScheme("dyad", baseColor, recommendColorSchemeAmount);
  addColorScheme("splitComplementary", baseColor, recommendColorSchemeAmount);
  addColorScheme("tetrade", baseColor, recommendColorSchemeAmount);
  addColorScheme("triad", baseColor, recommendColorSchemeAmount);
  addColorScheme("dominantTone", baseColor, recommendColorSchemeAmount);
  addColorScheme("pentad", baseColor, recommendColorSchemeAmount);
  addColorScheme("hexad", baseColor, recommendColorSchemeAmount);
  addColorScheme("analogy", baseColor, recommendColorSchemeAmount);
  addColorScheme("intermediate", baseColor, recommendColorSchemeAmount);
  */
}

// 引数で受け取った配色技法の推薦を推薦する配色群を保存する配列に追加する関数
function addColorScheme(colorScheme: string, baseColor: p5.Color, recommendedColorSchemeAmount: ColorAmount[][]) {

  if (false) { }
  else if (colorScheme === "dominantColor") { calculateDominantColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "dyad") { calculateDyadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "splitComplementary") { calculateSplitComplementaryColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "tetrade") { calculateTetradeColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "triad") { calculateTriadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "dominantTone") { calculateDominantTone(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "pentad") { calculatePentadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "hexad") { calculateHexadColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "analogy") { calculateAnalogyColor(recommendedColorSchemeAmount, baseColor); }
  else if (colorScheme === "intermediate") { calculateIntermediateColor(recommendedColorSchemeAmount, baseColor); }
  else { console.error("用意されたものではない配色を推薦しようとしています.(" + colorScheme + ")"); }

}