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
import "./VideoViewer.css";
import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import comingSoonImage from "./under-development.gif"
import drone from "../../assets/drone.png";

const folder_list = [
  {
    project_name: "Ekfrazo",
    folder_color: "#D65A47",
    link: "/amx/createproject",
  },
  {
    project_name: "Aivlove",
    folder_color: "rgb(64,153,173)",
    link: "/amx/createproject",
  },
  {
    project_name: "Microsoft",
    folder_color: "rgb(239,185,93)",
    link: "/amx/createproject",
  },
  {
    project_name: "TCS",
    folder_color: "rgb(55,109,236)",
    link: "/amx/processdata",
  },
  {
    project_name: "ADDITIONAL",
    folder_color: "#D65A47",
    link: "/amx/processdata",
  },
];
const VideoViewer = () => {
  
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
             <div className="wrapper-container">
            
            
             <div className="right">
              <div className="text">
                Coming Soon!
              </div>
             </div>
             <div className="left">
                {/* <img src={comingSoonImage} alt="" /> */}

                <img src={"https://aactxg.stripocdn.email/content/guids/CABINET_d2c61cd4fa579e3609ac1dce15feb3311d67f9975b3b433315a90ea0a424bac3/images/icons8backenddevelopment.gif"} alt="" />
                <div>&nbsp;Component Under Development!</div>
              </div>
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

export default VideoViewer;
