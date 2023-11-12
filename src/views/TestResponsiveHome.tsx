import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Template from '../pages/template';
import MediaQuery from "react-responsive";

export function TestResponsiveHome() {


  return (
    <div>
      <h2> This is template page!!</h2>
      <Template />
      <Template />
      <Template />
    </div>
  )
}

export default TestResponsiveHome