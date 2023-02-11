import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Font } from 'p5';

export function Clock() {
  const sketch = (p: P5CanvasInstance) => {
    const white = p.color("#ffffff"); //描画色1(白)
    const black = p.color("#000000"); //描画色2(黒)
    let color1amount = 1; // 描画色1の強さ

    let font: Font;

    function preload() {
      font = p.loadFont('../assets/misaki_gothic.tff');
    }

    p.setup = () => {
      p.createCanvas(768, 512); //キャンバスの作成
      p.background(black); // 背景色を設定(黒)
      p.noStroke(); // 線なし（塗りつぶしのみ）に設定

      //p.textFont(font);
      //p.textFont('Arial');
    };

    //let x = width / 2, y = height / 2, v = 1, dx = v, dy = v;
    let x = 256, y = 256, v = 1, dx = v, dy = v, isFirst = true;

    p.draw = () => {

      p.fill(white);

      /*
      if (isFirst === true) {
        p.fill(white);
        p.ellipse(p.width / 2, p.height / 2, p.width, p.height);
        // isFirst = false;
      }

      p.translate(p.width / 2, p.height / 2); // 画面中央を原点に
      p.rotate(p.frameCount * 13);  // フレーム数分（1フレームあたり13度）回転させる
      p.ellipse(p.frameCount / 100, 0, p.frameCount, p.frameCount); // 楕円を描く
      */

      p.fill(black);
      p.rect(0, 0, p.width, p.height);

      p.fill(white);
      let time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

      //Tokyo
      let str = getTimeStr(hours % 24, minutes, seconds);
      p.textSize(20);
      p.text(str, 384, 128);

      //London
      p.textSize(15);
      hours = time.getHours() - 9;
      str = getTimeStr(hours % 24, minutes, seconds);
      p.text(str, 96, 128);

      //NewYork
      hours = time.getHours() - 14;
      str = getTimeStr(hours % 24, minutes, seconds);
      p.text(str, 700, 128);

      //Sydney
      hours = time.getHours() + 1;
      str = getTimeStr(hours % 24, minutes, seconds);
      p.text(str, 400, 400);

      //Soul???
      hours = time.getHours() - 1;
      str = getTimeStr(hours % 24, minutes, seconds);
      p.text(str, 350, 100);

      //yohanesVrog???
      hours = time.getHours() - 7;
      str = getTimeStr(hours % 24, minutes, seconds);
      p.text(str, 120, 400);




      /*
      x += dx;
      if (x < 0 || x > p.width) {
        dx = -dx;
        y += dy;
      }
      p.fill(black);
      p.ellipse(x, y, v, v);

      console.log("(x, y): (" + x + ",  " + y + ")");
      */

    };
  }

  let hoursString: string, minutesString: string, secondsString: string;
  function getTimeStr(hours: number, minutes: number, seconds: number) {
    if (hours < 10) hoursString = "0" + String(hours);
    else { hoursString = String(hours); }
    if (minutes < 10) minutesString = "0" + String(minutes);
    else { minutesString = String(minutes); }
    if (seconds < 10) secondsString = "0" + String(seconds);
    else { secondsString = String(seconds); }
    var str = hoursString + ":" + minutesString + ":" + secondsString;
    return str;
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Clock