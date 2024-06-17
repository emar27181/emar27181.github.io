import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';
import p5 from 'p5';

// 引数で受け取る配色に対して推薦する配色群を生成し返す関数
export function CalculateRecommendColorsRe(colorsAmount: ColorAmount[]): ColorAmount[][] {
  const p = new p5(() => { });

  // 推薦する配色群を保存する二重配列を初期化
  let recommendedColorSchemeAmount: ColorAmount[][] = [];

  // 引数で受け取った配色を基に推薦する配色群を計算
  

  return recommendedColorSchemeAmount;
}