import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';

let isCanvasHome = false;

export function U22programmingContestHome() {

  isCanvasHome = true;

  return (
    <div>

      <div style={{ display: 'flex' }}>
        <div>
          <ColorGanerate />
          <DisplayGravityPlace />
        </div>
        <Canvas />
        {DisplayUsedColorRatio("canvas")}
        <DisplayDrawingInfo />
      </div>

    </div>
  )
}

export default U22programmingContestHome
export function ReturnIsCanvasHome() { return isCanvasHome; }