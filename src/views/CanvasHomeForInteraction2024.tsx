import '../App.css'
import React from 'react';
import Canvas from '../pages/Reserch/Canvas';
import DisplayDrawingInfo from '../pages/Reserch/DisplayDrawingInfo';
import DisplayEmotionColorRatio from '../pages/Reserch/DisplayEmotionColorRatio';
import DisplayGravityPlace from '../pages/Reserch/DisplayGravityPlace';
import DisplayUsedColorRatio from '../pages/ColorRecommendation/DisplayUsedColorRatio';
import OperateGuiControl from '../pages/Reserch/OperateGuiControl';
import DisplayCanvasFilter from '../pages/ColorRecommendation/DisplayCanvasFilter';
import ColorGanerateRe from '../pages/ColorRecommendation/ColorGenerate';
import AllScrollLock from '../components/AllScrollLock';
import DisplayUsedColorWheel from '../pages/ColorRecommendation/DisplayUsedColorWheel';
import DisplayUsedColorTone from '../pages/ColorRecommendation/DisplayUsedColorTone';
import DisplayRecommendColorsPalette from '../pages/ColorRecommendation/DisplayRecommendColorsPalette';
let isCanvasHome = false;

export function CanvasHomeForInteraction2024() {

  isCanvasHome = true;

  return (
    <div>
      <AllScrollLock />
      <div style={{ display: 'flex', margin: 0 }}>
        <div>
          <ColorGanerateRe />
          <OperateGuiControl />
          {/*}
          <th>色相，色調(トーン)を変更したい場合は<br />長押ししてください．</th>
          */}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <AllScrollLock />
          {Canvas()}
        </div>
        <div>
          <DisplayUsedColorWheel />
          {/*<DisplayRecommendColorsPalette />*/}
          <table border={1}>
            <tr>
              <th>白</th>
              <th>描画待機中の色相</th>
            </tr>
            <tr>
              <th>黒</th>
              <th>推定された配色</th>
            </tr>
            <tr>
              <th>赤/緑</th>
              <th>推薦された配色技法</th>
            </tr>
          </table>

        </div>

        <div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "hue")}
            {DisplayUsedColorRatio("canvas", 0, "hue")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "saturation")}
            {DisplayUsedColorRatio("canvas", 0, "saturation")}
          </div>
          <div style={{ display: 'flex', margin: 0 }}>
            {DisplayCanvasFilter("canvas", 0, "lightness")}
            {DisplayUsedColorRatio("canvas", 0, "lightness")}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CanvasHomeForInteraction2024
export function ReturnIsCanvasHome() { return isCanvasHome; }