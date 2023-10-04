import '../../App.css'
import React from 'react';
import { useEffect, useState } from 'react';
const DEBUG = false;

export function DisplayInfo() {
  const [data, setData] = useState(""); // データを保存するための状態
  useEffect(() => {
    // Flaskのエンドポイントからデータを取得
    fetch("http://localhost:5000/api/input-sentence-now")
      .then((response) => response.text())
      .then((data) => {
        // 取得したデータを状態に保存
        setData(data);
      })
      .catch((error) => {
        console.error("データの取得エラー:", error);
      });
  }, []);

  return (
    <div>
      {"現在の入力文章:  " + data}
    </div>
  )
}

export default DisplayInfo