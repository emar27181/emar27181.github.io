import React, { useState } from 'react';
import { getColorInput } from '../FormDisplay';

let data = "This is initial data"
let dataArray: string[] = [];

const SendData = () => {
  console.log('This is TestSendDataTDD.tsx');
  const [message, setMessage] = useState('');

  // console.log("getColorInput: " + getColorInput());
  // 読み込みバグのせいで2回ずつデータが格納されてしまっている
  dataArray.push(getColorInput());
  console.log("dataArray(num=" + dataArray.length + "):\n" + dataArray);
  data = dataArray[dataArray.length - 1]; //dataArrayの最後尾を送信データとして設定
  console.log("data: " + data);

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
      <button onClick={sendData}>Send Data</button><br />
      ※一つの入力データしか保持できない(2023/05/23時点)<br />
    </div>
  );
};

export default SendData;
