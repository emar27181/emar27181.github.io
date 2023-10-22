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
      {/*<p style={paragraphStyle}>s: スポイト機能(現在未動作)</p>*/}
      <p style={paragraphStyle}>p: ポーズモードの切り替え</p>
      <p style={paragraphStyle}>m: 移動体の直線移動の切り替え</p>
      <p style={paragraphStyle}>g: 移動体の重力移動の切り替え</p>
      <p style={paragraphStyle}>c: マウスモードの切り替え(描画モード/重力モード)</p>
      <p style={paragraphStyle}>u: 背景の更新の切り替え</p>
      <p style={paragraphStyle}>a: 移動体の不透明度変更モードの待機</p>
      <p style={paragraphStyle}>b: 背景の不透明度変更モードの待機</p>
      <p style={paragraphStyle}>w: 描画の太さ変更モードの待機</p>
      <p style={paragraphStyle}>v: 表示の基準値変更モードの待機 </p>
      <p style={paragraphStyle}>+/-: 対応する変更モードの調整</p>
      <p style={paragraphStyle}>j: 描画図形を円に変更</p>
      <p style={paragraphStyle}>k: 描画図形を四角に変更</p>
      <p style={paragraphStyle}>l: 描画図形を三角に変更</p>
      <p style={paragraphStyle}>e: キャンバスのスクリーンショットの保存</p>

    </div>
  )
}

export default ExplainDrawing