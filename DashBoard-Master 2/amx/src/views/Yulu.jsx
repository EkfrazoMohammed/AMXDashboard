import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
import RoboFlow from "./RoboFlow";

const Loader = ()=>{
  return(
    <div className="" style={{height:'90vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      />
    </div>
  )
}

const Home = ({setTogglesection}) => {
  const videoRef = useRef(null);
  const [video,setVideo]=useState(null)
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("object")

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handlePost = async () => {
    try {
      const url = "https://your-api-url";
      const post = await axios.post(url,{video});
      console.log(post);
    } catch (error) {
      alert(error);
    }
  };

  const initializeWebSocket = () => {
    const newSocket = new WebSocket('ws://your-websocket-url');
    newSocket.onmessage = (event) => {
      const frameData = event.data;
      const imageUrl = 'data:image/jpeg;base64,' + frameData;
      if (videoRef.current) {
        videoRef.current.src = imageUrl;
      }
    };
    setSocket(newSocket);
  };

  const handleFileChange = async (e) => {
    setIsLoading(true);
    setTogglesection(false)
    try {
      const file = e.target.files[0];
      const videoURL = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoURL;
        setVideo(videoURL)
        await handlePost();
        await initializeWebSocket();
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
    

    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column-reverse', gap: '1rem' }}>
  
      <video ref={videoRef} controls autoPlay />
    </div>
    
    </>
    
  );
};

export default Home;
