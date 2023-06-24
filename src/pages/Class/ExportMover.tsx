import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const X = 10, Y = 10;

export function ExportMover() {
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

  console.log("This is ExportMover.tsx");

  return (
    <div></div>
  )
}

export default ExportMover