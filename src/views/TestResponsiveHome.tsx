import '../App.css'
import React, { useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import MediaQuery from "react-responsive";
import { useMediaQuery } from 'react-responsive';
import TestPageForDesktopComponent from '../pages/TestPageForDesktopComponet';
import TestPageForMobileComponent from '../pages/TestPageForMobileComponent';


let isDesktop = false;
export function TestResponsiveHome() {


  useEffect(() => {
    // ウィンドウのサイズが変更されたときに実行されるハンドラーを登録
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      isDesktop = windowWidth > windowHeight;

      // ここで取得した windowWidth と windowHeight を使って必要な処理を行う
      console.log('Window Width:', windowWidth);
      console.log('Window Height:', windowHeight);
      console.log("isDesktop: ", isDesktop);
    };

    // コンポーネントがマウントされたときに初回実行
    handleResize();

    // ウィンドウのリサイズイベントにハンドラーを追加
    window.addEventListener('resize', handleResize);

    // コンポーネントがアンマウントされたときにハンドラーをクリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空の依存配列を渡して初回のみ実行されるようにする

  //const isDesktop: boolean = useMediaQuery({ query: '(min-width: 768px)' })
  console.log("isDesktop: ", isDesktop);

  return (
    <div>
      {/* 768px以上の時は、デスクトップ用のコンポーネントを表示 */}
      {isDesktop && <TestPageForDesktopComponent />}
      {/* 768px未満の時は、 モバイル用のコンポーネントを表示 */}
      {!isDesktop && <TestPageForMobileComponent />}
    </div>
  )
}

export default TestResponsiveHome