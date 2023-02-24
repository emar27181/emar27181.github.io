import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Template } from './pages/template'
import { UniqueBrush } from './pages/UniqueBrush'
import { LineGame } from './pages/LineGame'
import { Clock } from './pages/Clock'
import { CameraColorBall } from './pages/cameraColorBall'
import { Camera } from './pages/camera'
import { ClockCircle } from './pages/ClockCircle'

function App() {

  return (
    <BrowserRouter>
      <h1>Hello React Router!!</h1>

      <ul>

        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/uniqueBrush">
            UniqueBrush
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/lineGame">
            LineGame
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/clock">
            Clock
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/camera">
            Camera
          </NavLink>
        </li>

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
        </Route>

        <Route path="/camera">
          <Camera />
          <CameraColorBall />
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
  return <h2>Home</h2>;
}

function NotFound() {
  return <h2>Not Found Page</h2>;
}

export default App
