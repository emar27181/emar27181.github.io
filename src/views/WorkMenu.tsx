import '../App.css'
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

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

        <NavLink activeClassName="active" to="/generativeHome">
          生成系
        </NavLink><br />

        <NavLink activeClassName="active" to="/otherHome">
          その他
        </NavLink>

      </ul>

    </div>
  )
}

export default WorkMenu