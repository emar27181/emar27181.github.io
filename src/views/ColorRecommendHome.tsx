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
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';

export function ColorRecommendHome() {


  return (
    <div>
      <br /><br /><br /><br />

      {/*
      <div style={{ display: 'flex' }}>
        <ReturnCameraInfo />
        {DisplayUsedColorRatio("camera", 0)}
      </div>*/}

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(4)}

        {DisplayUsedColorRatio("image", 4, "hue")}
        {DisplayUsedColorRatio("image", 4, "saturation")}
        {DisplayUsedColorRatio("image", 4, "lightness")}
      </div>

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(2)}
        {DisplayUsedColorRatio("image", 2, "hue")}
        {DisplayUsedColorRatio("image", 2, "saturation")}
        {DisplayUsedColorRatio("canvas", 2, "lightness")}
      </div>

      {/*
      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(0)}
        {DisplayUsedColorRatio("image", 0)}
      </div>
      <TestDragAndPaste />
       */}

      <div style={{ display: 'flex' }}>
        <ColorGenerateRe />
        <DisplayColorRatioOnlyFrontendontend />
      </div>
      <div style={{ display: 'flex' }}>
        {DisplayCanvasFilter("hue")}
        {DisplayCanvasFilter("saturation")}
        {DisplayCanvasFilter("lightness")}
      </div>
      <div style={{ display: 'flex' }}>
        <Canvas />
        {DisplayUsedColorRatio("canvas", 0, "hue")}
        {DisplayUsedColorRatio("canvas", 0, "saturation")}
        {DisplayUsedColorRatio("canvas", 0, "lightness")}
        <DisplayDrawingInfo />
      </div>
    </div>
  )
}

export default ColorRecommendHome