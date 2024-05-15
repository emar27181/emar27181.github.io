import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';

export function TestResponsivePage() {


  return (
    <div>
      <h2> This is template page!!</h2>
      <BrowserRouter>
        <ul>
          <NavLink activeClassName="active" to="/template">
            テンプレートページ
          </NavLink> <br />

        </ul>

        <Switch>
          <Route path="/template" >
            <Template />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default TestResponsivePage