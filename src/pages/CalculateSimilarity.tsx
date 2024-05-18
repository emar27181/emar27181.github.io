import { RGBColor, LabColor, diff, rgb_to_lab } from 'color-diff';
import { ColorAmount } from '../utils/ColorAmount';
import p5, { Color } from 'p5';

const DEBUG = false;

export function calculateLabColorSimilarity(color1: number[], color2: number[]): number {
  const rgbColor1: RGBColor = { R: color1[0], G: color1[1], B: color1[2] };
  const rgbColor2: RGBColor = { R: color2[0], G: color2[1], B: color2[2] };

  const labColor1: LabColor = rgb_to_lab(rgbColor1);
  const labColor2: LabColor = rgb_to_lab(rgbColor2);

  return diff(labColor1, labColor2);
}

export function calculateColorsAmountSimilarity(colorsAmount1: ColorAmount[], colorsAmount2: ColorAmount[]) {

  const p = new p5(() => { });
  let sum = 0;

  if ((typeof (colorsAmount1) === 'undefined') || (typeof (colorsAmount2) === 'undefined')) { return -2; }
  if (colorsAmount1.length === 0 || colorsAmount2.length === 0) { return -1; }

  for (let i = 0; i < colorsAmount1.length; i++) {
    if (colorsAmount2.length - 1 < i) { continue; }
    let p5Color1: Color = colorsAmount1[i].color;
    let p5Color2: Color = colorsAmount2[i].color;

    let color1: number[] = [p.red(p5Color1), p.green(p5Color1), p.blue(p5Color1)];
    let color2: number[] = [p.red(p5Color2), p.green(p5Color2), p.blue(p5Color2)];

    if (DEBUG) {
      console.log("(" + color1 + ") (" + color2 + ")");
      console.log("calculateLabColorSimilarity(color1, color2) = " + calculateLabColorSimilarity(color1, color2))
    }

    sum += calculateLabColorSimilarity(color1, color2);
  }

  return sum;
}