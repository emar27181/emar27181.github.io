import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, FormControl, Button, Form } from 'react-bootstrap'

import { LineGame } from './pages/LineGame'
import { Header } from './pages/Header'
import { Preparation } from './pages/Preparation'
import { Home } from './views/home'
import { CameraHome } from './views/CameraHome'
import { WorkMenu } from './views/WorkMenu'
import GameHome from './views/GameHome';
import ClockHome from './views/ClockHome';
import ToolHome from './views/ToolHome';
import GenerativeHome from './views/GenerativeHome';
import OtherHome from './views/OtherHome';
import ExplainPage from './views/ExplainPage';
import ReserchHome from './views/ResearchHome';
import logo from './assets/icon2.png';
import ResearchHome from './views/ResearchHome';
import CanvasHome from './views/CanvasHome';
import SoftwareKisoHome from './views/SoftwareKisoHome';
import CanvasHomeForMobile from './views/CanvasHomeForMobile';
import ColorRecommendHome from './views/ColorRecommendHome';
import CanvasHomeNormal from './views/CanvasHomeNormal';
import CanvasHomeRecommend from './views/CanvasHomeRecommend';
import CanvasHomeRe from './views/CanvasHomeRe';
import FlipGame from './pages/FlipGame';
import MatchBoGame from './pages/MatchBoGame';
import FlipGameMenu from './pages/FlipGameMenu';
import AllScrollLock from './components/AllScrollLock';
import CanvasHomeForInteraction2024 from './views/CanvasHomeForInteraction2024';
import GravityHome from './views/GravityHome';
import GyroCanvasHome from './views/GyroCanvasHome';
import EvaluateResearchPage from './views/EvaluateResearchPage';

let isDesktop = false;
let isMobileLandscape = false;

function App() {
  const FONT_SIZE = 0.013 * window.innerWidth;

  const [isNavbarVisible, setNavbarVisibility] = useState(true);

  useEffect(() => {
    // ウィンドウのサイズが変更されたときに実行されるハンドラーを登録
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      isDesktop = windowWidth > windowHeight;
      isMobileLandscape = (window.innerHeight <= 415);
      setNavbarVisibility(!isMobileLandscape); //スマホの横画面でない場合ナビゲーションバーを表示

      // ここで取得した windowWidth と windowHeight を使って必要な処理を行う
      /*
      console.log('Window Width:', windowWidth);
      console.log('Window Height:', windowHeight);
      console.log("isDesktop: ", isDesktop);
      */
    };

    // コンポーネントがマウントされたときに初回実行
    handleResize();

    // ウィンドウのリサイズイベントにハンドラーを追加
    window.addEventListener('resize', handleResize);

    // コンポーネントがアンマウントされたときにハンドラーをクリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空の依存配列を渡して初回のみ実行されるようにする

  useEffect(() => {
    // ページがスクロールされたときに呼び出されるイベントリスナーを追加
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // スクロール位置が一定の値よりも大きい場合、ナビゲーションバーを非表示にする
      /*
      if (scrollPosition > 10) {
        setNavbarVisibility(false);
      } else {
        setNavbarVisibility(true);
      }
      */
    };

    // イベントリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>

      {/*<Navbar bg="dark" variant="dark" fixed="top" style={{ display: isNavbarVisible ? 'block' : 'none' }}>*/}
      {/*<Navbar bg="dark" variant="dark" fixed="top" className="ml-auto" style={{ display: isNavbarVisible ? 'block' : 'none' }}>*/}
      {/*<Navbar bg="dark" variant="dark" className="ml-auto" style={{ position: 'relative', width: '100%' }}>*/}
      {/*<Navbar bg="dark" variant="dark" style={{ width: '100%' }}>*/}
      {/*<Navbar.Brand className="d-flex" style={{ fontSize: FONT_SIZE }}>*/}
      {/*<Navbar bg="dark" variant="dark" className="ml-auto" style={{ position: 'absolute', top: 0, width: '100%' }}>*/}
      <Navbar bg="dark" variant="dark" fixed="top" style={{ display: isNavbarVisible ? 'block' : 'none' }}>
        <Navbar.Brand className="d-flex" >
          {/*<img src={logo} height="30" className="d-inline-block align-top" alt="Logo" />*/}
          <span style={{ marginLeft: "10px" }}>p5.js演習ブラウザ</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto d-flex">
            <Nav.Link href="/" >ホーム</Nav.Link>
            {/*<Nav.Link href='/gravityHome' > 重力操作 </Nav.Link>*/}
            <Nav.Link href='/canvasHome' > 研究 </Nav.Link>
            <Nav.Link href="/workMenu" >作品集</Nav.Link>
            {/*<Nav.Link href='/canvasHomeForInteraction2024' > キャンバス </Nav.Link>*/}
            {/*<Nav.Link href='/flipGame' > 制作中ゲーム</Nav.Link>*/}
            {/*<Nav.Link href='/matchBoGame' > マッチ棒ゲーム</Nav.Link>*/}
            {/*<Nav.Link href='/gyroCanvas' > ジャイロキャンバス </Nav.Link>*/}
          </Nav>

          <Form className="ml-auto d-flex" >
            <FormControl type="text" placeholder="Search(Preparing)" className="mr-sm-2" />
            <Button variant="outline-primary" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar> <br />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/ExplainPage">
          <ExplainPage />
        </Route>

        <Route exact path="/workMenu">
          <WorkMenu />
        </Route>

        <Route path="/lineGame">
          <LineGame />
        </Route>

        <Route path="/cameraHome">
          <CameraHome />
        </Route>

        <Route path="/clockHome">
          <ClockHome />
        </Route>

        <Route path="/gameHome">
          <GameHome />
        </Route>

        <Route path="/soundHome">
          <Preparation />
        </Route>

        <Route path="/toolHome">
          <ToolHome />
        </Route>

        <Route path="/generativeHome">
          <GenerativeHome />
        </Route>

        <Route path="/otherHome">
          <OtherHome />
        </Route>

        <Route path="/researchHome">
          <ResearchHome />
        </Route>

        <Route path="/canvasHome">
          {/*<CanvasHome />*/}
          <CanvasHomeNormal />
        </Route>

        <Route path="/canvasHomeNormal">
          <CanvasHomeNormal />
        </Route>

        <Route path="/canvasHomeRe">
          <CanvasHomeRe />
        </Route>

        <Route path="/canvasHomeForInteraction2024">
          <CanvasHomeForInteraction2024 />
        </Route>

        <Route path="/canvasHomeRecommend">
          <CanvasHomeRecommend />
        </Route>

        <Route path="/canvasForMobile">
          <CanvasHomeForMobile />
        </Route>

        <Route path="/colorRecommendHome">
          <ColorRecommendHome />
        </Route>

        <Route path="/evaluateResearch">
          <EvaluateResearchPage/>
        </Route>


        <Route path="/softwareKisoHome">
          <SoftwareKisoHome />
        </Route>

        <Route path="/flipGame">
          <div style={{ display: 'flex' }}>
            <AllScrollLock />
            <FlipGame />
            <FlipGameMenu />
          </div>
        </Route>

        <Route path="/matchBoGame">
          <MatchBoGame />
        </Route>

        <Route path="/gravityHome">
          <GravityHome />
        </Route>

        <Route path="/gyroCanvas">
          <GyroCanvasHome />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter >
  );

}

// ルーティング先の処理
function NotFound() {
  return <h2>Not Found Page</h2>;
}

export default App
export function ReturnIsDesktop() { return isDesktop; };
