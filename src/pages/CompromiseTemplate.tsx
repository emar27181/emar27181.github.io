import compromise from 'compromise';

export function CompromiseTemplate() {
  const paragraph = 'This is a sample sentence by tsx. This is second sentence. This is third sentence.';
  console.log("before: \n" + paragraph);

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();

  console.log("after: ");
  /*
  sentences.forEach((sentence) =>{
    console.log("after: " + sentence.text());
  });
  */
  console.log(sentences.map(sentence => sentence.text()));
  console.log(terms.map(term => term.text()));
  
  //return <p>{sentences}</p>;

  return (
    <div>
      {/* JSX elements here */}
    </div>
  );
}

export default CompromiseTemplate;