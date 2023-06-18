import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_WIDTH = 512, CANVAS_HEIGHT = CANVAS_WIDTH / 4;

export function ClockCountdown() {
  const sketch = (p: P5CanvasInstance) => {

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); //キャンバスの作成
      p.background("#000000");
      p.frameRate(1);
    };

    /*
    let preHours = -1;
    let preMinutes = -1;
    let preSeconds = -1;

    let isHoursChanged = false;
    let isMinutesChanged = false;
    let isSecondsChanged = false;

    let isFirst = true;

    let preX = CANVAS_WIDTH / 2, preY = CANVAS_HEIGHT / 2;
    */


    p.draw = () => {
      p.draw = () => {
        let time = new Date();
        //console.log(time);

        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        console.log(month + "/" + date + "  " + hours + ":" + minutes + ":" + seconds);

        let r = (255 / 12) * hours;
        let g = (255 / 60) * minutes;
        let b = (255 / 60) * seconds;
        //console.log("r: " + r + ", g: " + g + ", b: " + b);

        p.fill(r, g, b);
        p.ellipse(p.width / 2, p.height / 2, p.width, p.height);


      };
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockCountdown