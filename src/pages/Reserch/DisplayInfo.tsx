import '../../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

export function DisplayInfo() {
  //console.log('This is DisplayInfo.tsx');


  fetchData();
  let jsonData, jsonDataString: string = "";
  let testString: string = "This is testString";

  // バックエンドからJSONデータの取得
  async function fetchData() {

    try {
      const response = await axios.get('http://localhost:5000/api/input-sentence-now');
      //console.log("response:" + JSON.stringify(response));
      //console.log(response);
      jsonData = response.data;;
      //console.log("jsonData: " + jsonData);
      //console.log("typeof(jsonData): " + typeof (jsonData));

      jsonDataString = JSON.stringify(jsonData);
      console.log("jsonDataString: " + jsonDataString);
      //console.log("typeof(jsonDataString): " + typeof (jsonDataString));


    } catch (error) {
      console.error('エラーが発生しました:', error);
    }

  }

  /*
  const [message, setMessage] = useState('');
  
  const receiveData = async () => {
    const response = await fetch('http://localhost:5000/api/input-sentence-now', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
  };
  
  console.log("message(receive):\n" + message);
  const jsonMessage = JSON.stringify({ message });
  console.log("jsonMessage: " + jsonMessage);
  //fs.writeFileSync('OutputData.json', jsonMessage); //代入されたjson形式のメッセージのファイル出力が出来ない(2023/09/13)
  */

  return (
    <div>
      {/*<p>{"jsonData: " + JSON.stringify(jsonData)}</p>}
      {"jsonDataString: " + { jsonDataString }}
      <br />
      {/*"testString: " + testString*/}
      <a> ここに現在読み込まれている文章を表示させたいがバグってる...</a>

    </div>
  )
}

export default DisplayInfo