//return hue: rule based 

export function returnHue(hueInput: string) {
  let returnHue = 0;

  switch (hueInput) {
    case "red": returnHue = 0; break;
    case "yellow": returnHue = 60; break;
    case "green": returnHue = 120; break;
    case "cyan": returnHue = 180; break;
    case "blue": returnHue = 240; break;
    case "magenta": returnHue = 300; break;
    default: return -2; break;
  }

  return returnHue;
}

export default returnHue;