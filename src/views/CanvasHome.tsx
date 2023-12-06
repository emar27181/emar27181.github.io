import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';

let isCanvasHome = false;

export function U22programmingContestHome() {

  isCanvasHome = true;

  return (
    <div>

      <div style={{ display: 'flex' }}>
        <div>
          <ColorGanerate />
          <OperateGuiControl />
          {DisplayCanvasFilter("saturation")}
        </div>
        <Canvas />
        {DisplayUsedColorRatio("canvas", 0)}
        <DisplayDrawingInfo />
      </div>

    </div>
  )
}

export default U22programmingContestHome
export function ReturnIsCanvasHome() { return isCanvasHome; }