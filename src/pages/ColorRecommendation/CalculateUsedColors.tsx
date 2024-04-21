import p5 from "p5";
import { ReturnCanvasColors } from "../Reserch/Canvas";
import { SPLIT } from "../../config/constants";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";

export function CalculateUsedColors() {
  let canvasColors: p5.Color[][] = [];
  for (let i = 0; i < SPLIT; i++) { canvasColors[i] = []; }

  const sketch = (p: P5CanvasInstance) => {
    p.setup = () => {
      p.frameRate(1);
    };

    p.draw = () => {
      canvasColors = ReturnCanvasColors();
      console.log(canvasColors);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateUsedColors