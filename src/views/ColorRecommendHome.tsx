import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import DisplayColorRatio from '../pages/ColorRecommendation/DisplayColorRatio';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';

export function ColorRecommendHome() {


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <div>
          <div style={{ display: 'flex' }}>
            <Canvas />
            <DisplayDrawingInfo />
          </div>
          <div style={{ display: 'flex' }}>
            <DisplayColorRatio />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorRecommendHome