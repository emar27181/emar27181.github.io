import React, { useState } from 'react';

const TestSendDataTDD = () => {
  console.log('This is TestSendDataTDD.tsx');
  const [formData, setFormData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームデータをFlaskアプリケーションに送信する処理を実装する
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData} onChange={handleChange} /> < br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestSendDataTDD;
