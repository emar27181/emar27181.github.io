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

      if (p.keyIsPressed){KeyboardControl(p.key);}
      if (p.mouseIsPressed) { MouseControl(); }
      displayMenuBar();
    };
    function displayMenuBar (){
      p.textSize(textSize);
      p.fill("#cccccc");
      p.rect(0, p.height - textSize, p.width, p.height);
      p.fill("#000000");
      p.text("(" + Math.floor(p.mouseX) + ", " + Math.floor(p.mouseY) + 
        "), size: " + Math.floor(drawingWeight) , 0, p.height);
    }

    function MouseControl (){
      p.ellipse(p.mouseX, p.mouseY, drawingWeight, drawingWeight);
    }

    function KeyboardControl (inputKey: string){
      if(inputKey === "+"){ drawingWeight++;}
      if(inputKey === "-"){ drawingWeight--;}
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Canvas