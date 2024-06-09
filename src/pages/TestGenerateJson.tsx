// 参考: https://zenn.dev/ako/articles/be93960af741cb

import React from 'react';

const fileName = 'json';
const jsonData = { a: 1, b: 2 };

const fileNameWithJson = `${fileName}.json`;
const blobData = new Blob([JSON.stringify(jsonData)], {
  type: 'text/json',
});
const jsonURL = URL.createObjectURL(blobData);

const ExportButton: React.FC = () => {
  return (
    <a href={jsonURL} download={fileNameWithJson}>
      エクスポート
    </a>
  );
};

export default ExportButton;
