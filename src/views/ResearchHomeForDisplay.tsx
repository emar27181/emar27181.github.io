import '../App.css'
import React, { useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import BounceColorful from '../pages/BounceColorful';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ExplainPluticCircle from '../pages/Reserch/ExplainPluticCircle';
import Canvas from '../pages/Reserch/Canvas';
import FormDisplay from '../pages/Reserch/FormDisplay';
import SendData from '../pages/Reserch/SendData';
import ReceiveData from '../pages/Reserch/ReceiveData';
import DisplayInfo from '../pages/Reserch/DisplayInfo';
import ExplainPluticCircleEnglish from '../pages/Reserch/ExplainPluticCircleEnglish';
import ExplainDrawing from '../pages/Reserch/ExplainDrawing';
import EmotionAnalyzeButton from '../pages/Reserch/AnalyzeEmotionRequest';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import GravityBall from '../pages/GravityBall';
import ReturnCameraInfo from '../pages/Reserch/ReturnCameraInfo';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import ReturnImageInfo from '../pages/Reserch/ReturnImageInfo';
import CanvasForDesktopComponent from '../pages/CanvasForDesktopComponent';
import CanvasForMobileComponent from '../pages/CanvasForMobileComponent';
import { ReturnIsDesktop } from '../App';

export function ResearchHomeForDisplay() {

  let isDesktop = ReturnIsDesktop();

  return (
    <div>
      <h3>卒業研究用ページ</h3> <br />
      <ExplainDrawing />

      {ReturnImageInfo(0)}
      <div style={{ display: 'flex' }}>
        <ReturnCameraInfo />
      </div>


      <div>
        {isDesktop && <CanvasForDesktopComponent />}
        {!isDesktop && <CanvasForMobileComponent />}
      </div>

      {/* 
        <ReturnTrackingInfo />
      */}
    </div>
  )
}

export default ResearchHomeForDisplay