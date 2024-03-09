import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import GyroCanvas from '../pages/GyroCanvas/GyroCanvas';;

export function GyroCanvasHome() {
  return (
    <div>
      <GyroCanvas />
    </div>
  )
}

export default GyroCanvasHome