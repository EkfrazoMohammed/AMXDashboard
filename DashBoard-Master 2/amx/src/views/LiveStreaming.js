import React, { useEffect, useRef } from 'react';

const WebSocketVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://your-websocket-url');
    
    socket.onmessage = function(event) {
      const frameData = event.data;
      const imageUrl = 'data:image/jpeg;base64,' + frameData;

      // Update the video feed
      if (videoRef.current) {
        videoRef.current.src = imageUrl;
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default WebSocketVideo;