import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const CANVAS_SIZE = 512;

export function ClockCircle() {
  const sketch = (p: P5CanvasInstance) => {
    const white = p.color('#ffffff'); //描画色1(白)
    const gray = p.color('#808080');
    const darkgray = p.color('#333333');
    const black = p.color("#000000"); //描画色2(黒)

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE); //キャンバスの作成
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

    let preX = CANVAS_SIZE / 2, preY = CANVAS_SIZE / 2;

    p.draw = () => {
      p.frameRate(1);

      let time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

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
        preSeconds = time.getSeconds();

        let x = 0, y = 0;

        // while (true) {
        let dx = 2 * secondsSize * p.random() - secondsSize;
        let dy = p.sqrt(4 * secondsSize * secondsSize - dx * dx);
        if (p.random() > 0.5) { dy = -dy; }
        x = preX + dx / 2;
        y = preY + dy / 2;

        console.log("preX: " + preX + ", preY: " + preY + ",\n dx: " + dx + ", dy: " + dy + ",\n x: " + x + ", y: " + y);
        console.log("distance: " + p.sqrt(dx * dx + dy * dy));
        /*
          let r = secondsSize;
          let canBePainted = true;
          for (let i = x - r; i < x + r; i++) {
            for (let j = y - r; j < y + r; j++) {
              let distance = p.sqrt((x - i) * (x - i) + (y - j) * (y - j));
              if (distance < r) {
                let color = p.get(i, j); //塗られていない場合、color[0] = 0となる
                if (color[0] != 0) { canBePainted = false;}
              }
            }
          }
          if (canBePainted) {
            break;
          }
          */
        //}

        p.fill(darkgray);
        p.ellipse(x, y, secondsSize, secondsSize);

        preX = x;
        preY = y;

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