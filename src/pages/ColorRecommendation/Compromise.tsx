import compromise from 'compromise';
import sentences from 'compromise-sentences';
import { getColorInput } from './FormDisplay';
import { FormDisplay } from './FormDisplay';
import { returnColorCode } from './returnColorCode';
const DEBUG = true;
let colorCode = "#000000";

export function Compromise() {
  let nounsArray: Array<string> = [];
  let adjectiveArray: Array<string> = [];
  const paragraph = getColorInput();
  const doc = compromise(paragraph);
  const firstChar = compromise(paragraph).firstTerms().text();
  //const colorSentences = compromise(paragraph).sentences().filter((sentence) => sentence.has("color"));
  nounsArray = doc.nouns().out('array');
  adjectiveArray = doc.adjectives().out('array');

  FormDisplay();

  if (DEBUG) {
    console.log("before(paragraph): \n" + paragraph);
    console.log("after: ");
    //console.log(firstChar);
    //console.log("colorSentences: " + colorSentences.map(colorSentence => colorSentence.text()));
    //console.log("colorSentences: " + colorSentences.text());
  }

  //カラーコードへの変換
  colorCode = returnColorCode(firstChar);
  if (DEBUG) {
    //console.log("colorCode: " + colorCode);
  }

  return (
    <div>
      <br />
      input: {paragraph} <br />
      output: {colorCode} <br />

    </div>
  );
}

export function getColorCode() {
  const returnColorCode = colorCode;
  return returnColorCode;
}

export default Compromise;