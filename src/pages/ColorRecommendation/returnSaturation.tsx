//return saturation: rule based 

export function returnSaturation(saturationInput: string) {
  let returnSaturation = 0;

  switch (saturationInput) {
    case "desaturated":  returnSaturation = 0; break;
    case "muted": returnSaturation = 15; break;
    case "normal": returnSaturation = 40; break;
    case "vivid": returnSaturation = 70; break;
    case "pure": returnSaturation = 100; break;
    default: return -2; break;
  }

  return returnSaturation;
}

export default returnSaturation;