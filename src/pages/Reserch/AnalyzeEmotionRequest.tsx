// src/EmotionAnalyzerButton.js
// 感情分析を行うリクエストを送信するのボタン(未完全)(2023/09/25)
import React from 'react';
import axios from 'axios';

const EmotionAnalyzeButton = () => {
  const analyzeEmotion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analyze-emotion');
      console.log('Response:', response.data);
      // ここでサーバーからの応答を処理できます
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={analyzeEmotion}>Generate Color</button>
    </div>
  );
};

export default EmotionAnalyzeButton;
