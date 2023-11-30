import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import { UniqueBrush } from '../pages/UniqueBrush';
import BallsLoop from '../pages/BallsLoop';
import BallsReflect from '../pages/BallsRefrect';
import BallsReflectColors from '../pages/BallsRefrectColors';
import TestMultipleLayer from '../pages/TestMultipleLayer';



export function ToolHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/UniqueBrush">
          ユニークブラシ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/ballsLoop">
          ボールのループ
        </NavLink><br />

        <NavLink activeClassName="active" to="/ballsReflect">
          ボールの反射
        </NavLink><br />

        <NavLink activeClassName="active" to="/ballsReflectColors">
          カラーボールの反射
        </NavLink>

        <NavLink activeClassName="active" to="/contemporaryArtLike">
          現代アートっぽいやつ？
        </NavLink>



      </ul>

      <switch>
        <Route path="/uniqueBrush">
          <UniqueBrush />
        </Route>

        <Route path="/ballsReflect">
          <BallsReflect />
        </Route>

        <Route path="/ballsLoop">
          <BallsLoop />
        </Route>

        <Route path="/ballsReflectColors">
          <BallsReflectColors />
        </Route>

        <Route path="/contemporaryArtLike">
          <div style={{ display: "frex" }}>
            <TestMultipleLayer />
            <TestMultipleLayer />
          </div>
          <div style={{ display: "frex" }}>
            <TestMultipleLayer />
            <TestMultipleLayer />
          </div>
        </Route>

      </switch>

    </BrowserRouter>
  )
}

export default ToolHome