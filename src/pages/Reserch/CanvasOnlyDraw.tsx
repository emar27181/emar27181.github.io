import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';
import { DISPLAY_RATE } from '../../config/constants';
import p5, { Graphics } from 'p5';
import { ReturnColorPaletteValue } from '../ColorRecommendation/ColorGenerateRe';
import imageFilePath0 from '../../assets/coloring_sample_image.png';

export let drawingWeight = 0.06 * window.innerWidth;
export let drawingColor: p5.Color;
let coloringImages: Array<p5.Image> = [];
let drawingLayer: Graphics;

export function CanvasOnlyDraw() {
  const sketch = (p: P5CanvasInstance) => {

    p.preload = () => {
      coloringImages.push(p.loadImage(imageFilePath0));
    }

    p.setup = () => {
      initializeVariables();
      p.createCanvas(DISPLAY_RATE * window.innerWidth, DISPLAY_RATE * window.innerWidth);
      drawingLayer = p.createGraphics(p.width, p.height);
      drawingLayer.background(p.color(255));
      p.background(255);
      p.frameRate(60);
    };

    p.draw = () => {


      p.image(drawingLayer, 0, 0);
      p.image(coloringImages[0], 0, 0);
      updateVariables();
      if (p.mouseIsPressed) { mousePressed(); }
    };

    function initializeVariables() {
      drawingColor = p.color(255, 0, 0);
    }

    function updateVariables() {
      p.colorMode(p.HSL);
      drawingColor = p.color(ReturnColorPaletteValue());
    }

    p.keyPressed = () => {
      if (p.key === "+") { drawingWeight += 0.2 * p.frameRate(); }
      else if (p.key === '-') { drawingWeight -= 0.2 * p.frameRate(); }
    }

    function mousePressed() {
      drawingLayer.noStroke();
      drawingLayer.fill(drawingColor);
      drawingLayer.ellipse(p.mouseX, p.mouseY, drawingWeight);
    }
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default CanvasOnlyDraw