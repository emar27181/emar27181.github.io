import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Element } from 'p5';

export function Camera() {
  const sketch = (p: P5CanvasInstance) => {

    let capture: Element;

    p.setup = () => {
      p.createCanvas(512, 512);
      capture = p.createCapture(p.VIDEO);
      capture.hide();
      p.frameRate(1);
    };

    p.draw = () => {
      p.background(220);
      let img = capture.get();
      p.image(img, 0, 0);

      
      
      /*
      //読み込みを行うと重すぎて画面が固まってしまう
      for (let i = 0; i < p.width; i++) {
        for(let j = 0; j < p.height; j++){
          let getColor = p.get(i,j);
          p.fill(getColor[0] + 10 , getColor[1] + 10, getColor[2] + 10, getColor[3]);
          p.rect(i, j, 1, 1);
        }
      }
      */

      
      
      
      let getColor = p.get(p.width/2, p.height/2);
      console.log(getColor);
      console.log(getColor[0]);
      

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Camera