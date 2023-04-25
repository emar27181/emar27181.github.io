import compromise from 'compromise';

export function CompromiseTemplate() {
  const paragraph = 'This is a sample sentence by tsx. This is second sentence. This is third sentence.';
  console.log("before: " + paragraph);

  const sentences = compromise(paragraph).sentences();
  sentences.forEach((sentence) =>{
    console.log("after: " + sentence.text());
  });
  
  //return <p>{sentences}</p>;
}

export default CompromiseTemplate;