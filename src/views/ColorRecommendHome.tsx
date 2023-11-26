import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayColorRatioOnlyFrontendontend from '../pages/ColorRecommendation/DisplayColorRatioOnlyFrontendontend';

export function ColorRecommendHome() {


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <div>
          <div style={{ display: 'flex' }}>
            <Canvas />
            <DisplayDrawingInfo />
            <DisplayColorRatioOnlyFrontendontend />
          </div>
          <div style={{ display: 'flex' }}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorRecommendHome