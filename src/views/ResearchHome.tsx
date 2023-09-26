import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import BounceColorful from '../pages/BounceColorful';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ExplainPluticCircle from '../pages/Reserch/ExplainPluticCircle';
import Canvas from '../pages/Reserch/Canvas';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import FormDisplay from '../pages/ColorRecommendation/FormDisplay';
import SendData from '../pages/ColorRecommendation/data/SendData';
import ReceiveData from '../pages/ColorRecommendation/data/ReceiveData';
import DisplayInfo from '../pages/Reserch/DisplayInfo';
import ExplainPluticCircleEnglish from '../pages/Reserch/ExplainPluticCircleEnglish';
import ExplainDrawing from '../pages/Reserch/ExplainDrawing';
import EmotionAnalyzeButton from '../pages/ColorRecommendation/data/AnalyzeEmotionRequest';

export function ResearchHome() {
  return (
    <div>
      <h3>以下卒業研究用ページ</h3>
      <DisplayInfo />
      <FormDisplay /> <br />
      <SendData /> <br />
      <EmotionAnalyzeButton />
      <ReceiveData />
      <ExplainDrawing />
      <Canvas />
      <DisplayEmotionColorRatio /> <br />
      <div style={{ display: 'flex' }}>
        <ExplainPluticCircleEnglish />
        <ExplainPluticCircle /> <br />
      </div>
  
      <a href="https://docs.google.com/presentation/d/1N21mXeW3NV-ODW7jHCPQ2FYsSbpZpuSNzAaHix2wRyc/edit?usp=sharing" target="_blank">卒業研究 説明スライド</a><br />
    </div>
  )
}

export default ResearchHome