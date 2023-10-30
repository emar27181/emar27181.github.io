//参考: https://qiita.com/nemutas/items/32ce13ae31360877baa5

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS, NormalizedLandmarkListList, Results } from '@mediapipe/hands';
import { ReturnCanvasSize } from './Reserch/Canvas';

/**
 * cnavasに描画する
 * @param ctx canvas context
 * @param results 手の検出結果
 */

export const TestDrawCanvas = (ctx: CanvasRenderingContext2D, results: Results) => {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  ctx.save()
  ctx.clearRect(0, 0, width, height)
  // canvas の左右反転
  ctx.scale(-1, 1)
  ctx.translate(-width, 0)
  // capture image の描画
  ctx.drawImage(results.image, 0, 0, width, height)
  // 手の描画
  if (results.multiHandLandmarks) {
    // 骨格の描画
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 })
      drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 2 })
    }
    // 円の描画
    //drawCircle(ctx, results.multiHandLandmarks)
  }
  ctx.restore()
}

export function GetTrackingData(ctx: CanvasRenderingContext2D, handLandmarks: NormalizedLandmarkListList): number[][] {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  const CANVAS_SIZE = ReturnCanvasSize();
  const CANVAS_WIDTH = CANVAS_SIZE[0];
  const CANVAS_HEIGHT = CANVAS_SIZE[1];
  const RATIO_X = CANVAS_WIDTH / width // 描画キャンバスとの比率
  const RATIO_Y = CANVAS_HEIGHT / height // 描画キャンバスとの比率
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, x4 = 0, y4 = 0, x5 = 0, y5 = 0
  let firstHand = [0, 0, 0, 0], secondHand = [0, 0, 0, 0];

  if (handLandmarks.length >= 1 && handLandmarks[0].length > 8) {
    //一つ目の手の認識
    //人差し指の座標の取得
    x1 = handLandmarks[0][8].x * width
    x1 = (width - x1) * RATIO_X // x座標を反転(左右反転)
    y1 = handLandmarks[0][8].y * height * RATIO_Y
    //親指の座標の取得
    x2 = handLandmarks[0][4].x * width
    x2 = (width - x2) * RATIO_X// x座標を反転(左右反転)
    y2 = handLandmarks[0][4].y * height * RATIO_Y
    //firstHand = [x1, y1, x2, y2];
    //中指の座標の取得
    x3 = handLandmarks[0][12].x * width
    x3 = (width - x3) * RATIO_X// x座標を反転(左右反転)
    y3 = handLandmarks[0][12].y * height * RATIO_Y
    //薬指の座標の取得
    x4 = handLandmarks[0][16].x * width
    x4 = (width - x4) * RATIO_X// x座標を反転(左右反転)
    y4 = handLandmarks[0][16].y * height * RATIO_Y
    //小指の座標の取得
    x5 = handLandmarks[0][20].x * width
    x5 = (width - x5) * RATIO_X// x座標を反転(左右反転)
    y5 = handLandmarks[0][20].y * height * RATIO_Y
    firstHand = [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5];

    //二つ目の手の認識
    if (handLandmarks.length === 2 && handLandmarks[0].length > 8 && handLandmarks[1].length > 8) {
      //人差し指の座標の取得
      x1 = handLandmarks[1][8].x * width
      x1 = (width - x1) * RATIO_X// x座標を反転(左右反転)
      y1 = handLandmarks[1][8].y * height * RATIO_Y
      //親指の座標の取得
      x2 = handLandmarks[1][4].x * width
      x2 = (width - x2) * RATIO_X // x座標を反転(左右反転)
      y2 = handLandmarks[1][4].y * height * RATIO_Y
      //中指の座標の取得
      x3 = handLandmarks[1][12].x * width
      x3 = (width - x3) * RATIO_X// x座標を反転(左右反転)
      y3 = handLandmarks[1][12].y * height * RATIO_Y
      //薬指の座標の取得
      x4 = handLandmarks[0][16].x * width
      x4 = (width - x4) * RATIO_X// x座標を反転(左右反転)
      y4 = handLandmarks[0][16].y * height * RATIO_Y
      //小指の座標の取得
      x5 = handLandmarks[0][20].x * width
      x5 = (width - x5) * RATIO_X// x座標を反転(左右反転)
      y5 = handLandmarks[0][20].y * height * RATIO_Y
      secondHand = [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5]
    }
  }
  //return [[x1, y1, x2, y2], [x3, y3, x4, y4]]
  return [firstHand, secondHand]
}

export function GetCanvasSize(ctx: CanvasRenderingContext2D) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  return [width, height]
}

/**
 *  人差し指の先端と人差し指の先端の間に円を描く
 * @param ctx
 * @param handLandmarks
 */

/*
const drawCircle = (ctx: CanvasRenderingContext2D, handLandmarks: NormalizedLandmarkListList) => {
  if (handLandmarks.length === 2 && handLandmarks[0].length > 8 && handLandmarks[1].length > 8) {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const [x1, y1] = [handLandmarks[0][8].x * width, handLandmarks[0][8].y * height]
    const [x2, y2] = [handLandmarks[1][8].x * width, handLandmarks[1][8].y * height]
    const x = (x1 + x2) / 2
    const y = (y1 + y2) / 2
    const r = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / 2

    ctx.strokeStyle = '#0082cf'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, true)
    ctx.stroke()
  }
}
*/

export default TestDrawCanvas