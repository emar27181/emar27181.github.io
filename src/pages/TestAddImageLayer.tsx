import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import p5, { Graphics } from 'p5';
import coloringImageFilePath from '../assets/coloring_sample_image.png';
//import coloringImageFilePath from '../assets/IMG_9563.jpg'

export function TestAddImageLayer() {
  const sketch = (p: P5CanvasInstance) => {
    let additionalLayer: Graphics;
    let coloringImage: p5.Image;

    p.preload = () => {
      coloringImage = p.loadImage(coloringImageFilePath);
    }

    p.setup = () => {
      p.createCanvas(400, 400);
      p.background(255, 255, 255);
      additionalLayer = p.createGraphics(p.width, p.height);
      p.fill(255, 0, 0);
      p.noStroke();
    }

    p.draw = () => {
      if (p.mouseIsPressed) {
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      }

      p.image(coloringImage, 0, 0);
    }


  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default TestAddImageLayer