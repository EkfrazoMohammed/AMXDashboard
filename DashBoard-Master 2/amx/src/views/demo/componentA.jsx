// Component A
import React from "react";

function ComponentA() {
  const createAndSaveVideo = () => {
    // This is a sample video URL for demonstration purposes.
    const videoURL = "https://example.com/sample_video.mp4";

    // Save the video URL to local storage
    localStorage.setItem("savedVideo", videoURL);
  };

  return (
    <div>
      <button onClick={createAndSaveVideo}>Save Video</button>
    </div>
  );
}

export default ComponentA;
