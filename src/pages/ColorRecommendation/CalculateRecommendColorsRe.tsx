import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';
import p5 from 'p5';

export let recommendedColorSchemeAmount: ColorAmount[][] = [];

export function CalculateRecommendColorsRe(colorsAmount: ColorAmount[]) {
  const p = new p5(() => { });

  function initializeVariables() {
    recommendedColorSchemeAmount[0] = [];
    recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
  }

  return recommendedColorSchemeAmount;
}