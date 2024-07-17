import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import ButtonEvaluateRecommendColors from '../components/ButtonEvaluateRecommendColors';
import ButtonSaveColorScheme from '../components/ButtonSaveColorScheme';
import ButtonSaveColorSchemeAll from '../components/ButtonSaveColorSchemeAll';

export function EvaluateResearchPage() {


  return (
    <div>
      <ButtonSaveColorScheme />
      <ButtonSaveColorSchemeAll />
      <ButtonEvaluateRecommendColors />
    </div>
  )
}

export default EvaluateResearchPage