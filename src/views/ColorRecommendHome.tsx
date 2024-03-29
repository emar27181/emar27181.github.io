import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayColorRatioOnlyFrontendontend from '../pages/ColorRecommendation/DisplayColorRatioOnlyFrontendontend';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import ReturnCameraInfo from '../pages/Reserch/ReturnCameraInfo';
import ReturnImageInfo from '../pages/Reserch/ReturnImageInfo';
import TestDragAndPaste from '../pages/TestDragAndPaste';
import ColorGenerateRe, { ColorGanerate } from '../pages/ColorRecommendation/ColorGenerate';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';
import DisplayCanvasAndColorRatio from '../pages/ColorRecommendation/DisplayCanvasAndColorRatio';

export function ColorRecommendHome() {


  return (
    <div>
      <br /><br /><br /><br />

      {/*
      <div style={{ display: 'flex' }}>
        <ReturnCameraInfo />
        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("camera", 0, "hue")}
            {DisplayUsedColorRatio("camera", 0, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("camera", 0, "saturation")}
            {DisplayUsedColorRatio("camera", 0, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("camera", 0, "lightness")}
            {DisplayUsedColorRatio("camera", 0, "lightness")}
          </div>
        </div>
      </div>
      */}

      {DisplayCanvasAndColorRatio(5)}
      {DisplayCanvasAndColorRatio(6)}
      {DisplayCanvasAndColorRatio(7)}

      {/*
      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(0)}
        {DisplayUsedColorRatio("image", 0)}
      </div>
      <TestDragAndPaste />
       */}

      <DisplayColorRatioOnlyFrontendontend />
      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerate />
          <OperateGuiControl />
        </div>
        {Canvas()}
        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "hue")}
            {DisplayUsedColorRatio("canvas", 0, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "saturation")}
            {DisplayUsedColorRatio("canvas", 0, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "lightness")}
            {DisplayUsedColorRatio("canvas", 0, "lightness")}
          </div>
        </div>
        <DisplayDrawingInfo />
      </div>
    </div>
  )
}

export default ColorRecommendHome