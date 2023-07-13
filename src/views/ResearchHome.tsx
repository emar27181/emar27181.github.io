import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import BounceColorful from '../pages/BounceColorful';

export function ResearchHome() {


  return (
    <div>
      <h3>以下卒業研究用ページ</h3>
      <BounceColorful />
    </div>
  )
}

export default ResearchHome