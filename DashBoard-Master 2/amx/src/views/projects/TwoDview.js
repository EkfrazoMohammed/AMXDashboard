import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "../DropFileInput/DropFileInput";
// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/projects/TwoDview.css'
import "../../../src/views/projects/TwoDview.css"
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

function TwoDview() {
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
// script


const onFileChange = (files) => {
  console.log(files);
}


    
  return (
    <>
     <BackgroundColorContext.Consumer>
      {({ color }) => (
     <div className="content" >
     <h2 style={{fontSize:"25px", justifyContent:"center", display:"flex", alignItems:"center"}}>Upload files</h2>

     <div className="wraper"  >
        <div className="wraper-card-content" data={color}>
          {/* <header>Upload files </header> */}
          <DropFileInput 
                onFileChange={(files) => onFileChange(files)}
            />
        
        </div>


      </div>

     </div>
      )}
      </BackgroundColorContext.Consumer>
    </>
   
  );
}

export default TwoDview;
