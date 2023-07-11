import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';

export function ResearchHome() {


  return (
    <div>
      <BrowserRouter>
        <ul>
          <NavLink activeClassName="active" to="/template">
            テンプレート
          </NavLink> <br />

        </ul>

      </BrowserRouter>

      <Switch>
        <Template />
      </Switch>
    </div>
  )
}

export default ResearchHome