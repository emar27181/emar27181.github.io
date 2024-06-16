import React, { useState } from 'react';
import { CreateRecommendColorsAll } from '../pages/ColorRecommendation/CreateRecommendColorsAll';

const ButtonSaveColorSchemeAll: React.FC = () => {

  const handleExport = () => {
    console.log("ExportAll is clicked");
    CreateRecommendColorsAll();
  };

  return (
    <div>
      <button className="update-button" onClick={handleExport}> ExportAll</button>
    </div>
  );
};

export default ButtonSaveColorSchemeAll;
