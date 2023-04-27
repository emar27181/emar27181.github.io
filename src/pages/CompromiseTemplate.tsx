import compromise from 'compromise';
import { getColorInput } from './FormTemplate';
import { FormTemplate } from './FormTemplate';
const DEBUG = true;

export function CompromiseTemplate() {
  FormTemplate();
  //const paragraph = 'This is a sample sentence by tsx. This is second sentence. This is third sentence.';
  const paragraph = getColorInput();
  if (DEBUG) {
    console.log("before: \n" + paragraph);
  }

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();

  if (DEBUG) {
    console.log("after: ");
    console.log(sentences.map(sentence => sentence.text()));
    console.log(terms.map(term => term.text()));
    //console.log(terms.text());
    console.log(firstChar);
  }

  return (
    <div>
      <br />
      before: {paragraph} <br />
      after: {terms.text()} <br/>
      (※見た目は変わっていないが、元の文章が文字区切りの配列になっている)
      <br />
    </div>
  );
}

export default CompromiseTemplate;