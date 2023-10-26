import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import BounceColorful from '../pages/BounceColorful';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ExplainPluticCircle from '../pages/Reserch/ExplainPluticCircle';
import Canvas from '../pages/Reserch/Canvas';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
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

export function ResearchHomeForDisplay() {
  return (
    <div>
      <h3>卒業研究用ページ</h3> <br />
      <div style={{ display: 'flex' }}>
        <ExplainDrawing />
        <DisplayGravityPlace />
        <ReturnImageInfo />
      </div>
      <div style={{ display: 'flex' }}>
        <Canvas />
        <DisplayDrawingInfo />
        <ReturnCameraInfo />
      </div>
      <div style={{ display: 'flex' }}>
        <DisplayEmotionColorRatio /> <br />
      </div>

      <a href="https://docs.google.com/presentation/d/1N21mXeW3NV-ODW7jHCPQ2FYsSbpZpuSNzAaHix2wRyc/edit?usp=sharing" target="_blank">卒業研究 説明スライド</a><br />
    </div>
  )
}

export default ResearchHomeForDisplay