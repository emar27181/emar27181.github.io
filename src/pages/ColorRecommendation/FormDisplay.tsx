import compromise from 'compromise';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

let colorInputGetter = "this is initial input";

export function FormDisplay() {
  const [colorInput, setColorInput] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //console.log('Color input:', colorInput);
    colorInputGetter = colorInput;
  };

  function handleClick() {
    console.log('Button clicked');
    console.log('colorInput:', colorInput);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="colorInput">
        <Form.Control
          type="text"
          placeholder="enter"
          value={colorInput}
          onChange={(event) => setColorInput(event.target.value)}
        />
      </Form.Group>

      <Button onClick={handleClick} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export function getColorInput() {
  return colorInputGetter;
}

export default FormDisplay;