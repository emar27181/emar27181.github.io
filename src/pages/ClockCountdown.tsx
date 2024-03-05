import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_WIDTH = 512, CANVAS_HEIGHT = CANVAS_WIDTH / 4;
const STARTLINE_MONTH = 10, STARTLINE_DAY = 2;
const DEADLINE_MONTH = 12, DEADLINE_DAY = 22;

const DEADLINE_MONTH_2 = 2, DEADLINE_DAY_2 = 3;
const DEBUG = false;

export function ClockCountdown() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      //p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); //キャンバスの作成
      createCanvas();
      p.background("#000000");
      p.frameRate(1);
      p.textAlign(p.CENTER);
    };

    function createCanvas() {
      if (window.innerWidth > window.innerHeight) {
        p.createCanvas(0.4 * window.innerWidth, 0.1 * window.innerWidth);
      }
      else {
        p.createCanvas(0.8 * window.innerWidth, 0.2 * window.innerWidth);
      }
    }

    p.draw = () => {

      p.draw = () => {
        p.background(0);
        let time = new Date();
        //console.log(time);

        //現在の時刻の取得
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        if (DEBUG) { console.log(month + "/" + date + "  " + hours + ":" + minutes + ":" + seconds); }
        let nowTime = month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;

        //U22プログラミングコンテストまでの日数の計算
        let deadlineDiffMonth = DEADLINE_MONTH - month;
        let deadlineDiffDay = DEADLINE_DAY - date;
        let startlineDiffMonth = STARTLINE_MONTH - month;
        let startlineDiffDay = STARTLINE_DAY - date;
        let deadlineStillDays = deadlineDiffMonth * 31 + deadlineDiffDay;
        let startlineStillDays = (startlineDiffMonth * 31 + startlineDiffDay) % 365;
        let commentStartline = "(※応募開始まであと " + startlineStillDays + "日！)";
        let commentDeadline = "応募締切まであと " + deadlineStillDays + " 日！";

        //オープンキャンパスまでの日数の計算
        //本来、関数を用いた方が良いですが簡単のため直書き()
        let deadlineDiffMonth2 = DEADLINE_MONTH_2 - month;
        let deadlineDiffDay2 = DEADLINE_DAY_2 - date;
        let deadlineStillDays2 = deadlineDiffMonth2 * 31 + deadlineDiffDay2 + 365;
        let commentDeadline2 = "卒論発表会まであと " + deadlineStillDays2 + " 日！";

        let r = (255 / 12) * hours;
        let g = (255 / 60) * minutes;
        let b = (255 / 60) * seconds;

        p.fill(r, g, b);
        p.textSize(0.05 * p.width);
        p.text(commentDeadline2, p.width / 2, 0.9 * p.height);

        p.textSize(0.07 * p.width);
        p.text(commentDeadline, p.width / 2, p.height / 2);

        p.textSize(0.03 * p.width);
        p.text("インタラクション2024", p.width / 2, 0.2 * p.height);
        console.log(window.innerWidth);
      };
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockCountdown