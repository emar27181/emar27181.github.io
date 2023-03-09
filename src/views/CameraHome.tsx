import '../App.css'
import React from 'react';
import { Camera } from '../pages/camera'
import { BrowserRouter, Route, NavLink} from 'react-router-dom';
import { CameraColorBall } from '../pages/cameraColorBall'
import { CameraMosaic } from '../pages/CameraMosaic'
import { CameraMosaicArt } from '../pages/CameraMosaicArt'
import { CameraMosaicBall } from '../pages/CameraMosaicBall'
import {CameraTracking} from '../pages/CameraTracking'
import Preparation from '../pages/Preparation';



export function CameraHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/camera">
          通常カメラ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraColorBall">
          カメラに応じて色が変化するボール
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaic">
          モザイクカメラ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaicArt">
          モザイクカメラアート
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaicBall">
          モザイクカメラで反射するボール
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraTracking">
          トラッキングカメラ
        </NavLink> <br />

      </ul>

      <switch>
        <Route path="/camera" >
          <Camera />
        </Route>

        <Route path="/cameraColorBall" >
          <Camera />
          <CameraColorBall />
        </Route>

        <Route path="/cameraMosaic" >
          <CameraMosaic />
        </Route>

        <Route path="/cameraMosaicArt" >
          <CameraMosaicArt />
        </Route>

        <Route path="/cameraMosaicBall" >
          <CameraMosaicBall />
        </Route>

        <Route path="/cameraTracking">
          <Preparation/>
        </Route>

      </switch>

    </BrowserRouter>
  )
}

export default CameraHome