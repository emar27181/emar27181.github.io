import compromise from 'compromise';
import { getColorInput } from './FormTemplate';
import { FormTemplate } from './FormTemplate';
import { ColorCode } from './ColorCode';
const DEBUG = false;
let colorCode = "#000000";

export function Compromise() {
  FormTemplate();
  const paragraph = getColorInput();
  if (DEBUG) {
    console.log("before(paragraph): \n" + paragraph);
  }

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();

  if (DEBUG) {
    console.log("after(terms): ");
    //console.log(sentences.map(sentence => sentence.text()));
    console.log(terms.map(term => term.text()));
    //console.log(terms.text());
    //console.log(firstChar);
  }

  //カラーコードへの変換
  colorCode = ColorCode(firstChar);
  if (DEBUG) { console.log(colorCode); }

  return (
    <div>
      <br />
      input: {paragraph} <br />
      output: {colorCode} <br />
      
    </div>
  );
}

export function getColorCode(){
  const returnColorCode = colorCode;
  return returnColorCode;
}

export default Compromise;