//return value: rule based 

export function returnValue(valueInput: string) {
  let returnValue = 0;

  switch (valueInput) {
    case "black": returnValue = 0; break;
    case "deep": returnValue = 15; break;
    case "dark": returnValue = 30; break;
    case "normal": returnValue = 50; break;
    case "light": returnValue = 70; break;
    case "bright": returnValue = 90; break;
    default: return -2; break;
  }

  return returnValue;
}

export default returnValue;