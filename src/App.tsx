import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Template } from './pages/template'
import { UniqueBrush } from './pages/UniqueBrush'
import { LineGame } from './pages/LineGame'
import { Clock } from './pages/Clock'
import { CameraColorBall } from './pages/cameraColorBall'
import { Camera } from './pages/camera'
import { CameraMosaic } from './pages/CameraMosaic'
import { CameraMosaicArt } from './pages/CameraMosaicArt'
import { CameraMosaicBall } from './pages/CameraMosaicBall'
import { ClockCircle } from './pages/ClockCircle'
import { ClockColor } from './pages/ClockColor'
import { ClockColorCircle } from './pages/ClockColorCircle'
import { GrowArt } from './pages/GrowArt'
import { Home } from './views/home'

function App() {

  return (
    <BrowserRouter>
      <h1>p5.js演習ブラウザ</h1>

      <ul>

        <NavLink activeClassName="active" exact to="/">
          Home
        </NavLink><br />

        <NavLink activeClassName="active" to="/uniqueBrush">
          UniqueBrush
        </NavLink><br />

        <NavLink activeClassName="active" to="/lineGame">
          LineGame
        </NavLink><br />

        <NavLink activeClassName="active" to="/clock">
          Clock
        </NavLink><br />

        <NavLink activeClassName="active" to="/camera">
          Camera
        </NavLink><br />

        <NavLink activeClassName="active" to="/growArt">
          GrowArt
        </NavLink><br />

      </ul>

      <div className="red">※上記はメニューバー(のつもり)です。</div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/uniqueBrush">
          <UniqueBrush />
        </Route>

        <Route path="/lineGame">
          <LineGame />
        </Route>

        <Route path="/clock">
          <Clock />
          <ClockCircle />
          <ClockColor />
          <ClockColorCircle />
        </Route>

        <Route path="/camera">
          <Camera />
          <CameraColorBall />
          <CameraMosaic />
          <CameraMosaicBall />
          <CameraMosaicArt/>
        </Route>

        <Route path="/growArt">
          <GrowArt />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

// ルーティング先の処理
function NotFound() {
  return <h2>Not Found Page</h2>;
}

export default App
