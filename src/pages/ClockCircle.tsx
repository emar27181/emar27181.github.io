import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ClockCircle() {
  const sketch = (p: P5CanvasInstance) => {
    const white = p.color('#ffffff'); //描画色1(白)
    const gray = p.color('#808080');
    const darkgray = p.color('#333333');
    const black = p.color("#000000"); //描画色2(黒)

    p.setup = () => {
      p.createCanvas(512, 512); //キャンバスの作成
      p.background("#000000"); // 背景色を設定(黒)
      //p.noStroke(); // 線なし（塗りつぶしのみ）に設定
    };

    let preHours = -1;
    let preMinutes = -1;
    let preSeconds = -1;

    let isHoursChanged = false;
    let isMinutesChanged = false;
    let isSecondsChanged = false;

    let isFirst = true;

    let preX = 0, preY = 0;

    p.draw = () => {
      p.frameRate(1);

      let time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

      //console.log("preHours: " + preHours + ", time.getHours(): " + time.getHours() + ", isHoursChanged: " + isHoursChanged);
      // console.log("isFirst: " + isFirst);

      const hoursSize = 30;
      const minutesSize = 20;
      const secondsSize = 10;


      if (preHours != time.getHours()) {
        isHoursChanged = true;
        preHours = time.getHours();
        p.fill(white);
        p.ellipse(p.width * Math.random(), p.height * Math.random(), hoursSize, hoursSize);
      }
      if (preMinutes != time.getMinutes()) {
        isMinutesChanged = true;
        preMinutes = time.getMinutes();
        p.fill(gray);
        p.ellipse(p.width * Math.random(), p.height * Math.random(), minutesSize, minutesSize);
      }
      if (preSeconds != time.getSeconds()) {
        isSecondsChanged = true;
        // console.log("preSeconds: " + preSeconds + ", time.getSeconds: " + time.getSeconds() + ", isSecondsChanged: " + isSecondsChanged);
        preSeconds = time.getSeconds();
        p.fill(darkgray);
        //何故か白色で描画されてしまう
        p.ellipse(p.width * Math.random(), p.height * Math.random(), secondsSize, secondsSize);

      }

      //再読み込み(12時間, 60分, 60秒間隔)
      // 60秒おきに再生成されてしまうため、hoursとminutesが増えていく様子を描画できていない
      if (isFirst === true || (hours % 12 === 0 && minutes === 0 && seconds === 0) ||
        (minutes === 0 && seconds === 0) || seconds === 0) {
        p.fill(black);
        p.rect(0, 0, p.width, p.height);

        p.fill(white);
        for (let i = 0; i < hours; i++) {
          p.ellipse(p.width * Math.random(), p.height * Math.random(), hoursSize, hoursSize);
        }
        isHoursChanged = false;

        p.fill(gray);
        for (let i = 0; i < minutes; i++) {
          p.ellipse(p.width * Math.random(), p.height * Math.random(), minutesSize, minutesSize);
        }
        isMinutesChanged = false;

        p.fill(darkgray);
        for (let i = 0; i < seconds; i++) {
          p.ellipse(p.width * Math.random(), p.height * Math.random(), secondsSize, secondsSize);
        }
        isSecondsChanged = false;

        isFirst = false;
      }
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockCircle