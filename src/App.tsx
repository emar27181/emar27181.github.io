import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, FormControl, Button, Form } from 'react-bootstrap'

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
import ReserchHome from './views/ResearchHome';
import logo from './assets/icon2.png';
import ResearchHome from './views/ResearchHome';

function App() {

  return (
    <BrowserRouter>

      <Navbar bg="dark" variant="dark" fixed="top">

        <Navbar.Brand >
          <img src={logo} height="30" className="d-inline-block align-top" alt="Logo" />
          <span style={{ marginLeft: "10px" }}>p5.js演習ブラウザ</span>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">ホーム</Nav.Link>
          <Nav.Link href="/workMenu">作品集</Nav.Link>
          <Nav.Link href='/ExplainPage'> 実行環境 </Nav.Link>
        </Nav>
        <Form className="ml-auto d-flex">
          <FormControl type="text" placeholder="Search(Preparing)" className="ml-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar >
      <br /><br />

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

        <Route path="/cameraHome">
          <CameraHome />
        </Route>

        <Route path="/clockHome">
          <ClockHome />
        </Route>

        <Route path="/gameHome">
          <GameHome />
        </Route>

        <Route path="/soundHome">
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

        <Route path="/researchHome">
          <ResearchHome />
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
