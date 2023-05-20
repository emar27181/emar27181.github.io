import React, { useState } from 'react';

const TestReceiveDataTDD = () => {
  console.log('This is TestReceiveDataTDD.tsx');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
  };

  console.log("message: " + message);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{message}</p>
    </div>
  );
};

export default TestReceiveDataTDD;
