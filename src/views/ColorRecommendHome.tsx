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
import ColorGenerateRe, { ColorGanerateRe } from '../pages/ColorRecommendation/ColorGenerateRe';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';

export function ColorRecommendHome() {


  return (
    <div>
      <br /><br /><br /><br />

      
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

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(4)}

        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 4, "hue")}
            {DisplayUsedColorRatio("image", 4, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 4, "saturation")}
            {DisplayUsedColorRatio("image", 4, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 4, "lightness")}
            {DisplayUsedColorRatio("image", 4, "lightness")}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {ReturnImageInfo(2)}
        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 2, "hue")}
            {DisplayUsedColorRatio("image", 2, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 2, "saturation")}
            {DisplayUsedColorRatio("image", 2, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("image", 2, "lightness")}
            {DisplayUsedColorRatio("image", 2, "lightness")}
          </div>
        </div>
      </div>

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
          <ColorGanerateRe />
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