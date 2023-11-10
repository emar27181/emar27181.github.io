import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function MatchBoGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256, FPS = 10;

    let matchValue = [[1, 1], [1, 1]];
    let isGameEnded = -1;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
    };

    p.draw = () => {
      p.frameRate(FPS);
      p.background(0);
      p.fill(255);
      p.textSize(30);
      p.text(matchValue[0][0] + ", " + matchValue[0][1] + "\n\n" + matchValue[1][0] + ", " + matchValue[1][1], 0, p.height / 2 - 15);
      if (isGameEnded === -1) { console.log("(" + matchValue[0][0] + ", " + matchValue[0][1] + ")\n(" + matchValue[1][0] + ", " + matchValue[1][1] + ")"); }

      judgeGameEnded();
      if (isGameEnded === -1) {
        if (p.frameCount % 2 === 0) { attackMatchBo(0, 1); }
        else { attackMatchBo(1, 0); }
      }
    };

    function judgeGameEnded() {
      if (matchValue[0][0] >= 5 && matchValue[0][1] >= 5) { isGameEnded = 1; }
      else if (matchValue[1][0] >= 5 && matchValue[1][1] >= 5) { isGameEnded = 0; }
    }

    function attackMatchBo(attackSideNumber: number, receiveSideNumber: number) {
      let attackHandNumber: number; // どちらの手で攻撃するかを保存する変数

      // 自分のどちらの手で攻撃するかの決定
      // どちらかの自分の手が5以上の場合
      if (matchValue[attackSideNumber][0] >= 5) {
        attackHandNumber = 1;
      }
      else if (matchValue[attackSideNumber][1] >= 5) {
        attackHandNumber = 0;
      }
      // どちらの自分の手も5未満の場合
      // 0で攻撃する場合
      else if (p.random() < 0.5) {
        attackHandNumber = 0;
      }
      // 1で攻撃する場合
      else {
        attackHandNumber = 1;
      }

      // 相手のどちらかの手を攻撃するかの決定と攻撃
      // どちらかの相手の手が5以上の場合
      if (matchValue[receiveSideNumber][0] >= 5) {
        matchValue[receiveSideNumber][1] += matchValue[attackSideNumber][attackHandNumber];
      }
      else if (matchValue[receiveSideNumber][1] >= 5) {
        matchValue[receiveSideNumber][0] += matchValue[attackSideNumber][attackHandNumber];
      }
      // どちらの自分の手も5未満の場合
      // 0を攻撃する場合
      else if (p.random() < 0.5) {
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