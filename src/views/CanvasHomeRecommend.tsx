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
import AllScrollLock from '../components/AllScrollLock';
import DisplayUsedColorWheel from '../pages/ColorRecommendation/DisplayUsedColorWheel';

let isCanvasHome = false;

export function CanvasHomeRecommend() {

  isCanvasHome = true;

  return (
    <div>
      <br /><br />
      <AllScrollLock />
      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerateRe />
          <OperateGuiControl />
          <DisplayUsedColorWheel />
        </div>
        <div style={{ overflow: 'hidden' }}>
          {Canvas()}
        </div>
      </div>

    </div>
  )
}

export default CanvasHomeRecommend
export function ReturnIsCanvasHome() { return isCanvasHome; }