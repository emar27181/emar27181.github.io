import compromise from 'compromise';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

let colorInputGetter = "this is initial input";

export function FormTemplate() {
  const [colorInput, setColorInput] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Color input:', colorInput);
    colorInputGetter = colorInput;
  };

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

export function getColorInput(){
  return colorInputGetter;
}

export default FormTemplate;