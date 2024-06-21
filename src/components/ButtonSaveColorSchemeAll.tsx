import React, { useState } from 'react';
import { CreateRecommendColorsAll } from '../pages/ColorRecommendation/CreateRecommendColorsAll';

const fileName = 'recommendColorSchemesAll';

const ButtonSaveColorSchemeAll: React.FC = () => {
  const [jsonURL, setJsonURL] = useState<string | null>(null);

  const handleExport = () => {
    console.log("ExportAll is clicked");
    let jsonData = CreateRecommendColorsAll();

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
      <button className="update-button" onClick={handleExport}> ExportAll</button>
      {jsonURL && (
        <a href={jsonURL} download={`${fileName}.json`} style={{ display: 'none' }} />
      )}
    </div>
  );
};

export default ButtonSaveColorSchemeAll;
