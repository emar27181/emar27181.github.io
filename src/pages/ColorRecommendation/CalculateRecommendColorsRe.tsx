import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'

let isUpdateRecommendColorsScheme = true;

export function CalculateRecommendColorsRe() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.frameRate(1);
    }

    p.draw = () => {
      if (isUpdateRecommendColorsScheme) {
        console.log("called");
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateRecommendColorsRe