//参考: https://qiita.com/nemutas/items/32ce13ae31360877baa5

import React, { useCallback, useEffect, useRef, VFC } from 'react';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { GetTrackingData, TestDrawCanvas } from './TestDrawCanvas';

let canvasCtx: CanvasRenderingContext2D;
let returnResults: Results;

export const TestHandsfree: VFC = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultsRef = useRef<any>(null)

  const onResults = useCallback(
    (results: Results) => {
      returnResults = results
      resultsRef.current = results
      canvasCtx = canvasRef.current!.getContext('2d')!
      TestDrawCanvas(canvasCtx, results)
      ReturnTrackingData();
    },
    []
  )

  useEffect(
    () => {
      const hands = new Hands(
        {
          locateFile: file => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
          }
        }
      )

      hands.setOptions(
        {
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        }
      )

      hands.onResults(onResults)

      if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
        const camera = new Camera(webcamRef.current.video!, {
          onFrame: async () => {
            await hands.send(
              {
                image: webcamRef.current!.video!
              }
            )
          },
          width: 1280,
          height: 720
        })

        camera.start()
      }
    },
    [onResults]
  )

  const OutputData = () => {
    const results = resultsRef.current as Results
    console.log(results.multiHandLandmarks)
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  }

  return (
    <div className={styles.container}>
      <Webcam audio={false} style={{ visibility: 'hidden' }} width={1280} height={720} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={OutputData}> Output Data </button>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  canvas: css`
    position: absolute;
    width: 1280px;
    height: 720px;
    background-color: #fff;
  `,

  buttonContainer: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,

  button: css`
    color: #fff;
    background-color: #0082cf;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
  `
}

export function ReturnTrackingData() {
  //console.log(GetTrackingData(canvasCtx, returnResults.multiHandLandmarks))
  let data = GetTrackingData(canvasCtx, returnResults.multiHandLandmarks)
  console.log("(data[0], data[1]) = ", data[0], data[1])
  return data;
}

export default TestHandsfree