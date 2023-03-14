import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'

import { LineGame } from './pages/LineGame'
import { Header } from './pages/Header'
import { Preparation } from './pages/Preparation'
import { Home } from './views/home'
import { CameraHome } from './views/CameraHome'
import { WorkMenu } from './views/WorkMenu'
import GameHome from './views/GameHome';
import ClockHome from './views/ClockHome';
import ToolHome from './views/ToolHome';
import GenerativeHome from './views/GenerativeHome';
import OtherHome from './views/OtherHome';
import ExplainPage from './views/ExplainPage';


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
          <Nav.Link href='/ExplainPage'> 実行環境 </Nav.Link>
        </Nav>
      </Navbar >

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/ExplainPage">
          <ExplainPage />
        </Route>

        <Route exact path="/workMenu">
          <WorkMenu />
        </Route>

        <Route path="/lineGame">
          <LineGame />
        </Route>

        <Route path="/camera">
          <CameraHome />
        </Route>

        <Route path="/clockHome">
          <ClockHome />
        </Route>

        <Route path="/gameHome">
          <GameHome />
        </Route>

        <Route path="/sound">
          <Preparation />
        </Route>

        <Route path="/toolHome">
          <ToolHome />
        </Route>

        <Route path="/generativeHome">
          <GenerativeHome />
        </Route>

        <Route path="/otherHome">
          <OtherHome />
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
