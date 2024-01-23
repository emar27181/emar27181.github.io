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
import DisplayUsedColorTone from '../pages/ColorRecommendation/DisplayUsedColorTone';

let isCanvasHome = false;

export function U22programmingContestHome() {

  isCanvasHome = true;

  return (
    <div>
      <AllScrollLock />
      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerateRe />
          <DisplayUsedColorWheel />
          <OperateGuiControl />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <AllScrollLock />
          {Canvas()}
        </div>
        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "hue")}
            {DisplayUsedColorRatio("canvas", 0, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "saturation")}
            {DisplayUsedColorRatio("canvas", 0, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "lightness")}
            {DisplayUsedColorRatio("canvas", 0, "lightness")}
          </div>
        </div>
      </div>

    </div>
  )
}

export default U22programmingContestHome
export function ReturnIsCanvasHome() { return isCanvasHome; }