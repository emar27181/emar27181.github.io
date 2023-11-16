import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';

let isCanvasHome = false;

export function CanvasHomeForMobile() {

  isCanvasHome = true;

  return (
    <div>

      <div style={{ display: 'flex' }}>
        <Canvas />
        <DisplayGravityPlace />
      </div>

    </div>
  )
}

export default CanvasHomeForMobile
export function ReturnIsCanvasHome() { return isCanvasHome; }