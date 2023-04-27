export function ColorCode(colorInput: string) {
  let returnColorCode = "#000000";

  switch (colorInput) {
    case "black": returnColorCode = "#000000"; break;
    case "red": returnColorCode = "#FF0000"; break;
    case "green": returnColorCode = "#00FF00"; break;
    case "blue": returnColorCode = "#0000FF"; break;
    case "purple": returnColorCode = "#FF00FF"; break;
    case "yellow": returnColorCode = "#FFFF00"; break;
    case "lightBlue": returnColorCode = "#00FFFF"; break;
    case "white": returnColorCode = "#FFFFFF"; break;
    default: returnColorCode = "入力された色は想定されていない入力です。"; break;
  }

  return returnColorCode;
}

export default ColorCode;