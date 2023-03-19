import '../App.css'
import React from 'react';
import { Camera } from '../pages/camera'
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { CameraColorBall } from '../pages/cameraColorBall'
import { CameraMosaic } from '../pages/CameraMosaic'
import { CameraMosaicArt } from '../pages/CameraMosaicArt'
import { CameraMosaicBall } from '../pages/CameraMosaicBall'
import { CameraTracking } from '../pages/CameraTracking'
import Preparation from '../pages/Preparation';
import CameraColorFilter from '../pages/CameraColorFilter';
import CameraMosaicBlend from '../pages/CameraMosaicBlend';



export function CameraHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/cameraHome/camera">
          通常カメラ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraColorBall">
          カメラに応じて色が変化するボール
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraMosaic">
          モザイクカメラ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraMosaicBlend">
          カメラ上の色の混ぜ合わせ(?)
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraColorFilter">
          カメラのフィルタ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraMosaicArt">
          モザイクカメラアート
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraMosaicBall">
          モザイクカメラで反射するボール
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraHome/cameraTracking">
          トラッキングカメラ
        </NavLink> <br />

      </ul>

      <switch>
        <Route path="/cameraHome/camera" >
          <Camera />
        </Route>

        <Route path="/cameraHome/cameraColorBall" >
          <Camera />
          <CameraColorBall />
        </Route>

        <Route path="/cameraHome/cameraMosaic" >
          <CameraMosaic />
        </Route>

        <Route path="/cameraHome/cameraColorFilter" >
          <CameraColorFilter />
        </Route>

        <Route path="/cameraHome/cameraMosaicArt" >
          <CameraMosaicArt />
        </Route>

        <Route path="/cameraHome/cameraMosaicBall" >
          <CameraMosaicBall />
        </Route>

        <Route path="/cameraHome/cameraTracking">
          <CameraTracking />
        </Route>

      <Route path="/cameraHome/cameraMosaicBlend">
        <CameraMosaicBlend />
      </Route>

      </switch>

    </BrowserRouter>
  )
}

export default CameraHome