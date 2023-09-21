import '../../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

export function ExplainDrawing() {
  const paragraphStyle = {
    lineHeight: '0px', // 任意のピクセル数を指定
  };

  return (
    <div>
      <br />
      <p style={paragraphStyle}>0~8: 描画する感情の色の切り替え</p>
      <p style={paragraphStyle}>s: スポイト機能(現在未動作)</p>
      <p style={paragraphStyle}>e: キャンバスのスクリーンショットの保存</p>
      <p style={paragraphStyle}>m: 描画インクの移動の切り替え</p>
      <p style={paragraphStyle}>+/-: 描画サイズの拡大縮小</p>
    </div>
  )
}

export default ExplainDrawing