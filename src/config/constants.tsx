export const DISPLAY_RATE = 0.42;
export const DISPLAY_CANVAS_FILTER_RATE = 0.7;
export const DISPLAY_USED_COLOR_RATIO_RATE = 0;
export const DISPLAY_USED_COLOR_WHEEL_RATE = 2;

export const SPLIT = 100; // キャンバスを分割するグリッド数
export const AMOUNT_LIMIT = 100; // 配色として有効色と判定されるグリッド数の閾値
export const SATURATION_LIMIT = 10;
export const LIGHTNESS_UPPER_LIMIT = 90;
export const LIGHTNESS_LOWER_LIMIT = 10;

export const LIGHTNESS_DIFF = 10; // 推薦するメインの配色と異なる明度の配色を推薦するときの差
export const VARIATIONS_LIGHTNESS_DIFF = [-20, +20]; // 追加する明度のバリエーションの値を保存する配列

export const IS_INPUT_BY_JSON = false; // 使用した配色の代入をJsonファイルを基にするかどうかを保存する固定値
export const SIM_VALUE_SAME_COLOR = 10; // 同じ色かどうかを判定する相違度の閾値
export const SIM_VALUE_DISPLAY_LIMIT = 100; // 表示(評価)するかどうかを判定する相違度の閾値
export const MAX_RECOMMENDED_COLOR_SCHEME_LENGTH = 17 * 5; // 推薦する配色パターンの最大値(配色技法: 17種類, バリエーション: 3種類)

// どのタイミングに塗られた色を評価するか保存する配列
// [1]だとused[i][1]に対してrecommend_(i,1)[][]が生成され，used[i][2]が含まれているかどうかの評価がされる
// [0, 1]だと上の評価に加えて，used[i][0]に対してrecommend_(i,0)[][]が生成され，used[i][1]が含まれているかどうかの評価がされる
export const IS_EVALUATE_TIMING_DRAW_COLOR = [2];

export const LOG_ILLUSTLATION_COUNT = 10; // 読込むログのイラストの枚数

//WEIGHTING_COEFFICIENT: 重み付け係数(説明では"W"と表記する)
//simValue = (1-W)*(使用配色と推薦配色の相違度) + W*(推薦配色の配色技法の利用率)
export const WEIGHTING_COEFFICIENT = 0.5; 