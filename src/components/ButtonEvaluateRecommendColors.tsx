import React, { useState } from 'react';
import '../App.css';
import { evaluateRecommendColorSchemes } from '../pages/ColorRecommendation/EvaluateIsColorPaintNext';
import { IS_EVALUATE_TIMING_DRAW_COLOR, SIM_VALUE_SAME_COLOR } from '../config/constants';

const ButtonEvaluateRecommendColors: React.FC = () => {

  const [jsonURL, setJsonURL] = useState<string | null>(null);

  const handleClick = () => {
    let jsonData = evaluateRecommendColorSchemes();

    // 新しいBlobを作成
    const blobData = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    const newJsonURL = URL.createObjectURL(blobData);

    // Stateを更新してURLを更新
    setJsonURL(newJsonURL);

    let timingStrArray = "";
    for (let i = 0; i < IS_EVALUATE_TIMING_DRAW_COLOR.length; i++) {
      timingStrArray += IS_EVALUATE_TIMING_DRAW_COLOR[i];

      if (i != (IS_EVALUATE_TIMING_DRAW_COLOR.length - 1)) { timingStrArray += ", "; }
    }
    const FILE_NAME = "recall@k_SAME=" + SIM_VALUE_SAME_COLOR + "_TIME=[" + timingStrArray + "]_LIGHT=[-20, 20]";

    // 自動でダウンロードリンクをクリックしてJSONファイルをダウンロード
    const link = document.createElement('a');
    link.href = newJsonURL;
    link.download = FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>evaluate</button>
    </div>
  );
}

export default ButtonEvaluateRecommendColors;
