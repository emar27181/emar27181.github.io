import '../../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

export function ExplainDrawing() {

  return (
    <div >
      <br />

      <table border={1}>
        <tr>
          <th>機能</th>
          <th>キー</th>
        </tr>
        <tr>
          <td>描画する感情の色の切り替え</td>
          <td>0~8</td>
        </tr>
        <tr>
          <td>ポーズモードの切り替え</td>
          <td>p</td>
        </tr>
        <tr>
          <td>移動体の直線移動の切り替え</td>
          <td>m</td>
        </tr>
        <tr>
          <td>移動体の重力移動の切り替え</td>
          <td>g</td>
        </tr>
        <tr>
          <td>マウスモードの切り替え(描画モード/重力モード/追加モード)</td>
          <td>c</td>
        </tr>
        <tr>
          <td>背景の更新の切り替え</td>
          <td>u</td>
        </tr>
        <tr>
          <td>移動体の不透明度変更モードの待機</td>
          <td>a</td>
        </tr>
        <tr>
          <td>背景の不透明度変更モードの待機</td>
          <td>b</td>
        </tr>
        <tr>
          <td>描画の太さ変更モードの待機</td>
          <td>w</td>
        </tr>
        <tr>
          <td>表示の基準値変更モードの待機</td>
          <td>v</td>
        </tr>
        <tr>
          <td>対応する変更モードの調整</td>
          <td>+/-</td>
        </tr><tr>
          <td>描画図形を円に変更</td>
          <td>;</td>
        </tr><tr>
          <td>描画図形を四角に変更</td>
          <td>:</td>
        </tr><tr>
          <td>描画図形を三角に変更</td>
          <td>]</td>
        </tr><tr>
          <td>キャンバスのスクリーンショットの保存</td>
          <td>e</td>
        </tr>

      </table>
    </div >
  )
}

export default ExplainDrawing