
import { canvasWidth, canvasHeight } from "../pages/DrawBallsLine";
export class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
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