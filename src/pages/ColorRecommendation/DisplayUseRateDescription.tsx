import '../../App.css';
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5 from 'p5';
import { DISPLAY_RATE } from '../../config/constants';

export function DisplayUseRateDescription() {
  const sketch = (p: P5CanvasInstance) => {
    
    const CANVAS_WIDTH = 256, CANVAS_HEIGHT = 256;
    let img: p5.Image;

    p.preload = () => {
      // 画像ファイルのパスを指定します
      img = p.loadImage('src/assets/UseRateExample.png');
    };

    p.setup = () => {
      const ASPECT_RATE = 728 / 1078;
      const MAG_RATE = 1.6;
      p.createCanvas(MAG_RATE * DISPLAY_RATE * window.innerWidth / 3,  MAG_RATE * ASPECT_RATE * DISPLAY_RATE * window.innerWidth / 3);
      p.background(255);
    };

    p.draw = () => {
      // キャンバスの中央に画像を表示します
      p.image(img, 0, 0, p.width, p.height);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default DisplayUseRateDescription;
