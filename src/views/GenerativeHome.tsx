import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import GrowArt from '../pages/GrowArt';
import Ripples from '../pages/Ripples';
import ColorGanerate from '../pages/ColorGenerate';
import CompromiseTemplate from '../pages/CompromiseTemplate';



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

        <NavLink activeClassName="active" to="/compromiseTemplate">
          NLPのテンプレート
        </NavLink>

      </ul>

      <switch>
        <Route path="/growArt">
          <GrowArt />
        </Route>
        <Route path="/ripples">
          <Ripples />
        </Route>
        <Route path="/colorGanerate">
          <ColorGanerate />
        </Route>
        <Route path="/compromiseTemplate">
          <CompromiseTemplate />
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default GenerativeHome