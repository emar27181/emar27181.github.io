import compromise from 'compromise';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function FormTemplate() {
  /*
  const paragraph = 'This is a sample sentence by tsx. This is second sentence. This is third sentence.';
  console.log("before: \n" + paragraph);

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();

  console.log("after: ");

  console.log(sentences.map(sentence => sentence.text()));
  console.log(terms.map(term => term.text()));
  */


  const [colorInput, setColorInput] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Color input:', colorInput);
  };

  //return <p>{sentences}</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="colorInput">
        <Form.Label>Color Input</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a color"
          value={colorInput}
          onChange={(event) => setColorInput(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormTemplate;