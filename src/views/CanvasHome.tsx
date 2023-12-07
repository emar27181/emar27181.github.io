import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';
import ColorGanerateRe from '../pages/ColorRecommendation/ColorGenerateRe';

let isCanvasHome = false;

export function U22programmingContestHome() {

  isCanvasHome = true;

  return (
    <div>

      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerateRe />
          <OperateGuiControl />
        </div>
        {Canvas()}
        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("hue")}
            {DisplayUsedColorRatio("canvas", 0, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("saturation")}
            {DisplayUsedColorRatio("canvas", 0, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("lightness")}
            {DisplayUsedColorRatio("canvas", 0, "lightness")}
          </div>
        </div>
        <DisplayDrawingInfo />
      </div>

    </div>
  )
}

export default U22programmingContestHome
export function ReturnIsCanvasHome() { return isCanvasHome; }