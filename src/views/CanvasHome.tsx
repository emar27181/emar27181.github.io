import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';

export function U22programmingContestHome() {


  return (
    <div>

      <div style={{ display: 'flex' }}>
        <Canvas />
        <DisplayDrawingInfo />
      </div>

      <div style={{ display: 'flex' }}>
        <DisplayEmotionColorRatio /> <br />
      </div>
    </div>
  )
}

export default U22programmingContestHome