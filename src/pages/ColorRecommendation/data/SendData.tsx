import React, { useState } from 'react';
import { getColorInput } from '../FormDisplay';

const SendData = () => {
  console.log('This is TestSendDataTDD.tsx');
  const [message, setMessage] = useState('');
  let data = "This is initial text (TestSendDataTDD.tsx)";
  data = getColorInput();
  // console.log("data: " + data);

  const sendData = async () => {
    const response = await fetch('http://localhost:5000/api/receive-data', {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }) // フロントエンドから送信するデータ
    });

    const returndata = await response.json();
    setMessage(returndata.message);
  };


  console.log("message(return): " + message); // コンソール上に返ってきたデータを表示


  return (
    <div>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
};

export default SendData;
