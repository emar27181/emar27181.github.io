import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';
import ColorGanerateRe from '../pages/ColorRecommendation/ColorGenerate';
import AllScrollLock from '../components/AllScrollLock';
import DisplayUsedColorWheel from '../pages/ColorRecommendation/DisplayUsedColorWheel';
import CalculateRecommendColors from '../pages/ColorRecommendation/CalculateRecommendColors';
import CalculateUsedColors from '../pages/ColorRecommendation/CalculateUsedColors';
import { DisplayColorPalette } from '../pages/ColorRecommendation/DisplayColorPalette';
import ButtonUpdateRecommendColors from '../components/ButtonUpdateRecommendColors';
import ButtonSaveColorScheme from '../components/ButtonSaveColorScheme';
import ButtonSaveColorSchemeAll from '../components/ButtonSaveColorSchemeAll';
import ButtonEvaluateRecommendColors from '../components/ButtonEvaluateRecommendColors';
import TestDispayIsSameColor from '../pages/ColorRecommendation/TestDispayIsSameColor';

let isCanvasHome = false;

export function CanvasHomeForEntertainmentComputing2024() {

  isCanvasHome = true;

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <AllScrollLock />
      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerateRe />
          <OperateGuiControl />
        </div>
        <div style={{ overflow: 'hidden' }}>
          {Canvas()}
        </div>
        <div>
          <DisplayColorPalette />
          <ButtonUpdateRecommendColors />
        </div>
      </div>

      <div>
        <CalculateUsedColors />
        <CalculateRecommendColors />
      </div>
    </div>
  )
}

export default CanvasHomeForEntertainmentComputing2024
export function ReturnIsCanvasHome() { return isCanvasHome; }