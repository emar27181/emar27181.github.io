import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Image, Element } from 'p5';

export function Picture() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;
    
    let img: Image | Element;

    p.preload = () => {
      img = p.loadImage('src/assets/icon2.png');
    };


    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      p.background(0); 
      p.image(img, 0, 0);
    };

    p.draw = () => {
      p.fill(255); 
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default Picture