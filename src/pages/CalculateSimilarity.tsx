import { RGBColor, LabColor, diff, rgb_to_lab } from 'color-diff';

export function calculateLabColorSimilarity(color1: number[], color2: number[]): number {
  const rgbColor1: RGBColor = { R: color1[0], G: color1[1], B: color1[2] };
  const rgbColor2: RGBColor = { R: color2[0], G: color2[1], B: color2[2] };

  const labColor1: LabColor = rgb_to_lab(rgbColor1);
  const labColor2: LabColor = rgb_to_lab(rgbColor2);

  return diff(labColor1, labColor2);
}