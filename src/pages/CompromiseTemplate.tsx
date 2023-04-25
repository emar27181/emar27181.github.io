import compromise from 'compromise';

export function CompromiseTemplate() {
  const paragraph = 'This is a sample sentence by tsx. This is second sentence. This is third sentence.';
  console.log("before: \n" + paragraph);

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();

  console.log("after: ");
  console.log(sentences.map(sentence => sentence.text()));
  console.log(terms.map(term => term.text()));
  console.log(firstChar);

  //return <p>{sentences}</p>;

  return (
    <div>
      {/* JSX elements here */}
    </div>
  );
}

export default CompromiseTemplate;