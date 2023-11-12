import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';

export function TestPageForMobileComponent() {
  return (
    <div>
      <Template />
      <Template />
      <Template />
    </div>
  )
}

export default TestPageForMobileComponent