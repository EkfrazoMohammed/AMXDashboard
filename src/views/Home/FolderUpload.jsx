import React, { useRef } from 'react';

function FolderUpload({ handleFolderUpload }) {

const fileInputRef = useRef(null);

  const handleSelectFolder = () => {
    fileInputRef.current.click();
  };

  const handleFilesUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Group files based on their parent folder names
      const groupedFiles = groupFilesByFolder(files);
      handleFolderUpload(groupedFiles);
    }
  };

  const groupFilesByFolder = (files) => {
    const groupedFiles = {};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const folderPath = file.webkitRelativePath.split('/')[0];
      if (!groupedFiles[folderPath]) {
        groupedFiles[folderPath] = [];
      }
      groupedFiles[folderPath].push(file);
    }

    return groupedFiles;
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        directory=""
        webkitdirectory=""
        onChange={handleFilesUpload}
      />
      <button onClick={handleSelectFolder}>Select Folder</button>
    </div>
  );
}

export default FolderUpload;
