import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

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