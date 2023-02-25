import '../App.css'
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import React from 'react';

export function ClockColor() {
  const sketch = (p: P5CanvasInstance) => {
    
    p.setup = () => {
      p.createCanvas(512, 512); 
      p.background("#000000"); 
      p.frameRate(1);
      p.noStroke();
    };

    let x = 0, y = 0, dx = 10, dy = 30;

    p.draw = () => {
      let time = new Date();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();
      //console.log(hours + ":" + minutes + ":" + seconds);
      
      let r = (255 / 12)*hours;
      let g = (255 / 60)*minutes;
      let b = (255 / 60)*seconds;
      //console.log("r: " + r + ", g: " + g + ", b: " + b);

      x += dx;
      y += dy;
      if(x < 0 || x > p.width ){dx = -dx;}
      if(y < 0 || y > p.height){dy = -dy;}

      p.fill(r, g, b);
      p.ellipse(x, y, 20, 20);


      
    };
  }

  return (
    <ReactP5Wrapper sketch={sketch} />
  )
}

export default ClockColor