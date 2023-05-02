import React from 'react';
import colorName from 'color-name';

const ColorTemplate: React.FC = () => {
  const colors = Object.entries(colorName);

  return (
    <ul >
      {colors.map(([name, code]) => (
        <ul key={name} >
          <div style={{ textAlign: 'left' }}>{name}</div>
          <div style={{ textAlign: 'left' }}>{code[0]}, {code[1]}, {code[2]}</div>
          <div style={{ backgroundColor: `rgb(${code[0]}, ${code[1]}, ${code[2]})`, width: '30px', height: '30px' }} />
          <br />
        </ul>
      ))}
    </ul>
  );
};

export default ColorTemplate;
