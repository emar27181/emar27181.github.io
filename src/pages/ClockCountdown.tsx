import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_WIDTH = 512, CANVAS_HEIGHT = CANVAS_WIDTH / 4;
const STARTLINE_MONTH = 7, STARTLINE_DAY = 1;
const DEADLINE_MONTH = 8, DEADLINE_DAY = 31;

export function ClockCountdown() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); //キャンバスの作成
      p.background("#000000");
      p.frameRate(1);
      p.textAlign(p.CENTER);
    };

    p.draw = () => {

      p.draw = () => {
        p.background(0);
        let time = new Date();
        //console.log(time);

        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        console.log(month + "/" + date + "  " + hours + ":" + minutes + ":" + seconds);
        let nowTime = month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;

        let deadlineDiffMonth = DEADLINE_MONTH - month;
        let deadlineDiffDay = DEADLINE_DAY - date;
        let startlineDiffMonth = STARTLINE_MONTH - month;
        let startlineDiffDay = STARTLINE_DAY - date;
        let deadlineStillDays = deadlineDiffMonth * 31 + deadlineDiffDay;
        let startlineStillDays = startlineDiffMonth * 31 + startlineDiffDay;
        let commentStartline = "(※応募開始まであと " + startlineStillDays + "日！)";
        let commentDeadline = "応募締切まであと " + deadlineStillDays + " 日！";

        let r = (255 / 12) * hours;
        let g = (255 / 60) * minutes;
        let b = (255 / 60) * seconds;
        //console.log("r: " + r + ", g: " + g + ", b: " + b);

        p.fill(r, g, b);
        p.textSize(10);

        p.text(commentStartline, p.width / 2, p.height -10);

        p.fill(r, g, b);
        p.textSize(40);
        p.text(commentDeadline, p.width / 2, p.height / 2);


      };
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockCountdown