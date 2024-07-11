import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function RandomGenerativeLine() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    let circles: Array<Circle> = [];
    const MIN_DIST = 1000, CIRCLE_NUM = 3, CIRCLE_SIZE = 0, FRAME_RATE = 6;
    const SPEED_MIN = 20, SPEED_MAX = 20, ALPHA = 40;

    p.setup = () => {
      p.createCanvas(0.6 * window.innerWidth, 0.08 * window.innerWidth);
      p.frameRate(FRAME_RATE);
      p.background(0);

      // サイズ、位置をランダムに生成する10個の円を生成する
      for (let i = 0; i < CIRCLE_NUM; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        let size = p.random(20, 50);
        let speed = p.random(SPEED_MIN, SPEED_MAX);
        let angle = p.random(p.TWO_PI);
        let circle = new Circle(x, y, size, speed, angle);
        circles.push(circle);
      }
    };

    p.draw = () => {
      p.background(0, 0, 0, ALPHA);
      p.stroke(255);

      // 各円を表示する
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];

        // 円を描画する

        p.ellipse(circle.x, circle.y, CIRCLE_SIZE);

        // 他の円との距離が一定以下の場合、線で結ぶ
        for (let j = 0; j < circles.length; j++) {
          if (i !== j) {
            let other = circles[j];
            let distance = p.dist(circle.x, circle.y, other.x, other.y);

            if (distance < MIN_DIST) {
              p.stroke(255);
              p.strokeWeight(1);
              p.line(circle.x, circle.y, other.x, other.y);
            }
          }
        }

        // 円を移動する
        circle.move();

      }
    };

    class Circle {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      color;

      constructor(x: number, y: number, size: number, speed: number, angle: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.angle = angle;
        this.color = p.color(255, 0, 0);
      }

      move() {
        // 円を移動する
        this.x += p.cos(this.angle) * this.speed;
        this.y += p.sin(this.angle) * this.speed;

        // 壁に当たった場合、反射する
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > p.width) {
          this.angle = p.PI - this.angle;
        }
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > p.height) {
          this.angle = -this.angle;
        }
      }

    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default RandomGenerativeLine