import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function WebGl() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_SIZE = 512;

    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE, p.WEBGL);
      p.background(0);
    };

    let angleX = 0, angleY = 0;
    const ROTATE_SPEED = 0.05;

    p.draw = () => {
      p.background(0);
      p.normalMaterial();
      p.rotateX(angleX);
      p.rotateY(angleY);

      if (p.keyIsPressed) {
        if (p.key === "a") { angleY -= ROTATE_SPEED; }
        else if (p.key === "w") { angleX += ROTATE_SPEED; }
        else if (p.key === "d") { angleY += ROTATE_SPEED; }
        else if (p.key === "s") { angleX -= ROTATE_SPEED; }
      }

      p.box(100);
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default WebGl