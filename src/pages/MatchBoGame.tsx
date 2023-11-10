import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function MatchBoGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    let matchValue = [[1, 1], [1, 1]];

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.frameRate(0.3);
      p.background(0);
      p.fill(255);
      p.textSize(30);
      p.text(matchValue[0][0] + ", " + matchValue[0][1] + "\n\n" + matchValue[1][0] + ", " + matchValue[1][1], 0, p.height / 2 - 15);

      if (p.frameCount % 2 === 0) { attackMatchBo(0, 1); }
      else { attackMatchBo(1, 0); }
    };

    function attackMatchBo(attackSideNumber: number, receiveSideNumber: number) {
      let attackHandNumber: number; // どちらの手で攻撃するかを保存する変数

      // 自分のどちらの手で攻撃するかの決定
      // 0で攻撃する場合
      if (p.random() < 0.5) {
        attackHandNumber = 0;
      }
      // 1で攻撃する場合
      else {
        attackHandNumber = 1;
      }

      // 相手のどちらかの手を攻撃するかの決定と攻撃
      // 0を攻撃する場合
      if (p.random() < 0.5) {
        matchValue[receiveSideNumber][0] += matchValue[attackSideNumber][attackHandNumber];
      }
      // 1を攻撃する場合
      else {
        matchValue[receiveSideNumber][1] += matchValue[attackSideNumber][attackHandNumber];
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default MatchBoGame