import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';
import p5 from 'p5';

export let recommendedColorSchemeAmount: ColorAmount[][] = [];

// 引数で受け取る配色に対して推薦する配色群を生成し返す関数
export function CalculateRecommendColorsRe(colorsAmount: ColorAmount[]): ColorAmount[][] {
  const p = new p5(() => { });

  function initializeVariables() {
    recommendedColorSchemeAmount[0] = [];
    recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
  }

  return recommendedColorSchemeAmount;
}