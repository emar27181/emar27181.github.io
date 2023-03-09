import '../App.css'
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import GameHome from './GameHome';


export function WorkMenu() {
  return (
    <div>
      <ul>
        <NavLink activeClassName="active" to="/gameHome">
          ゲーム系
        </NavLink><br />

        <NavLink activeClassName="active" to="/clockHome">
          時計系
        </NavLink><br />

        <NavLink activeClassName="active" to="/camera">
          カメラ系
        </NavLink><br />

        <NavLink activeClassName="active" to="/sound">
          音声系
        </NavLink><br />

        <NavLink activeClassName="active" to="/toolHome">
          ツール系
        </NavLink><br />

        <NavLink activeClassName="active" to="/growArt">
          GrowArt
        </NavLink><br />



      </ul>

    </div>
  )
}

export default WorkMenu