import p5 from "p5";
import { ColorAmount } from "./DisplayUsedColorRatio";
import { LIGHTNESS_DIFF } from "../../config/constants";
import { ColorScheme } from "../../utils/ColorScheme";

const p = new p5(() => { });

// トライアド(3色)
export function calculateTriadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 33));
  colorAmount[i].push(new ColorAmount(p.color((hue + 120) % 360, saturation, lightness), 33));
  colorAmount[i].push(new ColorAmount(p.color((hue + 240) % 360, saturation, lightness), 33));
}

// スプリットコンプリメンタリー(3色)
export function calculateSplitComplementaryColor(colorAmount: ColorAmount[][], baseColor: p5.Color, hueDifference: number) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  colorAmount[i + 1] = [];
  colorAmount[i + 2] = [];

  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  //ベースカラーが分裂していない色相の場合(「色彩検定～」p190参照)
  colorAmount[i].push(new ColorAmount(baseColor, 70)); //←分裂していない色相
  colorAmount[i].push(new ColorAmount(p.color((hue + (180 - 15 * hueDifference)) % 360, saturation, lightness), 15));
  colorAmount[i].push(new ColorAmount(p.color((hue + (180 + 15 * hueDifference)) % 360, saturation, lightness), 15));

  //ベースカラーが分裂する色相(左側)の場合(「色彩検定～」p190参照)
  colorAmount[i + 1].push(new ColorAmount(baseColor, 15));
  colorAmount[i + 1].push(new ColorAmount(p.color((hue + (180 - 15 * hueDifference)) % 360, saturation, lightness), 70)); //←分裂していない色相
  colorAmount[i + 1].push(new ColorAmount(p.color((hue + (360 - 15 * hueDifference * 2)) % 360, saturation, lightness), 15));

  //ベースカラーが分裂する色相(右側)の場合(「色彩検定～」p190参照)
  colorAmount[i + 2].push(new ColorAmount(baseColor, 15));
  colorAmount[i + 2].push(new ColorAmount(p.color((hue + (15 * hueDifference * 2)) % 360, saturation, lightness), 15));
  colorAmount[i + 2].push(new ColorAmount(p.color((hue + (180 + 15 * hueDifference)) % 360, saturation, lightness), 15)); //←分裂していない色相
}

// ダイアード(2色)
export function calculateDyadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 50));
  colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 50));
}

// テトラード(4色)
export function calculateTetradeColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 90) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 270) % 360, saturation, lightness), 25));
}

// ペンタード(5色)
export function calculatePentadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 72) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 144) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 216) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 288) % 360, saturation, lightness), 25));
}

// ペンタード配色(トライアド配色+白黒)(5色)
export function calculatePentadColorBkW(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 33));
  colorAmount[i].push(new ColorAmount(p.color("#FFFFFF"), 33));
  colorAmount[i].push(new ColorAmount(p.color((hue + 120) % 360, saturation, lightness), 33));
  colorAmount[i].push(new ColorAmount(p.color("#000000"), 33));
  colorAmount[i].push(new ColorAmount(p.color((hue + 240) % 360, saturation, lightness), 33));
}

// ヘキサード(6色)
export function calculateHexadColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 60) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 120) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 240) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 300) % 360, saturation, lightness), 25));
}

// ヘクサード(テトラード+白黒)(6色)
export function calculateHexadBkWColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 25));
  colorAmount[i].push(new ColorAmount(p.color("#000000"), 20));
  colorAmount[i].push(new ColorAmount(p.color((hue + 90) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 180) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color("#FFFFFF"), 20));
  colorAmount[i].push(new ColorAmount(p.color((hue + 270) % 360, saturation, lightness), 25));
}

// ドミナントカラー(3色)
export function calculateDominantColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 70));
  colorAmount[i].push(new ColorAmount(p.color((hue + 30) % 360, saturation, lightness), 25));
  colorAmount[i].push(new ColorAmount(p.color((hue + 330) % 360, saturation, lightness), 5));
}

