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
import { ClockCircle } from './pages/ClockCircle'
import { ClockColor } from './pages/ClockColor'
import { ClockColorCircle } from './pages/ClockColorCircle'

function App() {

  return (
    <BrowserRouter>
      <h1>p5.js演習ブラウザへようこそ!!</h1>

      <ul>


        <NavLink activeClassName="active" exact to="/">
          Home
        </NavLink>

        <br />

        <NavLink activeClassName="active" to="/uniqueBrush">
          UniqueBrush
        </NavLink>

        <br />

        <NavLink activeClassName="active" to="/lineGame">
          LineGame
        </NavLink>

        <br />

        <NavLink activeClassName="active" to="/clock">
          Clock
        </NavLink>

        <br />

        <NavLink activeClassName="active" to="/camera">
          Camera
        </NavLink>

      </ul>

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
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );

}

// ルーティング先の処理
function Home() {
  return <h2>上記のリンク先をクリックすることで作品ページへジャンプします。</h2>;
}

function NotFound() {
  return <h2>Not Found Page</h2>;
}

export default App
