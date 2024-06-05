import React, { useState } from 'react';
import '../App.css';
import { SetIsUpdateRecommendColorsScheme } from '../pages/ColorRecommendation/CalculateRecommendColors';

const ButtonUpdateRecommendColors: React.FC = () => {
  // isCalculateRecommendColorsという状態変数を定義
  const [isCalculateRecommendColors, setIsCalculateRecommendColors] = useState<boolean>(false);

  // ボタンがクリックされたときにisCalculateRecommendColorsをtrueにする関数
  const handleClick = () => {
    setIsCalculateRecommendColors(true);
    SetIsUpdateRecommendColorsScheme();
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>update</button>
      {/*<p>計算状態: {isCalculateRecommendColors ? '計算中' : '未計算'}</p>*/}
    </div>
  );
}

export default ButtonUpdateRecommendColors;
