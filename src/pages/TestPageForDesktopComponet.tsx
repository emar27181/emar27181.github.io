import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';

export function TestPageForDesktopComponent() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Template />
        <Template />
        <Template />
      </div >
    </div>
  )
}

export default TestPageForDesktopComponent