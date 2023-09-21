import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ControlGravityField() {
  
  const sketch = (p: P5CanvasInstance) => {
    /*
    let isBackground = true,
      isSymmetry = false,
      isOneGravity = false,
      isGravityMove = true,
      isMouseOperation = false,
      isDisplayHandPointer = true,
      debug = false;
    const G = 0.5,
      MASS = 1,
      GRAVITY_VIEW_SIZE = 3,
      MOVERS_NUM = 1000,
      GARAVITY_NUM = 10,
      MOVERS_MASS_MIN = 5,
      MOVERS_MASS_MAX = 5,
      MOVERS_VIEW_SIZE = 3,
      CANVAS_SIZE = 1024,
      X_GEN_INIT = CANVAS_SIZE / 2,
      Y_GEN_INIT = CANVAS_SIZE / 2,
      X1_INIT = CANVAS_SIZE / 2,
      Y1_INIT = CANVAS_SIZE / 2 - 10,
      X2_INIT = CANVAS_SIZE / 2,
      Y2_INIT = CANVAS_SIZE / 2 + 100,
      ALPHA = 3;

    class GravityField {
      constructor(x: number, y: number, mass: number) {
        this.position = p.createVector(x, y);
        this.mass = mass;
        this.G = G; // 引力定数
      }

      attract(mover) {
        // 質量と距離に応じた引力を計算
        let force = p5.Vector.sub(this.position, mover.position);
        let distanceSq = force.magSq();
        distanceSq = p.constrain(distanceSq, 1, 500); // 距離が0になるのを防止
        let strength = (this.G * this.mass * mover.mass) / distanceSq;
        force.setMag(strength);

        // 移動体に引力を適用
        mover.applyForce(force);
      }

      display() {
        // 重力場を表示
        p.noStroke();
        //stroke("red");

        p.fill(255, 0, 0);
        if (isDisplayHandPointer) {
          p.ellipse(
            this.position.x,
            this.position.y,
            GRAVITY_VIEW_SIZE,
            GRAVITY_VIEW_SIZE
          );
        }
      }
    }

    class Mover {
      constructor(x: number, y: number, mass: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector();
        this.acceleration = p.createVector();
        this.mass = mass;
      }

      applyForce(force: Vector) { //←あってるかわからんち
        // 移動体に力を適用
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
      }

      update() {
        // 速度と位置を更新
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }

      display() {
        // 移動体を表示
        //stroke(255);
        //strokeWeight(2);
        p.noStroke();
        p.fill(255, 50);
        p.ellipse(
          this.position.x,
          this.position.y,
          MOVERS_VIEW_SIZE,
          MOVERS_VIEW_SIZE
        );
      }
    }

    let fields = [];
    let movers = [];

    function setup() {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      //createCanvas(windowWidth, windowHeight);
      p.background(0);

      p.strokeWeight(10);

      for (let i = 0; i < 2; i++) {
        fields.push(new GravityField(X_GEN_INIT, Y_GEN_INIT, MASS));
      }

      // 移動体を生成
      for (let i = 0; i < MOVERS_NUM; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        let mass = p.random(MOVERS_MASS_MIN, MOVERS_MASS_MAX);
        movers.push(new Mover(x, y, mass));
      }
    }

    function draw() {
      if (isBackground) {
        p.background(0, 0, 0, ALPHA);
      }

      if (handsfree.data.hands) {
        if (handsfree.data.hands.multiHandLandmarks) {
          var landmarks = handsfree.data.hands.multiHandLandmarks;
          var nHands = landmarks.length;

          if (nHands >= 2) {
            let x1 = landmarks[0][8].x;
            let y1 = landmarks[0][8].y;
            let x2 = landmarks[1][8].x;
            let y2 = landmarks[1][8].y;

            x1 = p.map(x1, 0, 1, p.width, 0);
            y1 = p.map(y1, 0, 1, 0, p.height);
            x2 = p.map(x2, 0, 1, p.width, 0);
            y2 = p.map(y2, 0, 1, 0, p.height);

            if (isGravityMove) {
              fields[0].position.x = x1;
              fields[0].position.y = y1;
            } else {
              fields[0].position.x = X1_INIT;
              fields[0].position.y = Y1_INIT;
            }

            let diffX = p.width / 2 - fields[0].position.x;
            let diffY = p.height / 2 - fields[0].position.y;

            //if(debug){console.log("diffX: " + diffX);}

            if (isSymmetry) {
              fields[1].position.x = p.width / 2 - diffX;
              fields[1].position.y = y1;
            } else if (!isGravityMove) {
              fields[1].position.x = X2_INIT;
              fields[1].position.y = Y2_INIT;
            } else if (isOneGravity) {
              fields[1].position.x = fields[0].position.x;
              fields[1].position.y = fields[0].position.y;
            } else {
              fields[1].position.x = x2;
              fields[1].position.y = y2;
            }
          }
        }
      }

      if (isMouseOperation) {
        fields[0].position.x = p.mouseX;
        fields[1].position.x = p.mouseX;
        fields[0].position.y = p.mouseY;
        fields[1].position.y = p.mouseY;
      }

      if (debug) {
        console.log(
          "f0.x: " +
          p.round(fields[0].position.x) +
          ", f0.y: " +
          p.round(fields[0].position.y) +
          ", f1.x: " +
          p.round(fields[1].position.x) +
          ", f1.y: " +
          p.round(fields[1].position.y)
        );
      }

      // 重力場を表示
      for (let field of fields) {
        field.display();
      }

      // 移動体に重力を適用し、表示
      for (let mover of movers) {
        for (let field of fields) {
          field.attract(mover);
        }
        mover.update();
        mover.display();
      }
    }

*/
    /*
    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    
    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0); 
    };

    p.draw = () => {
      p.fill(255); 
      p.ellipse(p.width / 2, p.height / 2, 100, 100); 
    };
    */
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ControlGravityField