import React, { useState } from 'react';
//import { orderUsedColorsAmount, recommendedColorSchemeAmount } from '../pages/ColorRecommendation/CalculateRecommendColors';
import { filteredOrderUsedColorsAmount, filteredRecommendedColorSchemeAmount, similarityValues } from '../pages/ColorRecommendation/CalculateRecommendColors';
import { LOAD_USED_COLOR_NUMBER, LOAD_USED_COLOR_SCHEME_NUMBER } from '../config/constants.dev';
import { ColorAmount } from '../utils/ColorAmount';

const fileName = 'colorScheme';

interface DataRecommendColorAmount {
  "similarityValue": number;
  "colorsAmount": number[] | { color: string; amount: number; }[];
}


function addSimilarityValuesTorecommendColorsAmount(colorsAmount: number[][] | { color: string; amount: number; }[][]) {
  let dataColorsAmount: DataRecommendColorAmount[] = [];
  for (let i = 0; i < colorsAmount.length; i++) {
    let addData: DataRecommendColorAmount = {
      "similarityValue": Math.round(similarityValues[i]),
      "colorsAmount": colorsAmount[i]
    }
    dataColorsAmount.push(addData);
    //console.log("dataRecommendColorsAmount[" + i + "] = " + dataColorsAmount[i]);
  }
  return dataColorsAmount;
}

const ButtonSaveColorScheme: React.FC = () => {
  const [jsonURL, setJsonURL] = useState<string | null>(null);
  const LOAD_NUMBER = [LOAD_USED_COLOR_SCHEME_NUMBER, LOAD_USED_COLOR_NUMBER];

  const handleExport = () => {

    let dataRecommendColorsAmount: DataRecommendColorAmount[] = [];
    dataRecommendColorsAmount = addSimilarityValuesTorecommendColorsAmount(filteredRecommendedColorSchemeAmount)

    // 最新のデータを取得
    const jsonData = {
      LOAD_NUMBER,
      filteredOrderUsedColorsAmount,
      dataRecommendColorsAmount,
      //filteredRecommendedColorSchemeAmount,
    };

    // 新しいBlobを作成
    const blobData = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    const newJsonURL = URL.createObjectURL(blobData);

    // Stateを更新してURLを更新
    setJsonURL(newJsonURL);

    // 自動でダウンロードリンクをクリックしてJSONファイルをダウンロード
    const link = document.createElement('a');
    link.href = newJsonURL;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className="update-button" onClick={handleExport}>Export</button>
      {jsonURL && (
        <a href={jsonURL} download={`${fileName}.json`} style={{ display: 'none' }} />
      )}
    </div>
  );
};

export default ButtonSaveColorScheme;
