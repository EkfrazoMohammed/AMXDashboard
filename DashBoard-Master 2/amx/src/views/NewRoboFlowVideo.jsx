import React, { useEffect, useState } from 'react';

const VideoWebSocketClient = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [loader, setLoader] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(''); // State to hold the current frame

    useEffect(() => {
        if (videoUrl) {
            handleFileUpload(videoUrl);
        }
    }, [videoUrl]);

    const handleFileUpload = (videoUrl) => {
        console.log(videoUrl);
        if (!videoUrl) return alert("No video URL provided");

        setLoader(true);

        const newSocket = new WebSocket('ws://127.0.0.1:8000/ws/video/');
        setSocket(newSocket);

        newSocket.addEventListener('open', () => {
            console.log("WebSocket connected");
            newSocket.send(JSON.stringify({ video_url: videoUrl })); // Send the video URL
        });

        newSocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log(data); // Log the entire data received

            // Log the frame if it exists and update the current frame
            if (data.frame) {
                console.log('Received frame:', data.frame);
                setCurrentFrame((prevFrame) => {
                    // Only update if the new frame is different
                    if (prevFrame !== data.frame) {
                        return 'data:image/jpeg;base64,' + data.frame; // Update the state with the frame
                    }
                    return prevFrame; // Keep the previous frame
                });
            }

            // Check if processing is complete
            if (data.processing_complete) {
                console.log(data.message); // Log the completion message
                alert('Video processing completed!'); // Notify the user
                newSocket.close(); // Close the socket after processing is complete
                setSocket(null);
                setLoader(false); // Hide the loader when done
            }
        });

        newSocket.addEventListener('close', () => {
            console.log('WebSocket disconnected');
            setLoader(false);
        });

        newSocket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            setLoader(false); // Hide the loader on error
        });
    };

    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleSendVideoUrl = () => {
        if (videoUrl) {
            console.log('Sending video URL:', videoUrl);
            handleFileUpload(videoUrl); // Initiate upload
        } else {
            alert('Please enter a valid video URL.');
        }
    };

    return (
        <div>
            <h1>Video WebSocket Client</h1>
            <input
                type="text"
                value={videoUrl}
                onChange={handleVideoUrlChange}
                placeholder="Enter video URL"
                style={{ width: '300px', marginBottom: '10px' }}
            />
            <button onClick={handleSendVideoUrl} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Send Video URL
            </button>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
                {currentFrame ? (
                    <img src={currentFrame} alt="Current Frame" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                ) : (
                    <p>No frames received yet.</p>
                )}
            </div>

            {loader && <p>Loading...</p>}
        </div>
    );
};

export default VideoWebSocketClient;
