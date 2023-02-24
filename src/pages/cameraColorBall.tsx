import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function CameraColorBall() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.noStroke();
      //p.frameRate(1);
    };

    let x = 100, y = 100, dx = 20, dy = 10;

    p.draw = () => {
      let img = capture.get();
      p.image(img, p.width-1, p.height-1);

      //読み込みを行うと重すぎて画面が固まってしまう
      /*
      for (let i = 0; i < p.width; i++) {
        for(let j = 0; j < p.height; j++){
          let getColor = p.get(i,j);
          p.fill(getColor[0]  , getColor[1] , getColor[2] , 0);
          //console.log("[0]: " + getColor[0] + ", [1]: " + getColor[1] + ", [2]: " + getColor[2]+ ", [3]: " + getColor[3]);
          //p.rect(i, j, 1, 1);
        }
      }
      */
      
      let getColor = p.get(p.width-1, p.height-1);
      console.log(getColor);
      p.fill(getColor);

      x += dx;
      y += dy;
      if(x < 0 || x > p.width){ dx = -dx;}
      if(y < 0 || y > p.height){ dy = -dy;}


      p.ellipse(x, y, 30, 30);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraColorBall