import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';

export function U22programmingContestHome() {


  return (
    <div>

      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <Canvas />
        <DisplayDrawingInfo />
      </div>

    </div>
  )
}

export default U22programmingContestHome