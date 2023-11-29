import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { CircularProgressbar } from "react-circular-progressbar";
import { Progress } from "reactstrap";
import { Tooltip, Spinner } from "reactstrap";
import pdfImage from "../../../src/views/assets/images/fileimagesLogo/pdf.png";
import mp4Logo from "../../../src/views/assets/images/fileimagesLogo/mp4logo.png";
import fileImageLogo from "../../../src/views/assets/images/fileimagesLogo/textlogo.png";
import imageLogo from "../../../src/views/assets/images/fileimagesLogo/imgeLogo.png";
import backImage from "../../../src/views/assets/images/fileimagesLogo/backImage.png";
import DropFileInput from "views/DropFileInput/DropFileInput";

import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";

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
const VideoParentProject = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  let [state, setState] = useState({
    name: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleView = () => {
    // Handle view action here
  };

  const handleDownload = () => {
    // Handle download action here
  };

  const [progress, setProgress] = useState(0);
  const userIdO = localStorage.getItem("user_id");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config = {
    params: {
      user_id: userIdO,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };

  let GetAllProjects = async () => {
    setLoading(true);
   

    try {
      // ======= old endpoints ==========
      // let data = await axios.get(
      //   "https://fibregrid.amxdrones.com/dronecount/projects/",
      //   config
      // );

      // ======= new endpoint =============
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );

      console.log(data.data, "projectdata====>");

      
      setfolder_list(data.data[0].folder_structure);
      setLoading(false);
      // toast.success("Your project folder updated !", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   icon: <img src={drone} />,
      // });
      // toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
      // CloseProject()
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  const [storagedata, setstoragedata] = useState();
  const GetstorageData = async () => {
    //   let resss = 8589934592

    //   data02[0]['value'] = 700
    //   data02[0]['name'] = "Group A"

    //   console.log(data02)

    try {
      const response = await fetch(
        "https://fibregrid.amxdrones.com/dronecount/storage/"
      );
      console.log("response==>", response);

      const jsonData = await response.json();
      console.log("json data=====>", jsonData[0]["total_bytes"]);

      const gb_convertsion =
        Number(jsonData[0]["total_bytes"]) / (1024 * 1024 * 1024);

      setstoragedata(gb_convertsion.toFixed(2));

      console.log("gb_convertsion==>", gb_convertsion);
      // setData(jsonData);

      // dataArr = jsonData
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    GetAllProjects();
    // GetstorageData();
    // toast.success('Wellcome to dashboad ADMIN !', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   icon: <img src={drone} alt="drone_image-error" />
    // });
  }, []);
  const [addprojectopen, setaddprojectopen] = React.useState(false);
  const [folder_list1, setfolder_list] = React.useState([]);

  const AddProject = (name) => {
    console.log("AddProject======");
    setaddprojectopen(true);
  };
  const CloseProject = (name) => {
    setaddprojectopen(false);
  };
  let { name } = state;

  // let handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };
  const [projectdata, setProjectData] = useState({
    name: "",
    user_id: userIdO,
  });
  const [errors, setErrors] = useState({
    name: false,
  });
  // let { name } = state;
  const handleChange = (e) => {
    setProjectData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors({ ...errors, [e.target.name]: false });
  };

  const history = useHistory();

  const PushToCreateProject = (item) => {
    history.push("/amx/child", { all_data: item });
  };
  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
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
            <h2 style={{ fontSize: "25px" }}>New Video Analytics</h2>
            {loading ? (
              <>
                <Spinner
                  size="md"
                  color="primary"
                  style={{
                    height: "2rem",
                    width: "2rem",
                  }}
                ></Spinner>
                <span style={{ fontSize: "20px" }}> Fetching Projects</span>
               
              </>
            ) : (
              <>
                <div className="row">
                  <div
                    id="TooltipExample"
                    onClick={goBack}
                    style={{ cursor: "pointer", margin: "0 1rem" }}
                  >
                    <img src={backImage} alt="" height={25} />
                  </div>
                  <Tooltip
                    autohide={true}
                    flip={true}
                    isOpen={tooltipOpen}
                    target="TooltipExample"
                    toggle={toggle}
                    placement="top"
                  >
                    <div>Go Back</div>
                  </Tooltip>
                  {/* <button
                    type="button"
                    onClick={AddProject}
                    className="btn btn-primary"
                  >
                    Add Project
                  </button> */}
                </div>

                <div style={{}} className="row">
                  {folder_list1.length >= 1
                    ? folder_list1.map(
                        (item) => (
                          //  <div  className="row">
                          <>
                            {/* <Link to={item.link}> */}
                            {/* <div onClick={() => PushToCreateProject(item)}> */}
                            <div
                              onClick={() =>
                                history.push(
                                  "/amx/vfolders?vproject_id=" + item.name
                                )
                              }
                            >
                              <div className="file-cards">
                                <div
                                  style={{}}
                                  className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5"
                                >
                                  {/* <div style={{justifyContent:"center"}} className="col-lg-2 col-sm-12 col-md-3"> */}
                                  <div
                                    data={color}
                                    style={{ alignContent: "center" }}
                                    class="folder"
                                  >
                                    {/* <div class="folder-inside" style={{ backgroundColor: item.folder_color }}> */}
                                    <div class="folder-inside" style={{}}></div>
                                  </div>

                                  {/* </div> */}
                                </div>
                              </div>
                              <h4
                                style={{
                                  fontSize: 12,
                                  textAlign: "center",
                                  paddingTop: "10px",
                                }}
                              >
                                {/* {item.name} */}
                                {item.name.split("(")[0].trim()}
                              </h4>
                            </div>
                          </>
                        )

                        // </div>
                      )
                    : null}
                </div>


                <div
                  data={color}
                  className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6"
                >
             
                  
                </div>
              
              </>
            )}
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default VideoParentProject;
