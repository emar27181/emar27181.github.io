import p5 from "p5";
import { ColorAmount } from "./DisplayUsedColorRatio";

const p = new p5(() => { });

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

export function calculateSplitComplementaryColor(colorAmount: ColorAmount[][], baseColor: p5.Color) {
  let i = colorAmount.length;
  colorAmount[i] = [];
  p.colorMode(p.HSL);
  let hue = p.hue(baseColor);
  let saturation = p.saturation(baseColor);
  let lightness = p.lightness(baseColor);

  colorAmount[i].push(new ColorAmount(baseColor, 70));
  colorAmount[i].push(new ColorAmount(p.color((hue + 165) % 360, saturation, lightness), 15));
  colorAmount[i].push(new ColorAmount(p.color((hue + 195) % 360, saturation, lightness), 15));
}

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