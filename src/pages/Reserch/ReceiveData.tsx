import React, { useState } from 'react';
import * as fs from 'fs';

const ReceiveData = () => {
  //console.log('This is TestReceiveDataTDD.tsx');
  const [message, setMessage] = useState('');

  const receiveData = async () => {
    const response = await fetch('http://localhost:5000/api/send-data', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
  };

  console.log("message(receive):\n" + message);
  const jsonMessage = JSON.stringify({ message }); 
  console.log("jsonMessage: " + jsonMessage);
  //fs.writeFileSync('OutputData.json', jsonMessage); //代入されたjson形式のメッセージのファイル出力が出来ない(2023/09/13)

  return (
    <div>
      <button onClick={receiveData}>Receive Data</button>
      <p>{message}</p>
    </div>
  );
};

export default ReceiveData;