// アナロジー(2色)
// 参考: https://webnaut.jp/design/645.html
export function calculateAnalogyColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  // 暫定として+30度の場合のみ追加
  colorAmount[i].push(new ColorAmount(baseColor, 70));
  colorAmount[i].push(new ColorAmount(p.color((hue + 30) % 360, saturation, lightness), 30));

  /*
  colorAmount[i+1].push(new ColorAmount(baseColor, 70));
  colorAmount[i+1].push(new ColorAmount(p.color((hue - 30) % 360, saturation, lightness), 30));
  */
}

// インターミディエート(2色)
// 参考: https://webnaut.jp/design/645.html
export function calculateIntermediateColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  // 暫定として+90度の場合のみ追加
  colorAmount[i].push(new ColorAmount(baseColor, 70));
  colorAmount[i].push(new ColorAmount(p.color((hue + 90) % 360, saturation, lightness), 30));
}

// ドミナントトーン(3色)
export function calculateDominantTone(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.RGB);
  let red = p.red(baseColor);
  let green = p.green(baseColor);
  let blue = p.blue(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 70));
  colorAmount[i].push(new ColorAmount(p.color(0.7 * red, 0.7 * green, 0.7 * blue), 25));
  colorAmount[i].push(new ColorAmount(p.color(0.4 * red, 0.4 * green, 0.4 * blue), 5));
}

// 推薦する配色とは明度が異なる配色群を配列に追加する関数
export function addColorSchemesLightnessVariations(colorsAmount: ColorAmount[][], baseIndexNumber: number, lightnessDiff: number) {
  //indexNumber: 新たに推薦する配色の基となる配色の番号を保存するインデックス番号

  let baseColorScheme = colorsAmount[baseIndexNumber];
  let addIndexNumber = colorsAmount.length;
  colorsAmount[addIndexNumber] = [];
  p.colorMode(p.HSL);

  for (let j = 0; j < baseColorScheme.length; j++) {
    let color = baseColorScheme[j].color;
    let hue = p.hue(color);
    let saturation = p.saturation(color);
    let lightness = p.lightness(color) + lightnessDiff;

    //console.log("[" + j + "] = (" + p.round(hue) + ", " + p.round(saturation) + "," + p.round(lightness) + ")");
    colorsAmount[addIndexNumber].push(new ColorAmount(p.color(hue, saturation, lightness), baseColorScheme[j].amount));
  }
}

// 角度の差を計算する関数
function calcAngleDiff(angle1: number, angle2: number): number {
  let diff = Math.abs(angle1 - angle2);
  return diff > 180 ? 360 - diff : diff;
}

// 入力された配色技法を推定する関数
export function estimateColorScheme(colorsAmount: ColorAmount[]): string {
  //console.log(colorsAmount.length);

  let colorScheme: ColorScheme = "analogyColor"
  const BASE_COLOR_HUE = p.hue(colorsAmount[0].color);

  // 色相差の計算
  let hueDiffs: number[] = [];
  for (let i = 1; i < colorsAmount.length; i++) {
    hueDiffs.push(calcAngleDiff(BASE_COLOR_HUE, p.hue(colorsAmount[i].color)));
    //console.log(calcAngleDiff(BASE_COLOR_HUE, p.hue(colorsAmount[i].color)));
  }

  //推薦配色が2色の場合
  if (colorsAmount.length === 2) {
    //console.log(hueDiffs);

    if (hueDiffs[0] == 30) {
      colorScheme = "analogyColor";
    }
    else if (hueDiffs[0] == 90) {
      colorScheme = "intermediateColor";
    }
    else if (hueDiffs[0] == 180) {
      colorScheme = "dyadColor";
    }
  }
  else if (colorsAmount.length === 3) {
  }

  else if (colorsAmount.length === 4) {
  }


  else if (colorsAmount.length === 5) {
  }

  else if (colorsAmount.length === 6) {
  }

  return colorScheme;
}