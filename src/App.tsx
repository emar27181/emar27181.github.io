import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UniqueBrush } from './pages/UniqueBrush'
import { LineGame } from './pages/LineGame'
import { Clock } from './pages/Clock'
import { ClockCircle } from './pages/ClockCircle'
import { ClockColor } from './pages/ClockColor'
import { ClockColorCircle } from './pages/ClockColorCircle'
import { GrowArt } from './pages/GrowArt'
import { BallsReflect } from './pages/BallsRefrect'
import { BallsLoop } from './pages/BallsLoop'
import { Sound } from './pages/Sound'
import { Header } from './pages/Header'
import {Preparation} from './pages/Preparation'

import { Home } from './views/home'
import { CameraHome } from './views/CameraHome'

import { Navbar, Container, Nav } from 'react-bootstrap'
import { WorkMenu } from './views/WorkMenu'


function App() {

  return (
    <BrowserRouter>

      <Header />

      <Navbar bg="dark" variant='dark'>
        <Container>
          <Navbar.Brand >
            p5.js演習ブラウザ
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">ホーム</Nav.Link>
          <Nav.Link href="/workMenu">作品集</Nav.Link>
        </Nav>
      </Navbar >

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/workMenu">
          <WorkMenu />
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
          <CameraHome />
        </Route>

        <Route path="/growArt">
          <GrowArt />
        </Route>

        <Route path="/ballsReflect">
          <BallsReflect />
        </Route>

        <Route path="/ballsLoop">
          <BallsLoop />
        </Route>

        <Route path="/sound">
          <Preparation />
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
