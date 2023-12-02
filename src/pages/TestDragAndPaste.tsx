import '../App.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function TestDragAndPaste() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles); // ドロップされたファイルの情報を出力
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          ファイルをここにドラッグアンドドロップするか、
          クリックしてファイルを選択してください
        </p>
      </div>
    </div>
  );
}

export default TestDragAndPaste;