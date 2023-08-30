import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faClose } from "@fortawesome/free-solid-svg-icons";

import pdfImage from "../../../src/views/assets/images/fileimagesLogo/pdf.png";
import mp4Logo from "../../../src/views/assets/images/fileimagesLogo/mp4logo.png";
import fileImageLogo from "../../../src/views/assets/images/fileimagesLogo/textlogo.png";
import imageLogo from "../../../src/views/assets/images/fileimagesLogo/imgeLogo.png";
import backImage from "../../../src/views/assets/images/fileimagesLogo/backImage.png";
import DropFileInput from "views/DropFileInput/DropFileInput";
import "./DemoVideoViewer.scss";
import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import comingSoonImage from "./under-development.gif"
import drone from "../../assets/drone.png";


import im from "../../../src/"
const DemoVideoViewer = () => {
  
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />

          {/* <div className="dashboard-header">
      <br />
      <i className="profile-icon bi bi-person-circle"></i>
    </div> */}

          <div
            className="content"
            style={{
              backgroundColor:
                color == "green"
                  ? "rgba(255,140,49,.05)"
                  : color == "primary"
                  ? "rgba(253,101,113,.05)"
                  : "rgba(65, 195, 199,.03)",
            }}
          >
            <div className="videoviewer-page-container">
             <div className="demo-wrapper-container">
              <div className="title">Video Analytics</div>

              {/* <div className="title">Coming Soon</div> */}
                <div className="videos-container">
                {/* <div className="videos-wrapper">

<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={bangaloreVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div>
<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div>

<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={bangaloreVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div>
<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div>
</div>
                    <div className="videos-wrapper">

<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={bangaloreVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div>
<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div>

<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={bangaloreVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div>
<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div>
</div> */}
<div className="videos-wrapper">

{/* <div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src="https://firebasestorage.googleapis.com/v0/b/amxstorage.appspot.com/o/amx%2Fbangalore.mp4?alt=media&token=4830a379-7bb3-4403-aad0-c8ba06be9665" type="video/mp4"/> 
    <source src="https://firebasestorage.googleapis.com/v0/b/amxstorage.appspot.com/o/files%2Fbangalore.mp4?alt=media&token=d940df74-107c-4351-8ffd-4cfb15b8287e" type="video/mp4"/>

    <source src="https://res.cloudinary.com/dxjrvvjp1/video/upload/v1692214366/bangalore_anocly.mp4" type="video/mp4"/>
        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div> */}
{/* <div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div>

<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={bangaloreVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 1
        </div>
    </div>
</div>
<div className="video-block">
    <div className="video-inner">

    <video className="video-play" controls autoPlay muted >
    <source src={keralaVideo} type="video/mp4"/>

        </video>
        <div className="video-title">
          CAM 2
        </div>
    </div>
</div> */}
</div>
                </div>
            
             {/* <div className="right">
              <div className="text">
              </div>
             </div>
             <div className="left">

                <img src={"https://aactxg.stripocdn.email/content/guids/CABINET_d2c61cd4fa579e3609ac1dce15feb3311d67f9975b3b433315a90ea0a424bac3/images/icons8backenddevelopment.gif"} alt="" />
                <div>&nbsp;Component Under Development!</div>
              </div> */}
             </div>

            </div>
            {/* <h1>Coming Soon!</h1>
            <h2>Component Under Development...</h2> */}
            
          
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default DemoVideoViewer;
