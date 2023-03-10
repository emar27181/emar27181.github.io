import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

import Picture from '../pages/Picture';



export function CameraHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/picture">
          サンプル画像
        </NavLink> <br />
      </ul>

      <switch>
        <Route path="/Picture" >
          <Picture/>
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default CameraHome