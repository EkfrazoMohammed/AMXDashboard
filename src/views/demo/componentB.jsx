// Component B
import React, { useEffect, useState } from "react";

function ComponentB() {
  const [videoURL, setVideoURL] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, setFolders] = useState([]);

  // Sample data for demonstration purposes
  const sampleFolders = [
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" },
  ];

  useEffect(() => {
    // Retrieve the saved video URL from local storage
    const savedVideo = localStorage.getItem("savedVideo");
    if (savedVideo) {
      setVideoURL(savedVideo);
    }

    // Simulated API call to fetch folders
    // Replace this with your actual API call to get the folders
    setFolders(sampleFolders);
  }, []);

  const handleFolderChange = (e) => {
    setSelectedFolder(e.target.value);
  };

  const handleSaveVideo = () => {
    // Save the video URL to the selected folder
    if (selectedFolder && videoURL) {
      localStorage.setItem(`folder_${selectedFolder}`, videoURL);
      alert("Video saved to the selected folder!");
    } else {
      alert("Please select a folder and save a video URL first.");
    }
  };

  return (
    <div>
      <div>
        {folders.length > 0 ? (
          <select value={selectedFolder} onChange={handleFolderChange}>
            <option value="">Select a folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No folders available.</p>
        )}
      </div>

      {videoURL ? (
        <div>
          <video controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleSaveVideo}>Save Video</button>
        </div>
      ) : (
        <p>No video available.</p>
      )}
    </div>
  );
}

export default ComponentB;
