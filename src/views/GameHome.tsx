import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

import LineGame from '../pages/LineGame';



export function GameHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/lineGame">
          ブロック崩しもどき
        </NavLink> <br />
      </ul>

      <switch>
        <Route path="/lineGame" >
          <LineGame />
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default GameHome