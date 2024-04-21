import p5 from "p5";
import { ReturnCanvasColors } from "../Reserch/Canvas";
import { SPLIT } from "../../config/constants";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";

export function CalculateUsedColors() {
  let canvasColors: p5.Color[][] = [];

  const sketch = (p: P5CanvasInstance) => {
    p.setup = () => {
      p.frameRate(1);
      initializeVariables();
    };

    function initializeVariables() {
      for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }
    }

    p.draw = () => {
      updateVariables();
      console.log(canvasColors);
    };

    function updateVariables() {
      canvasColors = ReturnCanvasColors();
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateUsedColors