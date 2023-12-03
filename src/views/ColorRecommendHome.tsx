import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayColorRatioOnlyFrontendontend from '../pages/ColorRecommendation/DisplayColorRatioOnlyFrontendontend';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import ReturnCameraInfo from '../pages/Reserch/ReturnCameraInfo';
import ReturnImageInfo from '../pages/Reserch/ReturnImageInfo';
import TestDragAndPaste from '../pages/TestDragAndPaste';
import ColorGenerateRe from '../pages/ColorRecommendation/ColorGenerateRe';

export function ColorRecommendHome() {


  return (
    <div>
      <br /><br /><br /><br />

      <div style={{ display: 'flex' }}>
        <ReturnCameraInfo />
        {DisplayUsedColorRatio("camera", 0)}
      </div>

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(1)}
        {DisplayUsedColorRatio("image", 1)}
      </div>

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(0)}
        {DisplayUsedColorRatio("image", 0)}
      </div>

      <TestDragAndPaste />
      <div style={{ display: 'flex' }}>
        <ColorGanerate />
        <ColorGenerateRe />
        <DisplayColorRatioOnlyFrontendontend />
      </div>
      <div style={{ display: 'flex' }}>
        <Canvas />
        {DisplayUsedColorRatio("canvas", 0)}
        <DisplayDrawingInfo />
      </div>
    </div>
  )
}

export default ColorRecommendHome