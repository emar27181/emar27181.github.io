import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function GrowArt() {
  class Tree {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE); //キャンバスの作成
      p.background(0);
      p.noStroke();
      //p.frameRate(1);
    };

    let count = 0;
    let x = CANVAS_SIZE / 2, y = CANVAS_SIZE;
    const AMPLITUDE = 30;

    p.draw = () => {
      var color = (Math.random() * 0xFFFFFF | 0).toString(16);
      var randomColor = "#" + ("000000" + color).slice(-6);
      var colorRandom = p.color(randomColor);
      p.fill(colorRandom);

      //let trees = [];
      let trees: Tree[] = [];
      
      if (p.random() < 0.3) {
        //trees[count++] = new Tree(x, y);
        trees.push(new Tree(x, y));
        console.log(trees);
      }

      for (let i = 0; i < trees.length; i++) {

        console.log("i: " + i);
        console.log(trees[i].x + ", " + trees[i].y);

        x = trees[i].x;
        y = trees[i].y;

        if (p.random() < 0.3) {x = x + AMPLITUDE * p.random() - AMPLITUDE / 2;}
        let dotSize = (30 / CANVAS_SIZE) * y;
        p.ellipse(x, y-=0.3, dotSize, dotSize);
      }

      /*
      if (p.random() < 0.3) {
        x = x + AMPLITUDE * p.random() - AMPLITUDE / 2;
      }
      let dotSize = (30 / CANVAS_SIZE) * y;
      p.ellipse(x, y--, dotSize, dotSize);
      //p.rect(x, y--, dotSize, dotSize);
      */

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default GrowArt