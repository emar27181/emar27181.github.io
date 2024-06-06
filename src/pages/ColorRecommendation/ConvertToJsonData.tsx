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
    let colorData = [
      p.round(p.hue(color)),
      p.round(p.saturation(color)),
      p.round(p.lightness(color)),
    ];

    jsonData.push({
      color: colorData,
      amount: colorsAmount[i].amount,
    });
  }

  return jsonData;
}