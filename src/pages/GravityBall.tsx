import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';

export function GravityBall() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let drawingWeight = 10;
    let balls: Array<Ball> = [];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);

      for (let i = 0; i < 5; i++) {
        let ball = new Ball(i, 0);
        balls.push(ball);
      }
    };

    p.draw = () => {
      p.fill(255);
      p.background(0);
      //p.ellipse(p.width / 2, p.height / 2, 100, 100);

      

      for (let ball of balls) {
        if (p.mouseIsPressed) {
          moveBall(ball);
        }
        ball.update();
        ball.display();
      }
    };

    function moveBall(ball: Ball) {

      let gravity = p.createVector(p.mouseX, p.mouseY);
      gravity.sub(ball.position);
      let distanceSq = gravity.magSq();
      distanceSq = p.constrain(distanceSq, 10, 1000); // 距離が0になるのを防止
      let strength = 5 / distanceSq; // 引力の強さ
      gravity.setMag(strength);
      ball.applyForce(gravity);
    }

    //移動体の自作クラス
    class Ball {
      position: p5.Vector;
      velocity: p5.Vector;
      acceleration: p5.Vector;
      radius: number;
      mass: number;

      constructor(x: number, y: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.radius = drawingWeight;
        this.mass = 1;
      }

      applyForce(force: p5.Vector) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.velocity.mult(0.99);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display() {
        p.noStroke();
        p.fill(255);
        p.ellipse(this.position.x, this.position.y, 2 * this.radius);
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default GravityBall