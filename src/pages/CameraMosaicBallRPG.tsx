import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraMosaicBallRPG() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
      p.background(255);
    };

    const MENU_BAR_HEIGHT = 30;
    let x = 0, y = 0, dx = 4, dy = 2;
    let hp = 100;

    p.draw = () => {
      let img = capture.get();
      p.image(img, 0, 0);

      //フィールドの生成
      for (let i = 0; i < p.width; i += 10) {
        for (let j = 0; j < p.height; j += 10) {
          let getColor = p.get(i, j);
          let v = getColor[0];
          if (getColor[1] > v) { v = getColor[1]; }
          if (getColor[2] > v) { v = getColor[2]; }

          if (getColor[0] > 200) { p.fill(255, 255, 0); }
          else if (getColor[1] > 200) { p.fill(255, 0, 0); }
          else if (v > 128) { p.fill(0, 255, 0); }
          else { p.fill(0, 0, 255); }
          p.rect(i, j, 10, 10);
        }
      }

      //プレイヤーの生成
      let nextColorX = p.get(x + dx, y);
      let nextColorY = p.get(x, y + dy);
      if (nextColorX[2] != 0) { dx = -dx; }
      else if (nextColorY[2] != 0) { dy = -dy; }
      if (x > p.width || x < 0) { dx = -dx; }
      else if (y > p.height - MENU_BAR_HEIGHT || y < 0) { dy = -dy; }

      //HP管理
      let nextColor = p.get(x + dx, y + dy);
      console.log("nextColor: " + nextColor);
      if (nextColor[0] === 0 && nextColor[1] === 0 && nextColor[2] === 255) {
        if(hp < 0){console.log("GAME OVER");}
        else{hp--;}
      }
      else if (nextColor[0] === 255 && nextColor[1] === 0 &&nextColor[2] === 0) {
        if(hp < 100){hp++;}
      }

      x += dx;
      y += dy;
      p.fill(255, 128, 0);
      p.rect(x, y, 10, 10);
      console.log("x: " + x + " y: " + y);

      //ダメージ判定の作成
      let CurrentColor = p.get(x, y);
      console.log("Current Color: " + CurrentColor);
      if(CurrentColor[0] === 0 && CurrentColor[1] === 0 && CurrentColor[2] === 255){
        hp--;
      }

      //メニューバーの生成
      p.fill(255);
      p.rect(0, p.width - MENU_BAR_HEIGHT, p.width, MENU_BAR_HEIGHT);
      p.fill(0);
      p.text("HP: " + hp, 0, p.height - 15);

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraMosaicBallRPG