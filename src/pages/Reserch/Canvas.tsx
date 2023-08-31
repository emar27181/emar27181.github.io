/*このプログラムは研究用のキャンバスを提示するプログラムです
  作成日: 2023/08/31 
*/

import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const IS_NO_STROKE = true;

export function Canvas() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    
    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0); 
      if(IS_NO_STROKE){p.noStroke();}
    };

    p.draw = () => {
      p.fill(255); 

      //p.ellipse(p.width / 2, p.height / 2, 100, 100); 
      p.ellipse(p.mouseX, p.mouseY, 10, 10); 
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Canvas