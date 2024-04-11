import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import Ball from '../utils/Ball';

export function DrawBallsLine() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let balls: Array<Ball> = [];



    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      initializeVariables();
    };

    p.draw = () => {
      p.fill(255);
      drawBalls();
      updateVariables();
    };

    function drawBalls() {
      for (let i = 0; i < balls.length; i++) {
        p.ellipse(balls[i].x, balls[i].y, 10);
      }
    }

    function updateVariables() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].move();
      }
    }

    function initializeVariables() {
      for (let i = 0; i < 10; i++) {
        balls.push(new Ball(i * 3, i * 3));
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DrawBallsLine