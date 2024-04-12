
import p5 from "p5";
import { canvasWidth, canvasHeight } from "../pages/DrawBallsLine";
export class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: p5.Color;

  constructor(x: number, y: number, dx: number, dy: number, color: p5.Color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  refrect() {
    if (this.x < 0 || canvasWidth < this.x) {
      this.dx = -this.dx;
    }

    if (this.y < 0 || canvasHeight < this.y) {
      this.dy = -this.dy;
    }

  }
}

export default Ball;