import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function MatchBoGame() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    //const FPS = 60;
    const FPS = 2;
    const DEBUG = false;
    let player1Win = 0, player0Win = 0;
    let matchValue = [[1, 1], [1, 1]];
    let isGameEnded = -1;
    let turnCount = 1;

    let hueristicPlayerNumber = 1; //0ならUSERが後攻, 1ならUSERが先攻
    let isWaitedUserAttackHandInput = true;
    let isWaitedUserReceiveHandInput = true;
    let isUserTurn = (hueristicPlayerNumber === 1);

    let userAttackHandNumber = 0;
    let userReceiveHandNumber = 0;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.textSize(30);
      p.frameRate(FPS);
    };

    p.draw = () => {
      p.background(0);

      displayScore();
      displaymatchValue();
      if (DEBUG) {
        console.log("(" + matchValue[0][0] + ", " + matchValue[0][1] + ")\n(" + matchValue[1][0] + ", " + matchValue[1][1] + ")");
      }

      judgeGameEnded();

      // ユーザの入力の待機
      //if ((isWaitedUserAttackHandInput || isWaitedUserReceiveHandInput) && isUserTurn) { return; }
      if ((isWaitedUserAttackHandInput || isWaitedUserReceiveHandInput) && isUserTurn) { return; }

      //試合が続いている場合
      if (isGameEnded === -1) {

        //先攻プレイヤーの行動
        if (turnCount % 2 === 1) {
          if (hueristicPlayerNumber === 0) {
            attackHeuristic(0, 1);
            isUserTurn = true;
          }
          else {
            attackUser(0, 1);
            //attackRandom(0, 1);
            isUserTurn = false;
          }
        }
        //後攻プレイヤーの行動
        else {
          if (hueristicPlayerNumber === 1) {
            attackHeuristic(1, 0);
            isUserTurn = true;
          }
          else {
            attackUser(1, 0);
            //attackRandom(1, 0);
            isUserTurn = false;
          }
        }
        turnCount++;
      }
    };

    p.keyTyped = () => {
      if (p.key === 'e') {
        userReceiveHandNumber = 0;
        isWaitedUserReceiveHandInput = false;
      }
      else if (p.key === 'r') {
        userReceiveHandNumber = 1;
        isWaitedUserReceiveHandInput = false;
      }
      else if (p.key === 's') {
        userAttackHandNumber = 0;
        isWaitedUserAttackHandInput = false;
      }
      else if (p.key === 'd') {
        userAttackHandNumber = 1;
        isWaitedUserAttackHandInput = false;
      }

    }

    function resetGame() {
      p.textAlign(p.CENTER);
      p.text("YOU LOSE", p.width / 2, p.height / 2);
      p.textAlign(p.LEFT);

      if (isGameEnded === 0) {
        player0Win++;
      }
      else if (isGameEnded === 1) {
        player1Win++;
      }
      //変数のリセット
      isGameEnded = -1;
      turnCount = 1;
      matchValue = [[1, 1], [1, 1]];
      isWaitedUserAttackHandInput = true;
      isWaitedUserReceiveHandInput = true;
      isUserTurn = (hueristicPlayerNumber === 1);
      if (DEBUG) {
        console.log("player0 win : player1 win = " + player0Win + ":" + player1Win);
      }
    }

    function displayScore() {
      p.textSize(0.045 * p.width);
      let player0WinRate = 100 * (player0Win / (player0Win + player1Win));
      let player1WinRate = 100 * (player1Win / (player0Win + player1Win));
      let playerText = "";

      if (hueristicPlayerNumber === 0) { playerText = "COM(先攻):YOU(後攻)"; }
      else { playerText = "YOU: 先攻, COM: 後攻"; }
      let scoreText = "player0 win(先攻) : player1 win(後攻) = " + player0Win + ":" + player1Win +
        "\nplayer0 win rate = " + player0WinRate + "\nplayer1 win rate = " + player1WinRate +
        "\n";
      let ruleText = "ルール: 余りなし, 分割なし"
      let explainText = "e: 相手の左側を攻撃, r: 相手の右側を攻撃\ns: 自分の左側で攻撃, d: 自分の右側で攻撃";
      //let displayText = playerText + "\n" + scoreText + "\n" + explainText;
      let displayText = playerText + "\n\n" + ruleText + "\n\n" + explainText;


      p.text(displayText, 0, 0.6 * p.height);
    }

    function displaymatchValue() {
      p.textSize(30);
      //if (displaySideNumber === isGameEnded) { p.fill(255, 0, 0); }
      //else { p.fill(255); }
      p.fill(255);
      let userNumber = (hueristicPlayerNumber + 1) % 2;
      let textCPU = "CPU: (" + matchValue[hueristicPlayerNumber][0] + "," + matchValue[hueristicPlayerNumber][1] + ")";
      let textUSER = "YOU: (" + matchValue[userNumber][0] + "," + matchValue[userNumber][1] + ")";
      let displayText = textCPU + "\n" + textUSER;
      p.text(displayText, 30, 30);
    }

    function judgeGameEnded() {
      if (matchValue[0][0] >= 5 && matchValue[0][1] >= 5) {
        isGameEnded = 1;
        resetGame();
      }
      else if (matchValue[1][0] >= 5 && matchValue[1][1] >= 5) {
        isGameEnded = 0;
        resetGame();
      }
    }

    function attackUser(attackSideNumber: number, receiveSideNumber: number) {
      let attackHandNumber = 0; // どちらの手で攻撃するかを保存する変数
      let receiveHandNumber = 0;

      // 自分のどちらの手で攻撃するかの決定
      // どちらかの自分の手が5以上の場合
      if (matchValue[attackSideNumber][0] >= 5) {
        attackHandNumber = 1;
      }
      else if (matchValue[attackSideNumber][1] >= 5) {
        attackHandNumber = 0;
      }
      else {
        attackHandNumber = userAttackHandNumber;
        isWaitedUserAttackHandInput = true;
      }

      // 相手のどちらかの手を攻撃するかの決定
      // どちらかの相手の手が5以上の場合
      if (matchValue[receiveSideNumber][0] >= 5) {
        receiveHandNumber = 1;
      }
      else if (matchValue[receiveSideNumber][1] >= 5) {
        receiveHandNumber = 0;
      }
      else {
        receiveHandNumber = userReceiveHandNumber;
        isWaitedUserReceiveHandInput = true;
      }

      //攻撃
      matchValue[receiveSideNumber][receiveHandNumber] += matchValue[attackSideNumber][attackHandNumber];
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
      let receiveHandNumber: number; //

      // 自分のどちらの手で攻撃するかの決定
      // どちらかの自分の手が5以上の場合
      if (matchValue[attackSideNumber][0] >= 5) {
        attackHandNumber = 1;
      }
      else if (matchValue[attackSideNumber][1] >= 5) {
        attackHandNumber = 0;
      }
      //自分のいずれかの手で攻撃した際に相手を倒せる場合
      else if (((matchValue[attackSideNumber][0] + matchValue[receiveSideNumber][0] >= 5) &&
        (matchValue[receiveSideNumber][0] < 5)) || ((matchValue[attackSideNumber][0] + matchValue[receiveSideNumber][1] >= 5) && (matchValue[receiveSideNumber][1] < 5))) {
        attackHandNumber = 0;
      }
      else if (((matchValue[attackSideNumber][1] + matchValue[receiveSideNumber][0] >= 5) &&
        (matchValue[receiveSideNumber][0] < 5)) || ((matchValue[attackSideNumber][1] + matchValue[receiveSideNumber][1] >= 5) && (matchValue[receiveSideNumber][1] < 5))) {
        attackHandNumber = 1;
      }
      //自分のいずれの手で攻撃した際に相手を倒せない場合
      else if (matchValue[attackSideNumber][0] < matchValue[attackSideNumber][1]) {
        attackHandNumber = 0;
      }
      else {
        attackHandNumber = 1;
      }


      //相手のどちらの手を攻撃するかの決定
      if (matchValue[receiveSideNumber][0] >= 5) {
        receiveHandNumber = 1;
      }
      else if (matchValue[receiveSideNumber][1] >= 5) {
        receiveHandNumber = 0;
      }

      //自分のいずれかの手で攻撃した際に相手を倒せる場合
      else if (matchValue[attackSideNumber][attackHandNumber] + matchValue[receiveSideNumber][0] >= 5) {
        receiveHandNumber = 0;
      }
      else if (matchValue[attackSideNumber][attackHandNumber] + matchValue[receiveSideNumber][1] >= 5) {
        receiveHandNumber = 1;
      }
      //自分のいずれの手で攻撃した際に相手を倒せない場合
      else if (matchValue[receiveSideNumber][0] < matchValue[receiveSideNumber][1]) {
        receiveHandNumber = 0;
      }
      else {
        receiveHandNumber = 1;
      }

      //攻めが[2,3], 受けが[2,2]の場合(先攻の選択肢の修正)
      if ((matchValue[receiveSideNumber][0] == 2 && matchValue[receiveSideNumber][1] == 2)) {
        if ((matchValue[attackSideNumber][0] == 2) && (matchValue[attackSideNumber][1] == 3)) {
          attackHandNumber = 0;
        }
        else if ((matchValue[attackSideNumber][0] == 3) && (matchValue[attackSideNumber][1] == 2)) {
          attackHandNumber = 1;
        }
      }


      //攻めが[2,4], 受けが[2,3]の場合(後攻の選択肢の修正)
      if ((matchValue[attackSideNumber][0] == 2) && (matchValue[attackSideNumber][1] == 4)) {
        attackHandNumber = 1;
        if ((matchValue[receiveSideNumber][0] == 2) && (matchValue[receiveSideNumber][1] == 3)) {
          receiveHandNumber = 0;
        }
        else if ((matchValue[receiveSideNumber][0] == 3) && (matchValue[receiveSideNumber][1] == 2)) {
          receiveHandNumber = 1;
        }
      }
      if ((matchValue[attackSideNumber][0] == 4) && (matchValue[attackSideNumber][1] == 2)) {
        attackHandNumber = 0;
        if ((matchValue[receiveSideNumber][0] == 2) && (matchValue[receiveSideNumber][1] == 3)) {
          receiveHandNumber = 0;
        }
        else if ((matchValue[receiveSideNumber][0] == 3) && (matchValue[receiveSideNumber][1] == 2)) {
          receiveHandNumber = 1;
        }
      }


      //攻撃
      matchValue[receiveSideNumber][receiveHandNumber] += matchValue[attackSideNumber][attackHandNumber];

    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default MatchBoGame