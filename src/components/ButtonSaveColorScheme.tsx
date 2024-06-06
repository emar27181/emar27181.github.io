// 参考: https://zenn.dev/ako/articles/be93960af741cb

import React from 'react';

const fileName = 'colorScheme';
const jsonData = { a: 1, b: 2 };

const fileNameWithJson = `${fileName}.json`;
const blobData = new Blob([JSON.stringify(jsonData)], {
  type: 'text/json',
});
const jsonURL = URL.createObjectURL(blobData);

const ButtonSaveColorScheme: React.FC = () => {
  return (
    <a href={jsonURL} download={fileNameWithJson}>
      export
    </a>
  );
};

export default ButtonSaveColorScheme;
