import React, { useState } from 'react';

const TestReceiveDataTDD = () => {
  //console.log('This is TestReceiveDataTDD.tsx');
  const [message, setMessage] = useState('');

  const receiveData = async () => {
    const response = await fetch('http://localhost:5000/api/send-data', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
  };

  console.log("message(receive): " + message );

  return (
    <div>
      <button onClick={receiveData}>Receive Data</button>
      <p>{message}</p>
    </div>
  );
};

export default TestReceiveDataTDD;
