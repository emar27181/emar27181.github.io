import fs from 'fs';

// 変更前のテキストと変更後のテキストを定義
const oldText = './assets/index-8dd6682d.js';
const newText = './assets/index-testname.js';

// HTMLファイルを読み取り
const htmlPath = './docs/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// テキストを変更
const modifiedHtml = htmlContent.replace(new RegExp(oldText, 'g'), newText);

// 変更後のHTMLを保存
fs.writeFileSync(htmlPath, modifiedHtml);