import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { Graphics } from 'p5';

export function TestMultipleLayer() {
  const sketch = (p: P5CanvasInstance) => {
    let additionalLayer: Graphics;

    p.setup = () => {
      p.createCanvas(400, 400);
      p.background(255, 255, 255);
      additionalLayer = p.createGraphics(p.width, p.height);
    }

    p.draw = () => {
      p.fill(255, 0, 0);
      if (p.mouseIsPressed) {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      }
      displayAdditionalLayer();
    }

    function displayAdditionalLayer() {
      additionalLayer.strokeWeight(20);
      additionalLayer.noFill();
      additionalLayer.stroke(0, 0, 0);
      additionalLayer.rect(50, 50, 300, 300);

      p.image(additionalLayer, 0, 0);
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestMultipleLayer