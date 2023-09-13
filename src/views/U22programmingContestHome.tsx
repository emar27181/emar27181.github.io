import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import BounceColorful from '../pages/BounceColorful';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import ExplainPluticCircle from '../pages/Reserch/ExplainPluticCircle';

export function U22programmingContestHome() {


  return (
    <div>
      <h3>以下 U-22プログラミングコンテスト用ページ</h3>
      <BounceColorful />
      <DisplayEmotionColorRatio /> <br />
      <ExplainPluticCircle /> <br />
    </div>
  )
}

export default U22programmingContestHome