import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ClockCircle() {
  const sketch = (p: P5CanvasInstance) => {
    const color1 = p.color("#ffffff"); //描画色1(白)
    const color2 = p.color("#000000"); //描画色2(黒)
    let color1amount = 1; // 描画色1の強さ
    
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight); //キャンバスの作成
      p.background("#000000"); // 背景色を設定(黒)
      p.noStroke(); // 線なし（塗りつぶしのみ）に設定
    };

    p.draw = () => {
      p.fill(p.lerpColor(color2, color1, color1amount)); // 塗り色の設定
      p.ellipse(p.width / 2, p.height / 2, 10, 10); // 楕円の描画(中央)
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockCircle