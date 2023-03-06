import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
//import {Handsfree} from 'handsfree'; // react-p5-wrapper下の環境では導入不可??? my-p5-projectでは from 'handsfree'で導入可能


export function CameraTracking() {
  const sketch = (p: P5CanvasInstance) => {

    

    p.setup = () => {
      p.createCanvas(512, 512);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.textSize(40);
      p.text("現在準備中", p.width/2 - 70, p.height/2);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CameraTracking