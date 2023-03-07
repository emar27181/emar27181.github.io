import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function BallsReflect() {
  const sketch = (p: P5CanvasInstance) => {

    
    p.setup = () => {
      p.createCanvas(512, 512); 
      p.background("#000000"); 
    };

    p.draw = () => {
      p.fill(255); // 塗り色の設定
      p.ellipse(p.width / 2, p.height / 2, 100, 100); // 楕円の描画(中央)
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default BallsReflect