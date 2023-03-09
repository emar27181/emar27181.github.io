import '../App.css'
import React from 'react';
import { Camera } from '../pages/camera'
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

import LineGame from '../pages/LineGame';
import Clock from '../pages/Clock';
import ClockCircle from '../pages/ClockCircle';
import ClockColor from '../pages/ClockColor';
import ClockColorCircle from '../pages/ClockColorCircle';



export function ClockHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/clock">
          世界時計
        </NavLink> <br />

        <NavLink activeClassName="active" to="/clockCircle">
          点時計
        </NavLink> <br />

        <NavLink activeClassName="active" to="/clockColor">
          色時計
        </NavLink> <br />


      </ul>

      <switch>

      <Route path="/clockCircle">
          <ClockCircle />
        </Route>

        <Route path="/clockColor">
          <ClockColor />
          <ClockColorCircle />
        </Route>

        <Route path="/clock">
          <Clock />
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default ClockHome