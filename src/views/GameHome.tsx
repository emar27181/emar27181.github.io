import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import LineGame from '../pages/LineGame';
import CameraMosaicBallRPG from '../pages/CameraMosaicBallRPG';
import MatchBoGame from '../pages/MatchBoGame';



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

        <NavLink activeClassName="active" to="/matchBoGame">
          マッチ棒
        </NavLink>
      </ul>



      <switch>
        <Route path="/lineGame" >
          <LineGame />
        </Route>
        <Route path="/CameraMosaicBallRPG" >
          <CameraMosaicBallRPG />
        </Route>
        <Route path="/matchBoGame" >
          <MatchBoGame />
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default GameHome