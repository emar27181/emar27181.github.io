import '../App.css'
import React from 'react';
import { Camera } from '../pages/camera'
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import LineGame from '../pages/LineGame';
import Clock from '../pages/Clock';
import ClockCircle from '../pages/ClockCircle';
import ClockColor from '../pages/ClockColor';
import ClockColorCircle from '../pages/ClockColorCircle';
import { UniqueBrush } from '../pages/UniqueBrush';
import BallsLoop from '../pages/BallsLoop';
import BallsReflect from '../pages/BallsRefrect';
import GrowArt from '../pages/GrowArt';



export function GenerativeHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/growArt">
          成長する円
        </NavLink><br />


      </ul>

      <switch>
        <Route path="/growArt">
          <GrowArt />
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default GenerativeHome