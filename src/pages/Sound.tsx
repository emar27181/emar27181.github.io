import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
//import 'p5/lib/addons/p5.sound' //これをインポートすると起動できなくなる

export function Sound() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(255);
    };

    p.draw = () => {
      p.fill(255);
      //let sound = p.loadSound('./assets/sound.mp3');
      if (p.mouseIsPressed) {
        p.ellipse(p.mouseX, p.mouseY, 100, 100);
        // sound.play();
      }
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Sound;