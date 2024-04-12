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
}

export default Ball;