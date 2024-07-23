import React, { useState } from 'react';
import '../App.css';
import { evaluateRecommendColorSchemes } from '../pages/ColorRecommendation/EvaluateIsColorPaintNext';
import { IS_EVALUATE_TIMING_DRAW_COLOR, SIM_VALUE_SAME_COLOR, VARIATIONS_LIGHTNESS_DIFF } from '../config/constants';


// 引数で受け取る評価基準で評価したデータを保存する関数
function downloadEvaluateJson(SAME: number, TIME: number[], LIGHT: number[], WEIGHT: number, setJsonURL: React.Dispatch<React.SetStateAction<string | null>>) {

  // 閾値を基に評価したデータを保存
  let jsonData = evaluateRecommendColorSchemes(SAME, TIME, LIGHT, WEIGHT);

  // 新しいBlobを作成
  const blobData = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json',
  });
  const newJsonURL = URL.createObjectURL(blobData);

  // Stateを更新してURLを更新
  setJsonURL(newJsonURL);

  let timingStrArray = "";
  let lighnessDiffStrArray = "";

  for (let i = 0; i < TIME.length; i++) {
    timingStrArray += TIME[i];

    if (i != (TIME.length - 1)) { timingStrArray += ", "; }
  }
  for (let i = 0; i < LIGHT.length; i++) {
    lighnessDiffStrArray += LIGHT[i];
    if (i != (LIGHT.length - 1)) { lighnessDiffStrArray += ", "; }
  }

  // pythonでファイルを読み込めるファイル名が([0, 1, 2])のように半角スペースになっているので半角スペースを挟んで保存
  const FILE_NAME = "recall@k_SAME=" + SAME + "_TIME=[" + timingStrArray + "]_LIGHT=[" + lighnessDiffStrArray + "]_WEIGHT=" + WEIGHT*100;
  //const FILE_NAME = "recall@k_SAME=" + SIM_VALUE_SAME_COLOR + "_TIME=[" + timingStrArray + "]_LIGHT=[" + lighnessDiffStrArray + "]";

  // 自動でダウンロードリンクをクリックしてJSONファイルをダウンロード
  const link = document.createElement('a');
  link.href = newJsonURL;
  link.download = FILE_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ButtonEvaluateRecommendColors: React.FC = () => {

  const [jsonURL, setJsonURL] = useState<string | null>(null);

  const handleClick = () => {
    //downloadEvaluateJson(SIM_VALUE_SAME_COLOR ,IS_EVALUATE_TIMING_DRAW_COLOR, VARIATIONS_LIGHTNESS_DIFF, setJsonURL);

    // 明度のバリエーションの差
    downloadEvaluateJson(10, [0, 1, 2], [], 0.5, setJsonURL);
    downloadEvaluateJson(10, [0, 1, 2], [10], 0.5, setJsonURL);
    downloadEvaluateJson(10, [0, 1, 2], [20], 0.5, setJsonURL);
    //downloadEvaluateJson(10 ,[0,1,2], [10, 20], setJsonURL);

    // 同一色判定の閾値の差
    downloadEvaluateJson(5, [0, 1, 2], [20], 0.5, setJsonURL);
    //downloadEvaluateJson(10, [0, 1, 2], [20], 0.5, setJsonURL); // 明度のバリエーションで実行済
    downloadEvaluateJson(15, [0, 1, 2], [20], 0.5, setJsonURL);

    // 描画タイミングによる差
    downloadEvaluateJson(10, [0], [20], 0.5, setJsonURL);
    downloadEvaluateJson(10, [1], [20], 0.5, setJsonURL);
    downloadEvaluateJson(10, [2], [20], 0.5, setJsonURL);
    //downloadEvaluateJson(10, [0, 1, 2], [20], 0.5, setJsonURL); // 明度のバリエーションで実行済

    // 配色同士の相違度と配色の使用率の重みによる差
    downloadEvaluateJson(10, [0, 1, 2], [20], 0, setJsonURL);
    downloadEvaluateJson(10, [0, 1, 2], [20], 0.25, setJsonURL);
    //downloadEvaluateJson(10, [0, 1, 2], [20], 0.5, setJsonURL); // 明度のバリエーションで実行済
    downloadEvaluateJson(10, [0, 1, 2], [20], 0.75, setJsonURL);
    downloadEvaluateJson(10, [0, 1, 2], [20], 1, setJsonURL);
    
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>evaluate</button>
    </div>
  );
}

export default ButtonEvaluateRecommendColors;
