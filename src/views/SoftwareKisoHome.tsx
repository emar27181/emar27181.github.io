import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import MatchBoGame from '../pages/MatchBoGame';

export function SoftwareKisoHome() {


  return (
    <div>
      <MatchBoGame />
    </div>
  )
}

export default SoftwareKisoHome