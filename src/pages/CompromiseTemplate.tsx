import compromise from 'compromise';
const DEBUG = false;

export function CompromiseTemplate() {
  const paragraph = "This is template paragraph";

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

  return (
    <div>
      This is test text.
    </div>
  );
}

export default CompromiseTemplate;