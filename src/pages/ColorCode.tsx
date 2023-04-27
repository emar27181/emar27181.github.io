export function ColorCode(colorInput: string) {
  let returnColorCode = "#000000";

  switch (colorInput) {
    case "red": returnColorCode = "#FF0000"; break;
    default: break;
  }

  return returnColorCode;
}

export default ColorCode;