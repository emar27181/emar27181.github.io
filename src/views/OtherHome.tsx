import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

import Picture from '../pages/Picture';
import WebGl from '../pages/WebGl';



export function CameraHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/picture">
          サンプル画像
        </NavLink> <br />

        <NavLink activeClassName="active" to="/webGl">
          3Dモデルのサンプル
          </NavLink><br />
      </ul>

      <switch>
        <Route path="/picture" >
          <Picture/>
        </Route>

        <Route path="/webGl">
          <WebGl/>
        </Route>
      </switch>

    </BrowserRouter>
  )
}

export default CameraHome