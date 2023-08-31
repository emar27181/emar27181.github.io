/*このプログラムは数学の自由研究扱う分野のビジュアルアート？を
  制作するために作成したプログラムです。
  作成日: 2023/08/29
*/

import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

const FRAME_RATE = 60;

export function FreeResearch() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 10000, CANVAS_HEIGHT = 100;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.frameRate(FRAME_RATE);
      p.noStroke();

      /*
      let prePrime = 2
      for (let i = 3; i < 10000; i++) {
        if (isPrime(i)) {
          //console.log(i);
          console.log("primeNum: " + i + ", sub: " + (i - prePrime));
          //console.log(i / prePrime);
          prePrime = i;
        }
      }
      */

    };

    let frameCount = 1;
    let prePrime = 2;
    let maxSubPrime = 2;
    let maxSub = 0;
    let x = 0;

    p.draw = () => {
      frameCount++;
      p.fill(255);

      //素数フレームだった場合
      if (isPrime(frameCount)) {
        if((frameCount-prePrime) >=maxSub){
          maxSub = frameCount-prePrime;
          maxSubPrime = frameCount;
        }
        console.log("primeNum: " + frameCount + ", sub: " + (frameCount - prePrime) + ", maxSub: " + maxSub + ", maxSubPrime: " + maxSubPrime);
        //p.rect(frameCount, 0, 2, (frameCount - prePrime));
        p.rect(x, 0, 2, (frameCount - prePrime));
        x++;
        prePrime = frameCount;
      }
      //p.rect(0, 0, 100, 100);

    };
  }

  function isPrime(num: number): boolean {
    if (num <= 1) { return false; }
    else if (num <= 3) { return true; }
    if (num % 2 === 0 || num % 3 === 0) { return false; }

    // 5以上の数について、6の倍数±1の範囲で約数を探す
    const sqrtNum = Math.floor(Math.sqrt(num));
    for (let i = 5; i <= sqrtNum; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false; // 素数でない
      }
    }

    return true; // 素数である
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default FreeResearch