import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function MatchBoGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256, FPS = 60;
    let player1Win = 0, player0Win = 0, hueristicPlayerNumber = 1;
    let matchValue = [[1, 1], [1, 1]];
    let isGameEnded = -1;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.textSize(30);
    };

    p.draw = () => {
      p.frameRate(FPS);
      p.background(0);

      displayScore();
      displayMatchValue(0);
      displayMatchValue(1);
      console.log("(" + matchValue[0][0] + ", " + matchValue[0][1] + ")\n(" + matchValue[1][0] + ", " + matchValue[1][1] + ")");

      judgeGameEnded();
      //試合が続いている場合
      if (isGameEnded === -1) {
        //先攻プレイヤーの行動
        if (p.frameCount % 2 != 1) {
          if (hueristicPlayerNumber === 0) { attackHeuristic(0, 1); }
          else { attackRandom(0, 1); }
        }
        //後攻プレイヤーの行動
        else {
          if (hueristicPlayerNumber === 1) { attackHeuristic(1, 0); }
          else { attackRandom(1, 0); }
        }
      }
      //試合が終わっている場合
      else { resetGame(); }
    };

    function resetGame() {
      if (isGameEnded === 0) {
        player0Win++;
      }
      else if (isGameEnded === 1) {
        player1Win++;
      }
      //変数のリセット
      isGameEnded = -1;
      matchValue = [[1, 1], [1, 1]];
      console.log("player0 win : player1 win = " + player0Win + ":" + player1Win);
    }

    function displayScore() {
      p.textSize(10);
      let player0WinRate = 100 * (player0Win / (player0Win + player1Win));
      let player1WinRate = 100 * (player1Win / (player0Win + player1Win));
      p.text("player0 win(先攻) : player1 win(後攻) = " + player0Win + ":" + player1Win +
        "\nplayer0 win rate = " + player0WinRate + "\nplayer1 win rate = " + player1WinRate +
        "\n※player" + hueristicPlayerNumber + "がヒューリスティックプレイヤー", 0, p.height - 50);
    }

    function displayMatchValue(displaySideNumber: number) {
      p.textSize(30);
      if (displaySideNumber === isGameEnded) { p.fill(255, 0, 0); }
      else { p.fill(255); }
      p.text("P" + displaySideNumber + ": (" + matchValue[displaySideNumber][0] + ", " + matchValue[displaySideNumber][1] + ")", 30, 30 + displaySideNumber * 50);
    }

    function judgeGameEnded() {
      if (matchValue[0][0] >= 5 && matchValue[0][1] >= 5) { isGameEnded = 1; }
      else if (matchValue[1][0] >= 5 && matchValue[1][1] >= 5) { isGameEnded = 0; }
    }

    function attackRandom(attackSideNumber: number, receiveSideNumber: number) {
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

    function attackHeuristic(attackSideNumber: number, receiveSideNumber: number) {
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
      else if (matchValue[attackSideNumber][0] > matchValue[attackSideNumber][1]) {
        attackHandNumber = 0;
      }
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
      else if (matchValue[receiveSideNumber][0] > matchValue[receiveSideNumber][1]) {
        matchValue[receiveSideNumber][0] += matchValue[attackSideNumber][attackHandNumber];
      }
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