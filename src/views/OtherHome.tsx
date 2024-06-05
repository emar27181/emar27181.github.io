import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import Picture from '../pages/Picture';
import WebGl from '../pages/WebGl';
import OtherLinkTest from '../pages/OtherLinkTest';
//import ReceiveData from '../pages/ColorRecommendation/data/ReceiveData';
import ReceiveData from '../pages/Reserch/ReceiveData';
//import SendData from '../pages/ColorRecommendation/data/SendData';
import SendData from '../pages/Reserch/SendData';
import FormDisplay from '../pages/Reserch/FormDisplay';
//import FormDisplay from '../pages/ColorRecommendation/FormDisplay';
import TemplatePage from './TemplatePage';
import FreeResearch from '../pages/FreeResearch';
import AxiosTest from '../pages/test/AxiosTest';
//import ReceiveDataUseEffect from '../pages/ColorRecommendation/ReceiveData';

import ControlGravityField from '../pages/ControlGravityField';
import ControlGravityField2 from '../pages/ControlGravityField2';
import TestDisplayImage from '../pages/TestDisplayImage';
//import TestHandsfree from '../pages/TestHandsfree';
import { TestDrawCanvas } from '../pages/TestDrawCanvas';
import TestHandsfree from '../pages/TestHandsfree';
import TestResponsiveHome from './TestResponsiveHome';
import TestMultipleLayer from '../pages/TestMultipleLayer';
import TestAddImageLayer from '../pages/TestAddImageLayer';
import TestDragAndPaste from '../pages/TestDragAndPaste';
import CurlingPlotTest from '../pages/CurlingPlotTest';
import Canvas from '../pages/Reserch/Canvas';
import SimpleCanvas from '../pages/SimpleCanvas';
import TestResponsivePage from './TestResponsivePage';
import TestAPI from '../pages/TestAPI';
//import { Form } from 'react-bootstrap';

export function OtherHome() {


  return (
    <BrowserRouter>
      <ul>

        <NavLink activeClassName="active" to="/TestApi">
          APIのテスト
        </NavLink> <br />

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

        <NavLink activeClassName="active" to="/template">
          テンプレートページ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/freeResearch">
          数学の自由研究用のページ？
        </NavLink> <br />

        <NavLink activeClassName="active" to="/axiosTest">
          AxiosによるChatGPTAPI利用テスト
        </NavLink> <br />

        <NavLink activeClassName="active" to="/controlGravityField">
          重力場の操作(既存のコピー(バグ有))
        </NavLink><br />

        <NavLink activeClassName="active" to="/controlGravityField2">
          重力場の操作(改めて実装)
        </NavLink><br />

        <NavLink activeClassName="active" to="/testDisplayImage">
          画像読み込みのテスト
        </NavLink><br />

        <NavLink activeClassName='active' to="/testHandsfree">
          Handsfreeのテスト
        </NavLink><br />

        <NavLink activeClassName='active' to="/testResponsiveHome">
          レスポンシブデザインのテストページ
        </NavLink><br />

        <NavLink activeClassName='active' to="/testMultipleLayer">
          複数レイヤーのテストページ
        </NavLink><br />

        <NavLink activeClassName='active' to="/testDragAndPaste">
          ドラッグ&ペーストのテストページ
        </NavLink><br />

        <NavLink activeClassName='active' to="/curlingPlotTest">
          カーリングプロットのテストページ
        </NavLink><br />

        <NavLink activeClassName='active' to="/canvasTest">
          キャンバスの動作確認ページ
        </NavLink><br />

        <NavLink activeClassName='active' to="/testResponsivePage">
          レスポンシブページのテンプレート
        </NavLink><br />

      </ul>

      <Switch>

        <Route path="/testApi" >
          <TestAPI />
        </Route>

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

        <Route path="/template">
          <TemplatePage />
        </Route>

        <Route path="/freeResearch">
          <FreeResearch />
        </Route>

        <Route path="/axiosTest">
          <AxiosTest />
        </Route>

        <Route path="/controlGravityField">
          <ControlGravityField />
        </Route>

        <Route path="/controlGravityField2">
          <ControlGravityField2 />
        </Route>

        <Route path="/testDisplayImage">
          <TestDisplayImage />
        </Route>

        <Route path="/testHandsfree">
          <TestHandsfree />
        </Route>

        <Route path="/testResponsiveHome">
          <TestResponsiveHome />
        </Route>

        <Route path="/testMultipleLayer">
          <TestMultipleLayer />
          <TestAddImageLayer />
        </Route>

        <Route path="/testDragAndPaste">
          <TestDragAndPaste />
        </Route>

        <Route path="/curlingPlotTest" >
          <CurlingPlotTest />
        </Route>

        <Route path="/canvasTest" >
          <SimpleCanvas />
        </Route>

        <Route path="/testResponsivePage" >
          <TestResponsivePage />
        </Route>


      </Switch>

    </BrowserRouter>
  )
}

export default OtherHome