import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import Ball from '../utils/Ball';

export let canvasWidth = 0, canvasHeight = 0;

export function DrawBallsLine() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let balls: Array<Ball> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      initializeVariables();
      p.noStroke();
    };

    p.draw = () => {
      p.background(0, 0, 0, 10);
      drawBalls();
      updateVariables();
    };

    function drawBalls() {
      for (let i = 0; i < balls.length; i++) {
        p.fill(balls[i].color);
        p.ellipse(balls[i].x, balls[i].y, 3);
      }
    }

    function updateVariables() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].refrect();
      }
    }

    function initializeVariables() {
      canvasWidth = p.width;
      canvasHeight = p.height;

      for (let i = 0; i < 100; i++) {

        let rand = p.random();
        let color = p.color(0, 0, 0);
        if (rand < 1 / 3) { color = p.color(255, 0, 0); }
        else if (rand < 2 / 3) { color = p.color(0, 255, 0); }
        else { color = p.color(0, 0, 255); }

        balls.push(new Ball(p.random(0, p.width), p.random(0, p.height), p.random(-5, 5), p.random(-5, 5), color));
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DrawBallsLine