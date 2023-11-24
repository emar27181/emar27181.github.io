import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import DisplayColorRatio from '../pages/ColorRecommendation/DisplayColorRatio';

export function ColorRecommendHome() {


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <div>
          <Canvas />
          <DisplayColorRatio />
        </div>
      </div>
    </div>
  )
}

export default ColorRecommendHome