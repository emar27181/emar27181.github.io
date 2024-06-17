import p5 from "p5";
import { ColorAmount } from "../../utils/ColorAmount";
import { FilterdColorAmount } from "../../utils/FilteredColorAmount";

// ColorAmount[]型のデータをJsonファイル用のFilterdColorAmount[]のデータに変換する関数
export function convertToJsonData(colorsAmount: ColorAmount[]): FilterdColorAmount[] {

  if (typeof (colorsAmount) === "undefined") {
    return [{
      color: "undefinedError",
      amount: -1,
    }];
  }

  if (colorsAmount.length === 0) {
    return [{
      color: "lengthError",
      amount: -2,
    }];
  }

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
    const HEX = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    return HEX.slice(0, 7);
  }

  return jsonData;
}