import compromise from 'compromise';
const DEBUG = true;

export function CompromiseTemplate() {
  const paragraph = "This is template paragraph. This is second paragraph. Is is verbs.";

  if (DEBUG) { console.log("before: \ninput: " + paragraph); }

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();
  const doc = compromise(paragraph); //doc: 解析結果のオブジェクト
  const nouns1 = doc.nouns().map(noun => noun.text());
  const nouns2 =doc.nouns().out('array');
  const verbs = doc.verbs().map(verb => verb.text());
  const adverbs = doc.adverbs().map(adverb => adverb.text());
  const prepositions = doc.prepositions().map(preposition => preposition.text());
  const adjectives = doc.adjectives().map(adjective => adjective.text());

  if (DEBUG) {
    console.log("after: ");
    //console.log(sentences.map(sentence => sentence.text()));
    //console.log(terms.map(term => term.text()));
    //console.log(terms.text());
    //console.log(firstChar);
    //console.log("doc: " + doc);
    console.log("nouns1: " + nouns1);
    //console.log("nouns2: " + nouns2);
    console.log("verbs: " + verbs);
    console.log("adverbs: " + adverbs);
    console.log("prepositions: " + prepositions);
    console.log("new paragraph: " + `The ${adjectives} ${nouns1} ${verbs} over the fence.`);
  }

  return (
    <div>
      This is test text.
    </div>
  );
}

export default CompromiseTemplate;