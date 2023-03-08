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
      p.frameRate(10);
      p.strokeWeight(0.3);
    };

    let nodesCount = 0;

    let x = CANVAS_SIZE / 2, y = CANVAS_SIZE;
    const AMPLITUDE = 10, GROW_SPEED = 1;
    let trees: Array<Tree> = [];
    let isNodesRestart = true, isNodesGenerated = true;

    p.draw = () => {
      var color = (Math.random() * 0xFFFFFF | 0).toString(16);
      var randomColor = "#" + ("000000" + color).slice(-6);
      var colorRandom = p.color(randomColor);
      //p.fill(colorRandom);
      p.fill(255);


      if(p.keyIsPressed) {
        if(p.key === 'g'){
          isNodesGenerated =!isNodesGenerated;
          console.log("isNodesGenerated: " + isNodesGenerated);
        }
        else if(p.key === 'r'){
          isNodesRestart =!isNodesRestart;
          console.log("isNodesRestart: " + isNodesRestart);
        }
      }

      
      if (isNodesGenerated) {
        if (p.random() < 0.02) {
          if (nodesCount === 0) {
            trees.push(new Tree(x, y));
            nodesCount++;
          }
          else {
            if (isNodesRestart) { trees.push(new Tree(x, y)); }
            else { trees.push(new Tree(trees[nodesCount - 1].x, trees[nodesCount - 1].y)); }
            nodesCount++;
          }
        }
      }

      for (let i = 0; i < trees.length; i++) {
        if (p.random() < 0.3) { trees[i].x = trees[i].x + AMPLITUDE * p.random() - AMPLITUDE / 2; }
        trees[i].y -= GROW_SPEED;
        let dotSize = (30 / CANVAS_SIZE) * trees[i].y;
        p.ellipse(trees[i].x, trees[i].y, dotSize, dotSize);
      }

    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default GrowArt