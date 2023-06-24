
import '../../App.css'
import React from 'react';

export function ExportColorOfEmotion() {
  class ColorOfEmotion {
    hue: number;
    intense: number;
    drawNum: number;

    constructor(hue: number, intense: number, drawNum: number) {
      this.hue = hue;
      this.intense = intense;
      this.drawNum = drawNum;
    }
  }

  //console.log("This is ExportColorOfEmotion");

  return (
    <div></div>
  )
}

export default ExportColorOfEmotion;
