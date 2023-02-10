import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Clock() {
  const sketch = (p: P5CanvasInstance) => {
    const white = p.color("#ffffff"); //描画色1(白)
    const black = p.color("#000000"); //描画色2(黒)
    let color1amount = 1; // 描画色1の強さ


    p.setup = () => {
      p.createCanvas(512, 512); //キャンバスの作成
      p.background(black); // 背景色を設定(黒)
      p.noStroke(); // 線なし（塗りつぶしのみ）に設定
      p.frameRate(1);

    };

    //let x = width / 2, y = height / 2, v = 1, dx = v, dy = v;
    let x = 256, y = 256, v = 1, dx = v, dy = v, isFirst = false;

    p.draw = () => {
      if (isFirst === false) {
        p.fill(white);
        p.ellipse(p.width/2, p.height/2, p.width, p.height);
        isFirst = true;
      }

      p.fill(black);

    p.translate(p.width / 2, p.height / 2); // 画面中央を原点に
      p.rotate(p.frameCount * 13);  // フレーム数分（1フレームあたり13度）回転させる
      p.ellipse(p.frameCount / 100, 0, p.frameCount, p.frameCount); // 楕円を描く

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

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Clock