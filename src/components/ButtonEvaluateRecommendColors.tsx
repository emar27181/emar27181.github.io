import React, { useState } from 'react';
import '../App.css';
import { evaluateRecommendColorSchemes } from '../pages/ColorRecommendation/EvaluateIsColorPaintNext';

const ButtonEvaluateRecommendColors: React.FC = () => {

  const handleClick = () => {
    evaluateRecommendColorSchemes();
  };

  return (
    <div>
      <button className="update-button" onClick={handleClick}>evaluate</button>
    </div>
  );
}

export default ButtonEvaluateRecommendColors;
