import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import log from '../data/matchBoTestLog.json'

export function DisplayMatchBoLog() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(255);
      displayTree();
    };

    p.draw = () => {
    };

    function displayTree() {
      let depthMax = 10;

      for (let depth = 0; depth < depthMax; depth++) {
        //深さがdepthのログがいくつあるか計測
        let countLog = 0;
        for (let index = 0; index < log.length; index++) {
          if (log[index].depth === depth) {
            countLog++;
          }
        }
        //console.log(countLog);

        for (let index = 0; index < log.length; index++) {
          // 深さがdepthのログの描画
          if (log[index].depth === depth) {
            let text = "[" + log[index].matchValue[0] + "] : [" + log[index].matchValue[1] + "]";
            p.text(text, p.width / 2, 10 + p.textSize() * depth);
          }
        }
      }

      /*
      for (let i = 0; i < log.length; i++) {
        let text = "[" + log[i].matchValue[0] + "] : [" + log[i].matchValue[1] + "]";
        p.text(text, p.width / 2, 10 + p.textSize() * log[i].depth);
        //console.log(log[i].matchValue);
      }
      */
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayMatchBoLog