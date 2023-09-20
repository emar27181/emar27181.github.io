import '../../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
const DEBUG = false;

export function DisplayInfo() {
  //console.log('This is DisplayInfo.tsx');


  fetchData();
  let jsonData, jsonDataString: string = "";
  let testString: string = "This is testString";

  // バックエンドからJSONデータの取得
  async function fetchData() {

    try {
      const response = await axios.get('http://localhost:5000/api/input-sentence-now');

      jsonData = response.data;
      jsonDataString = JSON.stringify(jsonData);
      if (DEBUG) {
        //console.log("response:" + JSON.stringify(response));
        //console.log(response);
        //console.log("jsonData: " + jsonData);
        //console.log("typeof(jsonData): " + typeof (jsonData));
        console.log("jsonDataString: " + jsonDataString);
        //console.log("typeof(jsonDataString): " + typeof (jsonDataString));
      }

    } catch (error) {
      console.error('エラーが発生しました:', error);
    }

  }

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