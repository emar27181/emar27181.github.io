import '../App.css'
import React from 'react';
import ClockCountdown from '../pages/ClockCountdown';
import BounceColorfulForDisplay from '../pages/BounceColorfulForDisplay';
import BounceColorful from '../pages/BounceColorful';
import ResearchHome from './ResearchHome';
import ResearchHomeForDisplay from './ResearchHomeForDisplay';
import RandomGenerativeLine from '../pages/RandomGenerativeLine';

export function Home() {

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>p5.js演習ブラウザへようこそ!!</h2><br />

      <RandomGenerativeLine /><br />

      このブラウザではp5.jsを用いた個人作品を展示しています。 <br />
      学習を目的としたブラウザであるため不備があると思いますがご容赦ください。<br />
      レスポンシブデザインに対応していないため、スマートフォンでは上手く表示されないことがあります。<br /><br />

      <br />

      <br />


      <h3>外部リンク</h3>
      <a href="https://emar27181-resume.netlify.app/" target="_blank">HomePage</a><br />
      <a href="https://github.com/emar27181" target="_blank">GitHub</a><br />
      <a href="https://int.cs.meiji.ac.jp/" target="_blank">My Laboratory</a><br />
      <a href="https://editor.p5js.org/ema_r/sketches" target="_blank">p5 editor</a><br />
      <br />

      <h3>お問い合わせ</h3>
      <a href="mailto: ryunosukeema.job@gmail.com">Gmail</a><br /><br />

      {/*
      <h3>SNS</h3>
      <a href="https://twitter.com/emachan27181?s=21&t=5iiinLRt_xOvBVXA5bLmPA" target="_blank">twitter</a><br />
      <a href="https://www.instagram.com/emachan27181/" target="_blank">Instagram</a><br />
      */}

    </div>
  )
}

export default Home