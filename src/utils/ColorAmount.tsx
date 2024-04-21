import p5 from "p5";

export class ColorAmount {
  color: p5.Color;
  amount: number;

  constructor(color: p5.Color, amount: number) {
    this.color = color;
    this.amount = amount;
  }
}