import compromise from 'compromise';

export function Test2() {
  const sentence = 'This is a sample sentence.(tsx)';
  const firstWord = compromise(sentence).first().text();
  console.log(firstWord); // "This"
  return <p>{firstWord}</p>;
}

export default Test2;