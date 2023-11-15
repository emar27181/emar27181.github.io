# 参考: https://qiita.com/YW-Works/items/bc4d475e4843c3794d09

rm docs/index.html
rm docs/404.html
rm docs/assets/*.js
rm docs/assets/*.css
cp dist/index.html docs/
cp dist/index.html docs/404.html
cp dist/assets/*.js docs/assets/
cp dist/assets/*.css docs/assets/
