import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import GrowArt from '../pages/GrowArt';
import Ripples from '../pages/Ripples';
import ColorGanerate from '../pages/ColorRecommendation/ColorGenerate';
import Compromise from '../pages/ColorRecommendation/Compromise';
import FormDisplay from '../pages/ColorRecommendation/FormDisplay';
import ColorDisplay from '../pages/ColorRecommendation/ColorDisplay';
import CompromiseTemplate from '../pages/CompromiseTemplate';
import ColorTemplate from '../pages/ColorTemplate';
import BounceColorful from '../pages/BounceColorful';


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

        <NavLink activeClassName='active' to="/compromiseTemplate">
          compromiseの動作確認
        </NavLink><br />

        <NavLink activeClassName='active' to="/colorTemplate">
          colorの動作確認
        </NavLink><br />

        <NavLink activeClassName='active' to="/bounceColorful">
          弾むカラフル
        </NavLink>

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
          <FormDisplay />
          <Compromise />
          <ColorDisplay />
          <br />
          <ColorGanerate />
        </Route>

        <Route path="/compromiseTemplate">
          <CompromiseTemplate />
        </Route>

        <Route path="/colorTemplate">
          <ColorTemplate />
        </Route>

        <Route path="/bounceColorful">
          <BounceColorful />
        </Route>

      </Switch>

    </BrowserRouter>
  )
}

export default GenerativeHome