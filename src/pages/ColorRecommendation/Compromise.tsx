import compromise from 'compromise';
import sentences from 'compromise-sentences';
import { getColorInput } from './FormDisplay';
import { FormDisplay } from './FormDisplay';
import { returnColorCode } from './returnColorCode';
import { returnHue } from './returnHue';
import { returnSaturation } from './returnSaturation';
import { returnValue } from './returnValue';

const DEBUG = true;
let colorCode = "#000000";
let hue = -1;
let saturation = -1;
let value = -1;

export function Compromise() {
  let nounsArray: Array<string> = [];
  let adjectiveArray: Array<string> = [];
  const paragraph = getColorInput();
  //const paragraph = "This is a test imput. normal red";
  //const paragraph = "normal ";
  const doc = compromise(paragraph);
  const firstChar = compromise(paragraph).firstTerms().text();
  //const colorSentences = compromise(paragraph).sentences().filter((sentence) => sentence.has("color"));
  nounsArray = doc.nouns().out('array');
  adjectiveArray = doc.adjectives().out('array');

  FormDisplay();

  if (DEBUG) {
    console.log("before: ");
    console.log("paragraph: " + paragraph + "\n");

    console.log("after: ");
    console.log("firstChar: " + firstChar);
    console.log("nounsArray: "+ nounsArray);
    console.log("adjectiveArray: "+ adjectiveArray);
    //console.log("colorSentences: " + colorSentences.map(colorSentence => colorSentence.text()));
    //console.log("colorSentences: " + colorSentences.text());
  }

  //RGB, HSVへの変換
  colorCode = returnColorCode(firstChar);
  /*
  hue = returnHue(firstChar);
  saturation = returnSaturation(firstChar);
  value = returnValue(firstChar);
  */

  hue = 0;
  //hue = returnHue(nounsArray[0]);
  saturation = returnSaturation(adjectiveArray[0]); 
  value = returnValue(adjectiveArray[0]);

  if (DEBUG) {
    //console.log("colorCode: " + colorCode);
    //console.log("hue: " + hue);
    //console.log("saturation: " + saturation);
    //console.log("value: " + value);
  }

  return (
    <div>
      <br />
      ---input---- <br />
      paragraph: {paragraph} <br /><br />
      ---output--- <br />
      hue: {hue} <br />
      saturation: {saturation} <br />
      value: {value} <br />
    </div>
  );
}

export function getColorCode() {
  const returnColorCode = colorCode;
  return returnColorCode;
}

export function getHue(){
  const returnHue = hue;
  return returnHue ;
}

export function getSaturation(){
  const returnSaturation = saturation;
  return returnSaturation;
}

export function getValue(){
  const returnValue = value;
  return returnValue;
}

export default Compromise;