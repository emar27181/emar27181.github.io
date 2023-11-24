import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';

export function ColorRecommendHome() {


  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <Canvas />
      </div>
    </div>
  )
}

export default ColorRecommendHome