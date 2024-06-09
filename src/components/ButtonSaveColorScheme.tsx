import React, { useState } from 'react';
//import { orderUsedColorsAmount, recommendedColorSchemeAmount } from '../pages/ColorRecommendation/CalculateRecommendColors';
import { filteredOrderUsedColorsAmount, filteredRecommendedColorSchemeAmount } from '../pages/ColorRecommendation/CalculateRecommendColors';

const fileName = 'colorScheme';

const ButtonSaveColorScheme: React.FC = () => {
  const [jsonURL, setJsonURL] = useState<string | null>(null);

  const handleExport = () => {
    // 最新のデータを取得
    const jsonData = {
      filteredOrderUsedColorsAmount,
      filteredRecommendedColorSchemeAmount,
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
