import React from 'react';
import colorName from 'color-name';

const ColorTemplate: React.FC = () => {
  const colors = Object.entries(colorName);

  return (
    <ul>
      {colors.map(([name, code]) => (
        <ol key={name} >
          <div>{name}</div>
          <div style={{ backgroundColor: `rgb(${code[0]}, ${code[1]}, ${code[2]})`, width: '30px', height: '30px' }} />
        </ol>
      ))}
    </ul>
  );
};

export default ColorTemplate;
