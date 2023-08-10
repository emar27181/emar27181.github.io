# My Vite Project

## 初めに

- このプロジェクトは情報学生がデジタルアートを学習する際に制作したものです。
- README.mdと言っていますがほとんど制作者のメモとして利用しています。

## 説明?
### 研究キーワード
- 感情
- 色
- デザイン
- アート

<br>

## 制作ログ
### U-22プログラミングコンテストに向けて(2023/08/10)
- 一貫性のあるデモプレイが出来るようにする必要がある
- 実装すべきこと
  - フロントエンドとバックエンドエンドのデータ通信
    - 良くないかもだが、viteのみで実装する方が現実的？...
  - ユーザに提供するコンテンツの具体的な実装
  - 想定される利用イメージ
    - アイデア支援, 利用者の創造性の刺激

<br>

## デバッグログ?
- デプロイが2023年6月時点の状態から更新されていない
  - `npm run build` でbuildをすることが可能だが`.json`ファイルを読み込んだ際にエラーが発生中(2023/08/10)
  - 考えられる解決策
    - ①buildで読み込まれる対象から`.json`ファイルを除く
      - こちらが現実的？...
      - この方法だとバッグエンドとのデータ通信が難しくなってしまう
    - ②`.json`ファイルが正しく読み込まれるように修正する

## 利用方法

- いずれ記入予定...

<br>


## バグ

- 再読み込みを行うと同じ作品が画面上に二つ描画されてしまう
  - 左(?)は再読み込み直後のファイルが表示
    - 再読み込みを行うと反映される
  - 右(?)は最新状態のファイルが表示される
    - エディタで保存されると反映される
  - Chromeのキャッシュが原因？？(2023/07/26)
    - Edgeだとその症状が起きにくいような気がする

<br>

## 注意点
### ディレクトリ名について
- /pagesは本来、/p5works, /logics, のようなブラウザ上の描画に関する命名の方が適切だった
  - /pages直下のファイルが多いため、ディレクトリ名の変更を現段階から行うのは結構大変(2023/06/18)

- /viewsは上記の"/pages"を部品(コンポーネント？)としてあるブラウザ全体を表示するためのファイルを保存するディレクトリ

### デプロイに関して
- buildした際に生成されるdocsディレクトリをデプロイ先が解釈することで本番環境でも表示されるらしい？
- GitHub Pages では、サイト用のエントリ ファイルとして index.html、index.md、または README.md ファイルを検索します。
- 上の公式文章からREADME.mdの名前を変更することでindex.htmlにエントリーファイルを間接的に変更できる？
- 以前のページではgithub上の/Setting/Pages/Branchの対象ファイルを/docsに指定することでエントリーファイルを指定していた(2023/06/27時点)

<br>

## 作品メモ

### 時計

- モザイク文字でデジタル/アナログ時計
- 増えていく/一気に減る丸で時間を表現

<br>

- 以降はいずれ追加予定
