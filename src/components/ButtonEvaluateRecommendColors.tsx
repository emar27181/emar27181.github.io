import React, { useState } from 'react';
import '../App.css';
import { evaluateRecommendColorSchemes } from '../pages/ColorRecommendation/EvaluateIsColorPaintNext';
import { IS_EVALUATE_TIMING_DRAW_COLOR, SIM_VALUE_SAME_COLOR, VARIATIONS_LIGHTNESS_DIFF } from '../config/constants';


// 引数で受け取る評価基準で評価したデータを保存する関数
function downloadEvaluateJson(SAME: number, TIME: number[], LIGHT: number[], setJsonURL: React.Dispatch<React.SetStateAction<string | null>>){
  let jsonData = evaluateRecommendColorSchemes();

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
  

  const FILE_NAME = "recall@k_SAME=" + SAME + "_TIME=[" + TIME + "]_LIGHT=[" + LIGHT + "]";
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
    downloadEvaluateJson(SIM_VALUE_SAME_COLOR ,IS_EVALUATE_TIMING_DRAW_COLOR, VARIATIONS_LIGHTNESS_DIFF, setJsonURL);
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>evaluate</button>
    </div>
  );
}

export default ButtonEvaluateRecommendColors;
