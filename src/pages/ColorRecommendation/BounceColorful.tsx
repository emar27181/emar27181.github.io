import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Vector, Color } from 'p5';

const DEBUG = true, FPS = 1, NUM_MOVERS = 30;

export function BounceColorful() {
  const sketch = (p: P5CanvasInstance) => {
    //let movers = []; // Moverオブジェクトを格納する配列
    let movers: Mover[] = [];
    let numMovers = NUM_MOVERS; // Moverオブジェクトの数
    let angle = 0; // 円運動の角度
    let radius = 0; // 円運動の半径
    let speed = 1; // 円運動のスピード

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      if (DEBUG) { p.frameRate(FPS); }
      p.colorMode(p.HSB, 360, 100, 100, 100);
      for (let i = 0; i < numMovers; i++) {
        movers[i] = new Mover(p.random(p.width), p.random(p.height));
      }
    }

    p.draw = () => {
      p.background(0, 0, 0, 15);
      angle += speed; // 円運動の角度を更新
      let x = p.width / 2 + p.cos(angle) * radius; // 中心座標の計算
      let y = p.height / 2 + p.sin(angle) * radius;
      for (let i = 0; i < numMovers; i++) {
        let m = movers[i];
        let d = p.dist(m.position.x, m.position.y, x, y); // 中心座標との距離を計算
        let speed = p.map(d, 0, radius, 10, 0); // 距離に応じて速度を変化させる
        let angle = p.atan2(y - m.position.y, x - m.position.x); // 中心座標との角度を計算
        m.applyForce(p.createVector(p.cos(angle), p.sin(angle)).mult(speed)); // 力を加える
        m.update(); // 位置を更新する
        m.display(); // 描画する
      }
    }

    class Mover {
      position: Vector;
      velocity: Vector;
      acceleration: Vector;
      mass: number;
      color: Color;

      constructor(x: number, y: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.mass = p.random(4, 4);
        this.color = p.color(p.random(360), 80, 100, 255);
      }

      applyForce(force: Vector) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display() {
        p.fill(this.color);
        p.noStroke();
        p.ellipse(this.position.x, this.position.y, this.mass * 10, this.mass * 10);
      }
    }

  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BounceColorful