import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Home = () => {
  const [video, setVideo] = useState();
  const [dataUrl, setDataUrl] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const videoURL = URL.createObjectURL(file);
    const fileName = file.name;

    setVideo({ filename: fileName, blob: videoURL });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/*'
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    const fileName = file.name;

    setVideo({ filename: fileName, blob: videoURL });
  };

  const url = "http://localhost:8000/url";

  const handlePost = async () => {
    try {
      await axios.post(url, video);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
    }

    getData();
  };

  const getData = async () => {
    try {
      const res = await axios.get(url);
      setDataUrl(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataUrl);

  return (
    <>
      <div
        className=""
        style={{
          width: '100%',
          display:'flex',
          justifyContent:'center'
        }}
      >
        {/* <p>{video?.filename}</p> */}

        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''}`}
          style={{
            // border: "2px dashed #007bff",
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
            <div className="" style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'1rem'}} >
              <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" style={{width:'30px'}} alt="" />
              Upload Video
            </div>
            
          )}
        </div>
        {/* <button onClick={handlePost}>POST DATA</button> */}
      </div>
    </>
  );
};

export default Home;
