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
  //const paragraph = getColorInput();
  //const paragraph = "This is a test imput. normal red";
  const paragraph = "normal";
  const doc = compromise(paragraph);
  const firstChar = compromise(paragraph).firstTerms().text();
  //const colorSentences = compromise(paragraph).sentences().filter((sentence) => sentence.has("color"));
  nounsArray = doc.nouns().out('array');
  adjectiveArray = doc.adjectives().out('array');

  FormDisplay();

  if (DEBUG) {
    console.log("before(paragraph): \n" + paragraph);
    console.log("after: ");
    console.log(firstChar);
    //console.log("colorSentences: " + colorSentences.map(colorSentence => colorSentence.text()));
    //console.log("colorSentences: " + colorSentences.text());
  }

  //RGB, HSVへの変換
  colorCode = returnColorCode(firstChar);
  hue = returnHue(firstChar);
  saturation = returnSaturation(firstChar);
  value = returnValue(firstChar);

  if (DEBUG) {
    //console.log("colorCode: " + colorCode);
    console.log("hue: " + hue);
    console.log("saturation: " + saturation);
    console.log("value: " + value);
  }

  return (
    <div>
      <br />
      ---input---- <br />
      paragraph: {paragraph} <br /><br />
      ---output--- <br />
      colorCode: {colorCode} <br />
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

export default Compromise;