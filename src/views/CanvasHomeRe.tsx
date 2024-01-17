import '../App.css'
import React from 'react';
import CanvasOnlyDraw from '../pages/Reserch/CanvasOnlyDraw';
//import ColorGanerateRe from '../pages/ColorRecommendation/ColorGenerate';
import ColorGanerateRe from '../pages/ColorRecommendation/ColorGenerateRe';
import DisplayUsedColorWheel from '../pages/ColorRecommendation/DisplayUsedColorWheel';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';

export function CanvasHomeRe() {

  return (

    <div style={{ display: 'flex', margin: 0 }}>
      <div>
        <ColorGanerateRe />
        <DisplayUsedColorWheel />
        <OperateGuiControl />
      </div>
      <CanvasOnlyDraw />
    </div>
  )
}

export default CanvasHomeRe