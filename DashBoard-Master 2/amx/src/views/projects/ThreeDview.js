import React, { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
import * as THREE from "three";
// import "./TwoDview.css";

import "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/projects/TwoDview.css"
function ThreeDViewer(props) {
  const [imageData, setImageData] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileData = reader.result;
      setImageData(fileData);
    };
  }
  const canvasRef = useRef(null);
  // const canvasRef = useRef(null)
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [fileContent, setFileContent] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsText(file, 'UTF-8');
  //     reader.onload = (event) => {
  //       setFileContent(event.target.result);
  //     };
  //   }
  // };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
    30,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      10000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(
      canvasRef.current.clientWidth -60,
      canvasRef.current.clientHeight -60
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff0 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <>
      <div className="content">

        {/* <div className="dashboard-header">
          <br />
          <i className="profile-icon bi bi-person-circle"></i>
        </div> */}


        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <canvas className="canvas-image" ref={canvasRef} />


          </div>
        </div>
        <div className="row3">
          <div style={{}} class="centered-div">
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ borderRadius: "5px" }}
            />

          </div>

        </div>
        <div className="row3">

          <div style={{paddingTop:'150px'}}  className='centered-div'>

            <div className="img_3d">
              {imageData && (
                <img
                  src={imageData}
                  alt="Uploaded file"
                  style={{ height: "200px" }}
                />
              )}
            </div>

          </div>

        </div>


      </div>
      {/* <div>
      <input type="file" style={{marginLeft:"60px"}} onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <p>File contents:</p>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div> */}
    </>
  );
}

export default ThreeDViewer;
