//この作品は以下のリンクのデモを参考に制作しています。
//https://editor.p5js.org/golan/sketches/QSlJYNpXY
//handsfree.js-demo by golan
import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';

let handsfree;

//------------------------------------------
function setup() {
  createCanvas(640, 480);
  handsfree = new Handsfree({
    showDebug: true,
    hands: true,
    maxNumHands: 2,
  });
  strokeWeight(10);
  handsfree.start();
}

let v = 10;
let dx = 2,
  dy = 5;
const START_RADIUS = 10,
  MAX_RADIUS = 200,
  THRESHOLD_VALUE = 0.1;
let circles = [];
let isLoop = true;
let count = 0;

//------------------------------------------
function draw() {
  background(0);
  noFill();
  drawHand();
  if (count++ === 0) {
    circles.push(new Circle(10, 30, 10));
  }
  // console.log(circles);
  circles[0].move();
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  move() {
    if (this.x <= 0 || width <= this.x) {
      dx = -dx;
    } else if (this.y <= 0 || height <= this.y) {
      dy = -dy;
    }

    let nextColorX = get(this.x + dx, this.y);
    let nextColorY = get(this.x, this.y + dy);

    if (nextColorX[0] != 0) {
      dx = -dx;
    } else if (nextColorY[0] != 0) {
      dy = -dy;
    }

    this.x += dx;
    this.y += dy;
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//------------------------------------------
function drawHand() {
  stroke(255);
  background(0);

  if (handsfree.data.hands) {
    if (handsfree.data.hands.multiHandLandmarks) {
      var landmarks = handsfree.data.hands.multiHandLandmarks;
      var nHands = landmarks.length;
      // console.log(nHands);

      if (nHands >= 2) {
        let x1 = landmarks[0][8].x;
        let y1 = landmarks[0][8].y;
        let x2 = landmarks[1][8].x;
        let y2 = landmarks[1][8].y;
        let d = sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

        x1 = map(x1, 0, 1, width, 0);
        y1 = map(y1, 0, 1, 0, height);
        x2 = map(x2, 0, 1, width, 0);
        y2 = map(y2, 0, 1, 0, height);

        line(x1, y1, x2, y2);
      }
    }
  }
}

export default HandsFreeBall