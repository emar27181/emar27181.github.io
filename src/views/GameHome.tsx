import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import LineGame from '../pages/LineGame';
import CameraMosaicBallRPG from '../pages/CameraMosaicBallRPG';
import MatchBoGame from '../pages/MatchBoGame';
import SoftwareKisoHome from './SoftwareKisoHome';
import FlipGame from '../pages/FlipGame';


export function GameHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/lineGame">
          ブロック崩しもどき
        </NavLink> <br />

        <NavLink activeClassName="active" to="/CameraMosaicBallRPG">
          カメラがフィールドのRPG
        </NavLink><br />

        <NavLink activeClassName="active" to="/softWareKisoHome">
          マッチ棒
        </NavLink><br />

        <NavLink activeClassName="active" to="/flipGame">
          自作ゲーム
        </NavLink>
      </ul>



      <Switch>
        <Route path="/lineGame" >
          <LineGame />
        </Route>
        <Route path="/CameraMosaicBallRPG" >
          <CameraMosaicBallRPG />
        </Route>
        <Route path="/softWareKisoHome" >
          <SoftwareKisoHome />
        </Route>
        <Route path="/flipGame" >
          <FlipGame />
        </Route>
      </Switch>

    </BrowserRouter>
  )
}

export default GameHome