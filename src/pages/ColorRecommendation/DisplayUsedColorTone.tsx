import '../../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function DisplayUsedColorTone() {
  const sketch = (p: P5CanvasInstance) => {

    const CANVAS_WIDTH = 512, CANVAS_HEIGHT = 512;

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.background(255);
      p.textSize(0.06 * p.width)
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
    };

    p.draw = () => {
      drawCircles();
    };

    function drawCircles() {
      const CIRCLE_SIZE = 2 * p.width / 10;

      p.noFill();
      p.stroke(0);

      drawToneCircle(1 * p.width / 10, 1 * p.width / 10, CIRCLE_SIZE, "W");
      drawToneCircle(1 * p.width / 10, 3 * p.width / 10, CIRCLE_SIZE, "ItGy");
      drawToneCircle(1 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE, "mGy");
      drawToneCircle(1 * p.width / 10, 7 * p.width / 10, CIRCLE_SIZE, "dkGy");
      drawToneCircle(1 * p.width / 10, 9 * p.width / 10, CIRCLE_SIZE, "Bk");

      drawToneCircle(3 * p.width / 10, 2 * p.width / 10, CIRCLE_SIZE, "p+");
      drawToneCircle(3 * p.width / 10, 4 * p.width / 10, CIRCLE_SIZE, "Itg");
      drawToneCircle(3 * p.width / 10, 6 * p.width / 10, CIRCLE_SIZE, "g");
      drawToneCircle(3 * p.width / 10, 8 * p.width / 10, CIRCLE_SIZE, "dkg");

      drawToneCircle(5 * p.width / 10, 2 * p.width / 10, CIRCLE_SIZE, "It+");
      drawToneCircle(5 * p.width / 10, 4 * p.width / 10, CIRCLE_SIZE, "sf");
      drawToneCircle(5 * p.width / 10, 6 * p.width / 10, CIRCLE_SIZE, "d");
      drawToneCircle(5 * p.width / 10, 8 * p.width / 10, CIRCLE_SIZE, "dk");

      drawToneCircle(7 * p.width / 10, 3 * p.width / 10, CIRCLE_SIZE, "b");
      drawToneCircle(7 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE, "s");
      drawToneCircle(7 * p.width / 10, 7 * p.width / 10, CIRCLE_SIZE, "dp");

      drawToneCircle(9 * p.width / 10, 5 * p.width / 10, CIRCLE_SIZE, "v");
    }

    function drawToneCircle(x: number, y: number, radius: number, text: string) {
      p.ellipse(x, y, radius);
      p.text(text, x, y);
    }

  }
  return (
    <ReactP5Wrapper sketch={sketch} />
  )

}

export default DisplayUsedColorTone