import React, { useCallback, useState, useEffect,useRef } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Home = () => {
  const [video, setVideo] = useState();
  const [dataUrl, setDataUrl] = useState([]);

  // const onDrop = useCallback((acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   const videoURL = URL.createObjectURL(file);
  //   const fileName = file.name;

  //   setVideo({ filename: fileName, blob: videoURL });
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: 'video/*'
  // });

  const handleChange = (e) => {
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    const fileName = file.name;

    // setVideo({ filename: fileName, blob: videoURL });
    setVideo( videoURL );
  };

  // const url = "http://localhost:8000/url";

  // const handlePost = async () => {
  //   try {
  //     await axios.post(url, video);
  //     alert("Video uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error uploading video:", error);
  //   }

  //   getData();
  // };

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(url);
  //     setDataUrl(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log(dataUrl);
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
    <>
      <div
        className=""
        style={{
          width: '100%',
          display:'flex',
          justifyContent:'center',
          height:'100%',
          flexDirection:'column-reverse',
        gap:'1rem'
        }}
      >
        {/* <p>{video?.filename}</p> */}

        {/* <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''}`}
          style={{
            border: "2px dashed #007bff",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            transition: "background-color 0.3s",
            width: "200px",
            height: "65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // borderRadius:'10px'
            minHeight:'60px',
            background:'#FA742B',
            color:'#fff',
            fontWeight:'600'
          }}
        >
          <input {...getInputProps()} />
          <input type="file" onChange={handleChange} accept="video/*" style={{ display: 'none' }} />
          {isDragActive ? (
            <p>Drop the video files here...</p>
          ) : (
            
          )}
            <div className="" style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'1rem'}} >
            <input type="file" onChange={handleChange}  />

              <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" style={{width:'30px'}} alt="" />
              Upload Video
            </div>
        </div> */}
        {/* <button onClick={handlePost}>POST DATA</button> */}
        <div class="file-input" onChange={handleChange}>
      <input
        type="file"
        name="file-input"
        id="file-input"
        class="file-input__input"
      />
      <label class="file-input__label" for="file-input">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="upload"
          class="svg-inline--fa fa-upload fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
          ></path>
        </svg>
        <span>Upload file</span></label
      >
    </div>
   
        <video ref={videoRef} src={video} controls autoPlay />

      </div>
      
    </>
  )
}

export default Home;
