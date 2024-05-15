import '../Template.css'
//import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';

export function TestResponsivePage() {


  return (
    <div>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <header>
        <h1 id="logo">
          
          <a href="index.html">
            {/*<img src="../assets/logo.png" alt="SAMPLE COMPANY" />*/}
            <img src="src/assets/logo.png" alt="SAMPLE COMPANY" />
          </a>
        </h1>
        <nav id="menubar">
          <ul>
            <li><a href="#new">What's New</a></li>
            <li><a href="#company">Company</a></li>
            <li><a href="#service">Service</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />  
        
      </header>

      {/* 何故かheadreタグが描画されない */}

      <div id="container">
        <div id="contents">
          <section id="new">
            <h2>What's New</h2>
            <dl>
              <dt>2023/10/06</dt>
              <dd>
                前回更新した際に使わなくなったfixmenu_paretop.jsの読み込みタグがhtml側に残っていたので削除。<br />
                ついでにIE専用の昔のタグを４行削除しました。残したままだと警告が出る場合があります。
                <a href="https://template-party.com/update/20230715_maxcdn.html">詳しくはこちら。</a>
              </dd>
              <dt>2021/12/15</dt>
              <dd>
                fixmenu_pagetop.jsからscroll.jsに変更。既に利用中のお客様は特に設定の変更は不要です、引き続きご利用下さい。
                <span className="newicon">NEW</span>
              </dd>
              <dt>2020/09/27</dt>
              <dd>初心者向け無料ホームページテンプレートtp_beginner6公開。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
              <dt>20XX/00/00</dt>
              <dd>サンプルテキスト。サンプルテキスト。サンプルテキスト。</dd>
            </dl>
          </section>
          {/*/#new*/}

          <section id="company">
            <h2>Company</h2>
            <h3>会社概要</h3>
            <table className="ta1">
              <caption>見出しが必要であればここを使います</caption>
              <tbody>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
                <tr>
                  <th>見出し</th>
                  <td>ここに説明など入れて下さい。サンプルテキスト。</td>
                </tr>
              </tbody>
            </table>
            <h2>当テンプレートについて</h2>
            <h3>当テンプレートはhtml5+CSS3(レスポンシブWEBデザイン)です</h3>
            <p>
              当テンプレートは、パソコン、スマホ、タブレットでhtml共通のレスポンシブWEBデザインになっております。<br />
              古いブラウザ（※特にIE8以下）で閲覧した場合にCSSの一部が適用されない（角を丸くする設定など）のでご注意下さい。
            </p>
            <h3>各デバイスごとのレイアウトチェックは</h3>
            <p>
              最終的なチェックは実際のタブレットやスマホで行うのがおすすめですが、臨時チェックは最新のブラウザ(IEならIE10以降)で行う事もできます。ブラウザの幅を狭くしていくと、各端末サイズに合わせたレイアウトになります。
            </p>
          </section>
          {/*/#company*/}
        </div>
        {/*/#contents*/}
      </div>
      {/*/#container*/}

      <footer>
        <small>
          Copyright&copy; <a href="index.html">SAMPLE COMPANY</a> All Rights Reserved.
        </small>
        <span className="pr">
          《<a href="https://template-party.com/" target="_blank" rel="noopener noreferrer">Web Design:Template-Party</a>》
        </span>
      </footer>

      {/* jQueryファイルの読み込み */}
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

      {/* ページの上部へ戻るボタンとスクリプト */}
      <p className="scroll">
        <a href="#">↑</a>
      </p>
      <script src="js/scroll.js"></script>
    </div>
  )
}

export default TestResponsivePage