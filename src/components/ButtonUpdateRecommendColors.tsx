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
      <button className="update-button" onClick={handleClick}>
        <p>{isCalculateRecommendColors ? 'loading' : 'update'}</p>
      </button>
    </div>
  );
}

export default ButtonUpdateRecommendColors;
