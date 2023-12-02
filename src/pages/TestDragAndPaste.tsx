import '../App.css';
import React, { useCallback } from 'react';
import p5 from 'p5'; // p5.jsのライブラリをインポート
import { useDropzone } from 'react-dropzone';

export function TestDragAndPaste() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    // p5.jsのスケッチを作成
    const sketch = (p: any) => {
      let img: p5.Image;

      p.preload = () => {
        // 画像の読み込み
        img = p.loadImage(URL.createObjectURL(acceptedFiles[0]));
      };

      p.setup = () => {
        p.createCanvas(400, 400);
        // 読み込んだ画像を表示
        p.image(img, 0, 0, p.width, p.height);
      };
    };

    // p5インスタンスを作成
    const myp5 = new p5(sketch);
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
