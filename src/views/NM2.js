
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NotificationAlert from "react-notification-alert";

import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import "./styles/dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Alert,
  UncontrolledAlert,
} from "reactstrap";

import { PieChart, Pie } from "recharts";
// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

import {
  faBoxArchive,
  faBriefcase,
  faCamera,
  faClose,
  faDrum,
  faDrumstickBite,
  faEllipsis,
  faFileAudio,
  faFileInvoice,
  faGraduationCap,
  faMicrophone,
  faPlug,
  faPlus,
  faShareNodes,
  faUser,
  faVideo,
  faFolder,
  faDroneAlt,faDatabase,
} from "@fortawesome/free-solid-svg-icons";

// import dronelogo from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/drone-icon.png"
import "./assets/images/drone-icon.png";
// import projectfolder from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-black.png"
import "./assets/images/project-folder-black.png";
// import projectblue from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-blue.png"
import projectblue from "./assets/images/project-folder-blue.png";

import drone from "../assets/drone.png";
import dronecamera from "../assets/camera-drone.png";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";
import ProgressBar from "components/ProgressBar/progress_bar";
import DropFileInput from "./DropFileInput/DropFileInput";
// import {icon1} from "../../src/assets/img/anime3.png"

import Frame from 'react-frame-component';
import Dashboard from './Dashboard';
import A from './demo/A';
import Folders from './Home/Folders';
import Parent from './projects/Parent';

const NM2 = () => {
    const [modalOpen, setModalOpen] = useState(false);
  
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };
  
    return (
        <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />


         

          {/* Dashboard */}

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
            {/* <div className={addprojectopen == true ? "overlay show" : "overlay"} id="overlay">
  <div data={color} className="popup show" id="popup">
    <h2>Create Projects</h2>
    <input type="file" placeholder="Choose File" />
    <input type="text" placeholder="Enter Text" />
    <button onClick={CloseProject}>Close</button>
    <button onClick={OKProject}>Ok</button>
  </div>
</div> */}

            <div className="container-fluid">
              <div className="row">
                {/* Left section */}

                <div>
        <Button color="primary" onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
          <ModalBody>
          
      {/* <Dashboard /> */}
      {/* <Folders /> */}
      <Parent />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <A />
              </div>
            </div>
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
     
    );
  };
  
  export default NM2;
  