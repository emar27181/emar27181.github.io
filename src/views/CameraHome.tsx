import '../App.css'
import React from 'react';
import { Camera } from '../pages/camera'
import { BrowserRouter, Route, NavLink} from 'react-router-dom';
import { CameraColorBall } from '../pages/cameraColorBall'
import { CameraMosaic } from '../pages/CameraMosaic'
import { CameraMosaicArt } from '../pages/CameraMosaicArt'
import { CameraMosaicBall } from '../pages/CameraMosaicBall'



export function CameraHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/camera">
          Default Camera
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraColorBall">
          Camera Color Ball
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaic">
          Camera Mosaic
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaicArt">
          Camera Mosaic Art
        </NavLink> <br />

        <NavLink activeClassName="active" to="/cameraMosaicBall">
          Camera Mosaic Ball
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

      </switch>

    </BrowserRouter>
  )
}

export default CameraHome