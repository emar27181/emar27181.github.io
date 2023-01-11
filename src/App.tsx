import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

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
          <NavLink activeClassName="active" to="/template">
            Template
          </NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/template">
          <Template />
        </Route>

        <Route path="/contact">
          <Contact />
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
function Template() {
  return <h2>Template</h2>;
}
function Contact() {
  return <h2>Contact</h2>;
}
function NotFound() {
  return <h2>Not Found Page</h2>;
}



export default App
