import p5 from "p5";
import { ColorAmount } from "../../utils/ColorAmount";
import { colorsAmount } from "../Reserch/CanvasOnlyDraw";
//import { orderUsedColorsAmount, recommendedColorSchemeAmount } from "./CalculateRecommendColors";

export function convertToJsonData(colorsAmount: ColorAmount[]) {
  if (typeof (colorsAmount) === "undefined") { return [-2]; }
  if (colorsAmount.length === 0) { return [-1]; }

  const p = new p5(() => { });
  let jsonData = [];

  for (let i = 0; i < colorsAmount.length; i++) {

    let color = colorsAmount[i].color;
    let colorData = rgbToHex(p.red(color), p.green(color), p.blue(color));

    jsonData.push({
      color: colorData,
      amount: colorsAmount[i].amount,
    });
  }

  function rgbToHex(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  return jsonData;
}