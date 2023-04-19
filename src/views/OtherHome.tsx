import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import Picture from '../pages/Picture';
import WebGl from '../pages/WebGl';
import OtherLinkTest from '../pages/OtherLinkTest';
import Test from '../pages/Test';



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

        <NavLink activeClassName="active" to="/otherLinkTest">
          外部リンクのテンプレート
        </NavLink><br />

        <NavLink activeClassName="active" to="/test">
          テスト表示
        </NavLink>
      </ul>

      <switch>
        <Route path="/picture" >
          <Picture />
        </Route>

        <Route path="/webGl">
          <WebGl />
        </Route>

        <Route path="/otherLinkTest">
          <OtherLinkTest />
        </Route>

        <Route path="/test">
          <Test />
        </Route>
        </switch>

    </BrowserRouter>
  )
}

export default CameraHome