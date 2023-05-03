import compromise from 'compromise';
import Color from 'color';
const DEBUG = true;

export function CompromiseTemplate() {
  const paragraph = "Bright reds is a hoge. deep green hoge the fuga. and clear blue";
  //const paragraph = "";
  let colorsArray: Array<Color> = [];
  let nounsArray: Array<string> = [];

  if (DEBUG) { console.log("before: \ninput: " + paragraph); }

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();
  const doc = compromise(paragraph);
  const nouns1 = doc.nouns().map(noun => noun.text());
  const nouns2: string = doc.nouns().out('array');
  nounsArray = doc.nouns().out('array');
  const verbs = doc.verbs().map(verb => verb.text());
  const adverbs = doc.adverbs().map(adverb => adverb.text());
  const prepositions = doc.prepositions().map(preposition => preposition.text());
  const adjectives = doc.adjectives().map(adjective => adjective.text());
  const colorNouns = doc.match('#Color').text();

  if (DEBUG) {
    console.log("colorsArray: " + colorsArray);
  }

  //確認用出力
  if (DEBUG) {
    console.log("after: ");
    //console.log(sentences.map(sentence => sentence.text()));
    //console.log(terms.map(term => term.text()));
    //console.log(terms.text());
    //console.log(firstChar);
    //console.log("doc: " + doc);
    console.log("nouns1: " + nouns1);
    //console.log("nouns2: " + nouns2);
    //console.log("verbs: " + verbs);
    //console.log("adverbs: " + adverbs);
    console.log("adjectives: " + adjectives);
    //console.log("prepositions: " + prepositions);
    //console.log("new paragraph: " + `The ${adjectives} ${nouns1} ${verbs} over the fence.`);
    //console.log("past paragraph: " + doc.sentences().toPastTense().out());
    //console.log("colorNouns: " + colorNouns);
    //console.log("nounsArray: ");
    //for(let i = 0; i < nounsArray.length; i++){console.log("[" + i + "]: " + nounsArray[i]);}
  }

  return (
    <div>
      nounsArray:
      {nounsArray.map((noun, i) => (
        <div>[{i}]: {noun}</div>
      ))}
    </div>
  );
}

export default CompromiseTemplate;