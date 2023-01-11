import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function LineGame() {
  const sketch = (p: P5CanvasInstance) => {

    //色の指定

    const colorBackGround = ("#000000");
    const color1 = p.color("#ffffff"); //描画色1(白)

    /** 初期化処理 */
    p.setup = () => {
      //デフォルト値(?)一覧
      //p.windowWidth: 464
      //p.windowHeight: 464
      //p.width: 464
      //p.height: 648
      p.createCanvas(256, 256); //キャンバスの作成
      p.background(colorBackGround); // 背景色を設定(黒)
      //p.background("#ffffff"); // 背景色を設定(白)
      p.noStroke(); // 線なし（塗りつぶしのみ）に設定
      p.noCursor();
    };

    let ballSize = 10;
    let v = 3;
    let x = 10, y = 0, dx = v, dy = v;
    let isDotMode = true;

    /** フレームごとの描画処理 */
    p.draw = () => {
      //WASD操作
      if (p.keyIsPressed) {
        if (p.key === 'W' || p.key === 'w') { dx = 0; dy = -v; }
        else if (p.key === 'A' || p.key === 'a') { dx = -v; dy = 0; }
        else if (p.key === 'S' || p.key === 's') { dx = 0; dy = v; }
        else if (p.key === 'D' || p.key === 'd') { dx = v; dy = 0; }
        else if (p.key === 'C' || p.key === 'c') { dx = v; dy = v; }
        else if (p.key === 'Z' || p.key === 'z') { dx = -v; dy = v; }
        else if (p.key === 'E' || p.key === 'e') { dx = v; dy = -v; }
        else if (p.key === 'Q' || p.key === 'q') { dx = -v; dy = -v; }
        else if (p.key === 'K' || p.key === 'k') {
          if (isDotMode === true) { isDotMode = false; }
          else { isDotMode = true; }
        }
      }




      //一定確率で進路変更(未実装)
      let random10 = p.random(10);
      let random4 = Math.round(p.random(4));
      if (random10 <= 2) { //20%の確率で実行
        //direction = Math.floor(random4); //進路の変更
        /*
        switch (random4) {
          case 0:
            dx = 0; dy = -v;
          case 1:
            dx = -v; dy = 0;
          case 2:
            dx = 0; dy = v;
          case 3:
            dx = v; dy = 0;
        }
        */
      }

      //背景の描画
      if (isDotMode) {
        p.fill(colorBackGround);
        p.rect(0, 0, p.width, p.height);
      }
      //壁の描画
      p.fill(color1);
      p.rect(p.mouseX, p.mouseY, 30, 10);

      x += dx;
      y += dy;

      //次の座標が通過済みだった場合反射
      //背景は黒なので、通ってないと(0,0,0,255)がその点に入っている
      let nextColorX = p.get(x + dx, y);
      let nextColorY = p.get(x, y + dy);

      //if (nextColor != (0, 0, 0, 255)) { v = -v;}
      //if (nextColor != colorBackGround) { }
      if (nextColorX[0] != 0) { dx = -dx; }
      else if (nextColorY[0] != 0) { dy = -dy; }

      if (x > p.width || x < 0) {
        dx = -dx;
      }
      else if (y > p.height || y < 0) {
        dy = -dy;
      }

      //ボールの描画
      p.fill(color1); // 塗り色の設定
      p.ellipse(x, y, ballSize);

      //データ表示バーの描画

      p.fill("#cccccc");
      p.rect(0, p.height - 10, p.width, p.height);
      p.fill(colorBackGround);
      //p.text("(" + Math.floor(x) + ", " + Math.floor(y) + ")", 0, p.height);
      //p.text("(" + Math.floor(x) + ", " + Math.floor(y) + ") p.width: " + p.width + ", p.windowWidth: " + p.windowWidth, 0, p.height);

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default LineGame