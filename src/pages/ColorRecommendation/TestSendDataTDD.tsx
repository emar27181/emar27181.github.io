import React, { useState } from 'react';

const TestSendDataTDD = () => {
  console.log('This is TestSendDataTDD.tsx');
  const [formData, setFormData] = useState('');
  let data = "this is test data from TestSendDataTDD.tsx";

  const postData = async () => {
    const response = await fetch('http://localhost:5000/api/receive-data', {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }) // フロントエンドから送信するデータ
    })
  };


  return (
    <div>
      <button onClick={postData}>Post Data</button>
    </div>
  );
};

export default TestSendDataTDD;
