import React from 'react';
import { saveAs } from 'file-saver';

const A = () => {
  const handleSaveFile = () => {
    // Sample content to save in the file
    const fileContent = "This is the content of the file.";

    // Create a Blob containing the text data
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

    // Prompt the user to save the file
    saveAs(blob, 'filename.txt');
  };

  return (
    <div>
      <button onClick={handleSaveFile}>Save File</button>
    </div>
  );
};

export default A;
