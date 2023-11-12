import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import MediaQuery from "react-responsive";
import { useMediaQuery } from 'react-responsive';
import TestPageForDesktopComponent from '../pages/TestPageForDesktopComponet';
import TestPageForMobileComponent from '../pages/TestPageForMobileComponent';

export function TestResponsiveHome() {

  const isDesktop: boolean = useMediaQuery({ query: '(min-width: 768px)' })

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