import React, { useState, useEffect } from 'react';

const ReceiveData: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/', {
          method: 'POST',
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // コンポーネントがマウントされた直後にデータを取得する
    fetchData();

    // タイマーを使用して一定間隔でデータを更新する（例：10秒ごと）
    const intervalId = setInterval(fetchData, 10000);

    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => clearInterval(intervalId);
  }, []); // 第二引数に空の配列を指定することで、このeffectはマウント時のみ実行される

  return (
    <div>
      <p>Received Message: {message}</p>
    </div>
  );
};

export default ReceiveData;
