import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import GrowArt from '../pages/GrowArt';
import Ripples from '../pages/Ripples';
import ColorGanerate from '../pages/ColorGenerate';
import CompromiseTemplate from '../pages/CompromiseTemplate';
import FormTemplate from '../pages/FormTemplate';
import ColorDisplay from '../pages/ColorDisplay';



export function GenerativeHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/growArt">
          成長する円
        </NavLink><br />

        <NavLink activeClassName="active" to="/ripples">
          波紋
        </NavLink><br />

        <NavLink activeClassName="active" to="/colorGanerate">
          色の生成
        </NavLink><br />

        <NavLink activeClassName='active' to="/colorGenerateProttype">
          色の推薦アルゴリズムのプロトタイプ
        </NavLink><br />

      </ul>

      <Switch>
        <Route path="/growArt">
          <GrowArt />
        </Route>
        <Route path="/ripples">
          <Ripples />
        </Route>
        <Route path="/colorGanerate">
          <ColorGanerate />
        </Route>
        <Route path="/colorGenerateProttype">
          <FormTemplate />
          <CompromiseTemplate />
          <ColorDisplay />
          <br />
          <ColorGanerate />
        </Route>
      </Switch>

    </BrowserRouter>
  )
}

export default GenerativeHome