import '../../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import ReturnImageInfo from '../Reserch/ReturnImageInfo';
import DisplayCanvasFilter from './DisplayCanvasFilter';
import DisplayUsedColorRatio from './DisplayUsedColorRatio';

export function DisplayCanvasAndColorRatio(loadNumber: number) {
  return (
    <div style={{ display: 'flex' }}>
      {ReturnImageInfo(loadNumber)}
      <div>
        <div style={{ display: 'flex', margin: 0 }}>
          {DisplayCanvasFilter("image", loadNumber, "hue")}
          {DisplayUsedColorRatio("image", loadNumber, "hue")}
        </div>
        <div style={{ display: 'flex', margin: 0 }}>
          {DisplayCanvasFilter("image", loadNumber, "saturation")}
          {DisplayUsedColorRatio("image", loadNumber, "saturation")}
        </div>
        <div style={{ display: 'flex', margin: 0 }}>
          {DisplayCanvasFilter("image", loadNumber, "lightness")}
          {DisplayUsedColorRatio("image", loadNumber, "lightness")}
        </div>
      </div>
    </div>
  )
}

export default DisplayCanvasAndColorRatio