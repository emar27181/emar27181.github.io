import p5 from "p5";
import { ReturnCanvasColors } from "../Reserch/Canvas";
import { AMOUNT_LIMIT, SATURATION_LIMIT, LIGHTNESS_LOWER_LIMIT, LIGHTNESS_UPPER_LIMIT, SPLIT } from "../../config/constants";
import { ReturnDrawingColor, ReturnIsMouseReleased } from "../Reserch/Canvas";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { ColorAmount } from "../../utils/ColorAmount";
import { isUpdateRecommendColorsScheme } from "./CalculateRecommendColors";
import inputOrderUsedColorAmount from "./data/inputOrderUsedColorsAmount.json";
import { LOAD_USED_COLOR_NUMBER, LOAD_USED_COLOR_SCHEME_NUMBER } from "../../config/constants.dev";

let usedColorsAmount: Array<ColorAmount> = [];
let usedColorSchemeAmount: Array<ColorAmount> = [];
let usedColorSchemeAmountOnlyMainColor: Array<ColorAmount> = [];
let orderUsedColors: Array<p5.Color> = [];
let orderUsedColorsAmount: Array<ColorAmount> = [];
let isCanvasMouseReleased: boolean = false;
const IS_INPUT_BY_JSON = true;

export function CalculateUsedColors() {
  const DEBUG = false;
  let canvasColors: p5.Color[][] = [];

  const sketch = (p: P5CanvasInstance) => {
    p.setup = () => {
      p.frameRate(1);
      initializeVariables();


      if (DEBUG) {
        for (let i = 0; i < inputOrderUsedColorAmount.length; i++) {
          for (let j = 0; j < inputOrderUsedColorAmount[i].length; j++) {
            console.log("[" + i + "][" + j + "]: " + inputOrderUsedColorAmount[i][j].color);
          }
        }
      }
    };

    function initializeVariables() {
      for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
      usedColorsAmount.push(new ColorAmount(p.color(255), 0));
      usedColorSchemeAmount.push(new ColorAmount(p.color(255), 0));
      usedColorSchemeAmountOnlyMainColor.push(new ColorAmount(p.color(255), 0));
    }

    p.draw = () => {
      updateVariables();
    };

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
      calculateUsedColorsAmount();
      calculateColorsSchemeAmount();
      isCanvasMouseReleased = ReturnIsMouseReleased();
      if (isUpdateRecommendColorsScheme) {
        orderUsedColors.push(ReturnDrawingColor());
        if (IS_INPUT_BY_JSON) {
          initializeOrderUsedColorsAmountByJson(LOAD_USED_COLOR_SCHEME_NUMBER, LOAD_USED_COLOR_NUMBER);
        }
        else {
          updateColorsAmount(orderUsedColorsAmount, ReturnDrawingColor());
        }
      }
    }

    function calculateColorsSchemeAmount() {
      usedColorSchemeAmount = []; // 使われた配色の量のリセット
      usedColorSchemeAmountOnlyMainColor = []; // 使われた配色の量のリセット

      // 一定回数以上出現している色を配色の色として追加
      for (let i = 0; i < usedColorsAmount.length; i++) {
        if (usedColorsAmount[i].amount >= AMOUNT_LIMIT) {
          // 使用された色を全て追加
          usedColorSchemeAmount.push(new ColorAmount(usedColorsAmount[i].color, usedColorsAmount[i].amount));

          // 使用された色のうち明度と彩度が一定の色を追加
          let s = p.saturation(usedColorsAmount[i].color);
          let l = p.lightness(usedColorsAmount[i].color);
          if (LIGHTNESS_LOWER_LIMIT <= l && l <= LIGHTNESS_UPPER_LIMIT && SATURATION_LIMIT <= s) {
            usedColorSchemeAmountOnlyMainColor.push(new ColorAmount(usedColorsAmount[i].color, usedColorsAmount[i].amount));
          }
        }
      }

      if (DEBUG) {
        for (let i = 0; i < usedColorSchemeAmount.length; i++) {
          console.log("[" + i + "] = " + usedColorSchemeAmount[i].color + ": " + usedColorSchemeAmount[i].amount);
        }
      }
    }

    function resetUsedColorsAmount() {
      usedColorsAmount = [];
      usedColorsAmount.push(new ColorAmount(p.color(255), 0));
    }

    function calculateUsedColorsAmount() {
      resetUsedColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateColorsAmount(usedColorsAmount, color);
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }

      //確認用出力
      if (DEBUG) {
        console.log("--- " + p.frameCount + " ---");
        for (let i = 0; i < usedColorsAmount.length; i++) {
          if (usedColorsAmount[i].amount >= 10) {
            console.log("[" + i + "]: (" + p.red(usedColorsAmount[i].color) + "," + p.green(usedColorsAmount[i].color) + "," + p.blue(usedColorsAmount[i].color) + ") =  " + usedColorsAmount[i].amount);
          }
        }
      }
    }


    function updateColorsAmount(colorsAmount: ColorAmount[], color: p5.Color) {
      //color: 探索対象の色
      p.colorMode(p.RGB);

      // placeNumber: 四捨五入する位の10倍の値
      let placeNumber = 1;

      //1の位を四捨五入した値に変更
      color = p.color(p.round(p.red(color) / placeNumber) * placeNumber, p.round(p.green(color) / placeNumber) * placeNumber, p.round(p.blue(color) / placeNumber) * placeNumber);
      for (let i = 0; i < colorsAmount.length; i++) {
        //すでに出てきた色であった場合
        if (equalsColor(colorsAmount[i].color, color)) {
          colorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      colorsAmount[colorsAmount.length] = new ColorAmount(color, 1);
    }

    function equalsColor(color1: p5.Color, color2: p5.Color) {
      let red1 = p.red(color1), green1 = p.green(color1), blue1 = p.blue(color1);
      let red2 = p.red(color2), green2 = p.green(color2), blue2 = p.blue(color2);
      //console.log("equalsColor((" + red1 + ", " + green1 + ", " + blue1 + "), (" + red2 + ", " + green2 + ", " + blue2 + "))= " + ((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
      return (((red1 === red2) && (green1 === green2) && (blue1 === blue2)));
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

// Jsonファイルを基に使用色を保存する配列を初期化する関数
export function initializeOrderUsedColorsAmountByJson(colorSchemeNumber: number, colorNumber: number): ColorAmount[] {
  orderUsedColorsAmount = [];
  const p = new p5(() => { });
  if (typeof (inputOrderUsedColorAmount[colorSchemeNumber]) === "undefined") {
    console.error("読込まれた配列に配色が保存されていません。colorSchemeNumberを正しい値にしてください。");
    return [];
  }

  for (let i = 0; i <= colorNumber; i++) {
    let color = p.color(inputOrderUsedColorAmount[colorSchemeNumber][i].color);
    let amount = inputOrderUsedColorAmount[colorSchemeNumber][i].amount;

    orderUsedColorsAmount.push(new ColorAmount(color, amount));
  }

  console.log("orderUsedColorsAmount is loaded ((i, j) = (" + colorSchemeNumber + ", " + colorNumber + "))");

  return orderUsedColorsAmount;
}


export default CalculateUsedColors
export function ReturnUsedColorsAmount() { return usedColorsAmount; }
export function ReturnUsedColorSchemeAmount() { return usedColorSchemeAmount; }
export function ReturnUsedColorSchemeAmountOnlyMainColor() { return usedColorSchemeAmountOnlyMainColor; }
export function ReturnOrderUsedColors() { return orderUsedColors; }
export function ReturnOrderUsedColorsAmount() { return orderUsedColorsAmount; }
