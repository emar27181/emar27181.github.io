import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import MatchBoGame from '../pages/MatchBoGame';
import DisplayMatchBoLog from '../pages/DisplayMatchBoLog';

export function SoftwareKisoHome() {


  return (
    <div>
      <MatchBoGame />
      <DisplayMatchBoLog/>
    </div>
  )
}

export default SoftwareKisoHome