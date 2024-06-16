import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper'
//import { isUpdateRecommendColorsScheme } from './CalculateRecommendColors';
import '../../App.css'
import { ColorAmount } from '../../utils/ColorAmount';

let isUpdateRecommendColorsScheme = true;
//export let recommendedColorSchemeAmount: Array<Array<ColorAmount>> = [];
export let recommendedColorSchemeAmount: ColorAmount[][] = [];

export function CalculateRecommendColorsRe() {
  const sketch = (p: P5CanvasInstance) => {


    p.setup = () => {
      initializeVariables();
      p.frameRate(1);
    }

    function initializeVariables() {
      recommendedColorSchemeAmount[0] = [];
      recommendedColorSchemeAmount[0].push(new ColorAmount(p.color(255, 255, 255, 0), 0));
    }

    p.draw = () => {
      if (isUpdateRecommendColorsScheme) {
        console.log(recommendedColorSchemeAmount);
      }

      
    }



  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CalculateRecommendColorsRe