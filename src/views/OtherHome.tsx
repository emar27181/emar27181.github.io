import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import Picture from '../pages/Picture';
import WebGl from '../pages/WebGl';
import OtherLinkTest from '../pages/OtherLinkTest';
import ReceiveData from '../pages/ColorRecommendation/data/ReceiveData';
import SendData from '../pages/ColorRecommendation/data/SendData';
import FormDisplay from '../pages/ColorRecommendation/FormDisplay';
import ColorOfEmotion from '../pages/Class/ExportColorOfEmotion';
import TemplateClass from '../pages/Class/TemplateClass';
import { Form } from 'react-bootstrap';

export function OtherHome() {


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

        <NavLink activeClassName="active" to="/receiveData">
          flaskからのデータの受け取りテスト
        </NavLink> <br />

        <NavLink activeClassName="active" to="/test">
          ColorOfEmotionのテスト
        </NavLink>

      </ul>

      <Switch>
        <Route path="/picture" >
          <Picture />
        </Route>

        <Route path="/webGl">
          <WebGl />
        </Route>

        <Route path="/otherLinkTest">
          <OtherLinkTest />
        </Route>

        <Route path="/receiveData">
          <FormDisplay /> <br />
          <SendData /> <br />
          <ReceiveData />
        </Route>

        <Route path="/test">
          <ColorOfEmotion/>
        </Route>
      </Switch>

    </BrowserRouter>
  )
}

export default OtherHome