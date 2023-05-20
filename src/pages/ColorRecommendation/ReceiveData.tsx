import React, { useEffect, useState } from 'react';

const ReceiveData: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  console.log("This is ReceiveData.tsx")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>This is ReceiveData.tsx</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveData
