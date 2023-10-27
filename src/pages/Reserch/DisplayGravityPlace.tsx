import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { ReturnCanvasSize, ReturnGravityX, ReturnGravityY, ReturnIsFixedGravity, ReturnIsMouseGravity, ReturnMouseXY } from './Canvas';
import { TestHandsfree, ReturnTrackingData } from '../TestHandsfree';

export function DisplayGravityPlace() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let isFixedGravity = ReturnIsFixedGravity();
    let gravityX: number[] = [];
    let gravityY: number[] = [];
    let canvasSize = ReturnCanvasSize();
    let canvasWidth = canvasSize[0];
    let canvasHeight = canvasSize[1];
    let mouse = ReturnMouseXY();
    let mouseX = mouse[0];
    let mouseY = mouse[1];
    let isMouseGravity = ReturnIsMouseGravity();

    /*
    let trackignData = ReturnTrackingData(); //このコードを実行すると画面が描画されなくなってしまう(2023/10/27)
    let trackignX = trackignData[0];
    let trackignY = trackignData[1];
    console.log(trackignX, trackignY);
    */


    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      //console.log(trackignData);
    };

    p.draw = () => {
      p.background(0);
      UpdateVariables();

      for (let i = 0; i < gravityX.length; i++) {
        setColor(isFixedGravity);
        DrawGravityPlace(gravityX[i], gravityY[i]);
      }

      setColor(isMouseGravity);
      DrawGravityPlace(mouseX, mouseY);

    };

    function setColor(isColor: boolean) {
      if (isColor) { p.fill(255, 0, 0); }
      else { p.fill(255); }
    }

    function DrawGravityPlace(inputX: number, inputY: number) {
      let x = inputX * (p.width / canvasWidth);
      let y = inputY * (p.height / canvasHeight);
      p.ellipse(x, y, 5);
    }

    function UpdateVariables() {
      isFixedGravity = ReturnIsFixedGravity();
      gravityX = ReturnGravityX();
      gravityY = ReturnGravityY();
      canvasSize = ReturnCanvasSize();
      canvasWidth = canvasSize[0];
      canvasHeight = canvasSize[1];
      mouse = ReturnMouseXY();
      mouseX = mouse[0];
      mouseY = mouse[1];
      isMouseGravity = ReturnIsMouseGravity();
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayGravityPlace