import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayColorRatioOnlyFrontendontend from '../pages/ColorRecommendation/DisplayColorRatioOnlyFrontendontend';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';

export function ColorRecommendHome() {


  return (
    <div>
      <br /><br /><br /><br />
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <DisplayColorRatioOnlyFrontendontend />
        <DisplayUsedColorRatio />
      </div>
      <div style={{ display: 'flex' }}>
        <Canvas />
        <DisplayDrawingInfo />
      </div>
    </div>
  )
}

export default ColorRecommendHome