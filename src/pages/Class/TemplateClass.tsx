import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const X = 10, Y = 10;

export function TemplateClass() {
  class XY {
    x: number = X;
    y: number = Y;

    constructor(inputX: number, inputY: number) {
      this.x = inputX;
      this.y = inputY;
    }

    printXY() {
      console.log("this.x: " + this.x + ", this.y: " + this.y);
    }
  }

  let instanceXY = new XY(20, 20);
  instanceXY.printXY();

  return (
    <div></div>
  )
}

export default TemplateClass