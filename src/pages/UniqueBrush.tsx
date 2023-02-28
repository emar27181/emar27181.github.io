import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function UniqueBrush() {
  const sketch = (p: P5CanvasInstance) => {
    //色の指定
    const color1 = p.color("#ffffff"); //描画色1(白)
    const color2 = p.color("#000000"); //描画色2(黒)
    let color1amount = 1; // 描画色1の強さ

    /** 初期化処理 */
    p.setup = () => {
      //デフォルト値一覧
      //p.windowWidth: 464
      //p.windowHeight: 464
      //p.width: 464
      //p.height: 648
      p.createCanvas(512, 512); //キャンバスの作成
      p.background("#000000"); // 背景色を設定(白)
      p.noStroke(); // 線なし（塗りつぶしのみ）に設定
    };

    let x = 0, y = 0, r = 0;
    let blushSize = 20, blushMode = 2, eraserSize = 30;
    let colorPen = "#000000", colorCheck = 0;

    /** フレームごとの描画処理 */
    p.draw = () => {
      p.fill("ffffff");

      //ランダムカラーの生成と宣言
      var color = (Math.random() * 0xFFFFFF | 0).toString(16);
      var randomColor = "#" + ("000000" + color).slice(-6);
      var colorRandom = p.color(randomColor);
      var mul = 5;

      //ブラシの描画
      if (p.mouseIsPressed) {
        switch (blushMode) {
          case 0: //消しゴムモード
            p.fill("#000000");
            p.ellipse(p.mouseX, p.mouseY, blushSize);
            break;
          case 1: //ブラシモード(通常)
            p.fill(colorPen);
            p.ellipse(p.mouseX, p.mouseY, blushSize);
            break;
          case 2: //ブラシモード(ランダムカラー)
            //xRand: -(blushSize/2)~blushSize/2までのランダムな整数
            let xRand = Math.floor(p.random(blushSize)) - blushSize / 2;
            let yRand = Math.floor(p.random(blushSize)) - blushSize / 2;
            x = p.mouseX + xRand;
            y = p.mouseY + yRand;
            p.fill(colorRandom);
            p.rect(x, y, mul * Math.random(), mul * Math.random());
            break;
          case 3: //ブラシモード(組み合わせブラシ)
            p.fill("red");
            p.rect(p.mouseX, p.mouseY, blushSize / 4, blushSize);
            p.fill("white");
            p.rect(p.mouseX, p.mouseY + blushSize / 2, blushSize / 4, blushSize / 4);
            break;

          default:
            break;
        }
      }

      //モード変更
      if (p.keyIsPressed) {
        switch (p.key) {
          case 'e':
            blushMode = 0;
            break;
          case '1':
            blushMode = 1;
            break;
          case '2':
            blushMode = 2;
            break;
          case '3':
            blushMode = 3;
            break;
          case '4':
            blushMode = 4;
            break;
          case '5':
            blushMode = 5;
            break;

          case '-':
            blushSize -= 0.3;
            break;
          case '+':
            blushSize += 0.3;
            break;
          case 'c':
            colorCheck += 0.25;
            //if (p.keyIsPressed) { colorCheck++; }
            if (Math.floor(colorCheck) % 4 === 0) { colorPen = "#ffffff" }
            else if (Math.floor(colorCheck % 4) === 1) { colorPen = "#444444" }
            else if (Math.floor(colorCheck % 4) === 2) { colorPen = "#888888" }
            else if (Math.floor(colorCheck % 4) === 3) { colorPen = "#cccccc" }
            break;

          default:
            break;
        }
      }


      //データ表示バーの描画
      p.fill("#cccccc");
      p.rect(0, p.height - 10, p.width, p.height);
      p.fill("#000000");
      p.text("(" + Math.floor(p.mouseX) + ", " + Math.floor(p.mouseY) + "), mode: " + blushMode +
        ", size: " + Math.floor(blushSize) + ", color(Pen): " + colorPen, 0, p.height);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )

}

export default UniqueBrush