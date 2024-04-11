export class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

export default Ball;