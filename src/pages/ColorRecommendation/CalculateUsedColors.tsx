import p5 from "p5";
import { ReturnCanvasColors } from "../Reserch/Canvas";
import { SPLIT } from "../../config/constants";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { ColorAmount } from "../../utils/ColorAmount";

export function CalculateUsedColors() {
  let canvasColors: p5.Color[][] = [];
  let usedColorsAmount: Array<ColorAmount> = [];

  const sketch = (p: P5CanvasInstance) => {
    p.setup = () => {
      p.frameRate(1);
      initializeVariables();
    };

    function initializeVariables() {
      for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
      usedColorsAmount.push(new ColorAmount(p.color(255), 0));
    }

    p.draw = () => {
      updateVariables();
      //console.log(canvasColors);
    };

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
      calculateColorsAmount();
    }

    function resetUsedColorsAmount() {
      usedColorsAmount = [];
      usedColorsAmount.push(new ColorAmount(p.color(255), 0));
    }

    function calculateColorsAmount() {
      resetUsedColorsAmount();
      for (let i = 0; i < SPLIT; i++) {
        for (let j = 0; j < SPLIT; j++) {
          let color = canvasColors[i][j];
          updateUsedColorsAmount(color);
          //console.log("(" + i + "," + j + "): rgb(" + p.red(color) + ", " + p.green(color) + ", " + p.blue(color) + ")");
        }
      }

      //確認用出力
      if (true) {
        console.log("--- " + p.frameCount + " ---");
        for (let i = 0; i < usedColorsAmount.length; i++) {
          if (usedColorsAmount[i].amount >= 10) {
            console.log("[" + i + "]: (" + p.red(usedColorsAmount[i].color) + "," + p.green(usedColorsAmount[i].color) + "," + p.blue(usedColorsAmount[i].color) + ") =  " + usedColorsAmount[i].amount);
          }
        }
      }
    }

    function updateUsedColorsAmount(color: p5.Color) {
      //color: 探索対象の色
      p.colorMode(p.RGB);

      // placeNumber: 四捨五入する位の10倍の値
      let placeNumber = 1;

      //1の位を四捨五入した値に変更
      color = p.color(p.round(p.red(color) / placeNumber) * placeNumber, p.round(p.green(color) / placeNumber) * placeNumber, p.round(p.blue(color) / placeNumber) * placeNumber);
      for (let i = 0; i < usedColorsAmount.length; i++) {
        //すでに出てきた色であった場合
        if (equalsColor(usedColorsAmount[i].color, color)) {
          usedColorsAmount[i].amount++;
          return;
        }
      }
      //まだ出てきていない色であった場合
      usedColorsAmount[usedColorsAmount.length] = new ColorAmount(color, 1);
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

export default CalculateUsedColors