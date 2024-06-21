


export function DisplayMatchBoLog() {}
/*import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import log from '../data/matchBoTestLog.json'

export function DisplayMatchBoLog() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(0);
      //p.textAlign(p.CENTER, p.CENTER);
      p.fill(255);
      p.textSize(7);
      displayTree();
    };

    p.draw = () => {
    };

    function displayTree() {
      let depthMax = 10;
      let index = 0;

      for (let depth = 0; depth < depthMax; depth++) {
        //深さがdepthのログがいくつあるか計測
        //depthLogMax: 深さdepthのログの個数
        let depthLogMax = 0;
        for (let i = 0; i < log.length; i++) {
          if (log[i].depth === depth) {
            depthLogMax++;
          }
        }

        for (let i = 0; i < depthLogMax; i++) {
          // 深さがdepthのログの描画
          if (log[index].depth === depth) {
            let text = "[" + log[index].matchValue[0] + "] : [" + log[index].matchValue[1] + "]";
            //p.text(text, p.width / 2 + 80 * i, 10 + p.textSize() * depth);
            p.text(text, 7 * p.textSize() * i, 10 + p.textSize() * depth);
          }
          index++;
        }
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayMatchBoLog
*/