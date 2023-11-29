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
    };

    p.draw = () => {
      p.fill(255);
      displayTree();
    };

    function displayTree() {
      for (let i = 0; i < log.length; i++) {
        p.textAlign(p.CENTER, p.CENTER);
        let text = "[" + log[i].matchValue[0] + "] : [" + log[i].matchValue[1] + "]";
        p.text(text, p.width / 2, 10 + p.textSize() * log[i].depth);
        //console.log(log[i].matchValue);
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayMatchBoLog