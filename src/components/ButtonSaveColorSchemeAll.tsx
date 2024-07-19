import React, { useState } from 'react';
import { CreateRecommendColorsAll } from '../pages/ColorRecommendation/CreateRecommendColorsAll';

const fileName = 'recommendColorSchemesAll';


// 引数で受け取る基準で生成した推薦配色群を保存する関数
function downloadColorSchemesJson(loadIllustcount: number, loadTimingMax: number, variation_lightness_diffs: number[], setJsonURL: React.Dispatch<React.SetStateAction<string | null>>) {


  let jsonData = CreateRecommendColorsAll(loadIllustcount, loadTimingMax, variation_lightness_diffs);

  // 新しいBlobを作成
  const blobData = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json',
  });
  const newJsonURL = URL.createObjectURL(blobData);

  // Stateを更新してURLを更新
  setJsonURL(newJsonURL);

  let lightness_diffs_str = "";
  for (let i = 0; i < variation_lightness_diffs.length; i++) {
    lightness_diffs_str += "_" + variation_lightness_diffs[i];
  }

  const FILE_NAME = "outputRecommendColorsSchemeAll" + "_LIGHT=" + lightness_diffs_str;

  // 自動でダウンロードリンクをクリックしてJSONファイルをダウンロード
  const link = document.createElement('a');
  link.href = newJsonURL;
  link.download = FILE_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const ButtonSaveColorSchemeAll: React.FC = () => {
  const [jsonURL, setJsonURL] = useState<string | null>(null);

  const handleExport = () => {
    console.log("ExportAll is clicked");

    //downloadColorSchemesJson(10, 3, [], setJsonURL);
    //downloadColorSchemesJson(10, 3, [-10, 10], setJsonURL);
    downloadColorSchemesJson(10, 3, [-20, 20], setJsonURL);
    downloadColorSchemesJson(10, 3, [-10, 10, -20, 20], setJsonURL);
  };

  return (
    <div>
      <button className="update-button" onClick={handleExport}> ExportAll</button>
      {jsonURL && (
        <a href={jsonURL} download={`${fileName}.json`} style={{ display: 'none' }} />
      )}
    </div>
  );
};

export default ButtonSaveColorSchemeAll;
