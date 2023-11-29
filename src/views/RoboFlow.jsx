
import React, { useState,useEffect, useRef } from "react";

import Frame from 'react-frame-component';
function RoboFlow() {
   const myurl=process.env.PUBLIC_URL + '/roboflow.html';

  return (
    <>
      <div className="content">
    
        <div
          id="map"
          className="map"
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "calc(88vh)",
          }}
        >
         
          
          <iframe  
           style={{ width: "100%", height: "100%" ,border:"none",outline:"none"}}
           src={myurl}
            id="iframeId">
          </iframe>
          
        </div>
        
      </div>
    </>
  );
}

export default RoboFlow;
