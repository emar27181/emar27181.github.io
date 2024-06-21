/**
 * 16進カラーコードをRGBに変換する関数
 * @param hex - 16進カラーコード（例: "#FF5733"）
 * @returns RGB値のオブジェクト
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // 16進コードの先頭の#を削除
  hex = hex.replace(/^#/, '');

  // 3桁の16進コードを6桁に拡張
  if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

/**
* RGB値をANSIエスケープコードに変換する関数
* @param r - 赤の値 (0-255)
* @param g - 緑の値 (0-255)
* @param b - 青の値 (0-255)
* @returns ANSIエスケープコード
*/
function rgbToAnsi(r: number, g: number, b: number): string {
  return `\x1b[38;2;${r};${g};${b}m`;
}

/**
* カラーコードを使ってコンソールに色付きテキストを表示する関数
* @param text - 表示するテキスト
* @param colorCode - 16進カラーコード（例: "#FF5733"）
*/
export function consoleLogColors(text: string, colorCode: string): void {
  const { r, g, b } = hexToRgb(colorCode);
  const ansiCode = rgbToAnsi(r, g, b);
  const resetCode = "\x1b[0m";
  console.log(`${ansiCode}${text}${resetCode}`);
}

// 使用例
//logWithColor("This is a custom color text!", "#FF5733");
//logWithColor("This is another custom color text!", "#00FF00");
