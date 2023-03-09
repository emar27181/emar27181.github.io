import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function Preparation() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0); 
    };

    let x = 0, y = 0 , dx = 4, dy = 3;

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.textSize(40);
      p.text("現在準備中", p.width/2 - 90, p.height/2);


      //次の座標が通過済みだった場合反射
      //背景は黒なので、通ってないと(0,0,0,255)がその点に入っている
      let nextColorX = p.get(x + dx, y);
      let nextColorY = p.get(x, y + dy);

      //if (nextColor != (0, 0, 0, 255)) { v = -v;}
      //if (nextColor != colorBackGround) { }
      if (nextColorX[0] != 0) { dx = -dx; }
      else if (nextColorY[0] != 0) { dy = -dy; }
      if (x > p.width || x < 0) {dx = -dx;}
      else if (y > p.height || y < 0) {dy = -dy;}

      x += dx;
      y += dy;

      p.ellipse(x, y, 10, 10);

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Preparation