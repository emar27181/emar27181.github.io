//return hue: rule based 

export function returnHue(hueInput: string) {
  let returnHue = 0;

  switch (hueInput) {
    case "red": returnHue = 0; break;
    case "orange": returnHue = 30; break;
    case "yellow": returnHue = 60; break;
    case "yellowgreen": returnHue = 90; break;
    case "green": returnHue = 120; break;
    case "springgreen": returnHue = 160; break;
    case "cyan": returnHue = 180; break;
    case "azure": returnHue = 210; break;
    case "blue": returnHue = 240; break;
    case "violet": returnHue = 270; break;
    case "magenta": returnHue = 300; break;
    case "rose": returnHue = 330; break;
    default: return -2; break;
  }

  return returnHue;
}

export default returnHue;