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
import folderimage from "../../../src/views/assets/images/folder-png-3d.png";
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


const Parent = () => {
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
    setTimeout(()=>{
      window.location.reload()
    },1000)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectdata.name) {
      setErrors({
        name: !projectdata.name,
      });
      return;
    }
    try {
      let payload = projectdata;
      console.log(payload, "payload=====>");

      //  ======= OLD ENDPOINTS ===========
      // let data1 = await axios
      //   .post(
      //     "https://fibregrid.amxdrones.com/dronecount/projects/",
      //     projectdata,
      //     config
      //   )

      //  ======= NEW ENDPOINTS ===========

      setDisableButton(true);
      setProgress(0);

      const maxProgress = 100;
      const progressInterval = 10; // Adjust the interval as needed
  
      let currentProgress = 0;
      const progressUpdater = setInterval(() => {
        if (currentProgress < maxProgress) {
          currentProgress += progressInterval;
          setProgress(currentProgress);
        } else {
          clearInterval(progressUpdater);
        }
      }, 300); // Update progress every second
      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/v2/create-project/",
          projectdata,
          {
            headers: {
              Authorization: amxtokenO,
            },
            onDownloadProgress: (progressEvent) => {
              // Handle download progress
              const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Download Progress: ${percentage}%`);
              setDownloadProgress(percentage);
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setDisableButton(false);
          
      clearInterval(progressUpdater); // Stop the progress updater
          toast.success("New project added !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={drone} />,
          });

          CloseProject();
          GetAllProjects();
        })
        .catch((err) => {
          setDisableButton(false);
          
      clearInterval(progressUpdater); // Stop the progress updater
          if (err.response) {
            if (
              err.response.data.message ===
              "Project Name is already taken"
            ) 
            {
              toast.error(
                "Project with the same name already exists!",
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  icon: <img src={drone} />,
                }
              );
            } else {
              toast.error("Server down. Please try again later!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <img src={drone} />,
              });
            }

            GetAllProjects();
            CloseProject();
            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // {... response headers here}
            console.log(err.response.data); // {... response data here}
          }
        });

      // .catch((err) => {
      //   if (err.response) {

      //     toast.error("Server down, Please try agin later !", {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //       icon: <img src={drone} />,
      //     });
      //     GetAllProjects();
      //     CloseProject();
      //     console.log(err.response.status);
      //     console.log(err.response.statusText);
      //     console.log(err.message);
      //     console.log(err.response.headers); // 👉️ {... response headers here}
      //     console.log(err.response.data); // 👉️ {... response data here}
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  };

  // Push to create project

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
            <h2 style={{ fontSize: "25px" }}>Projects</h2>
            {loading ? (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'100%',width:'100%',justifyContent:'center'}}>
                                 <img src="https://cdnl.iconscout.com/lottie/premium/thumb/loading-5966360-4958661.gif" width='60px' alt="" />

                <span style={{ fontSize: "20px" }}> Fetching Projects</span>
               
              </div>
            ) : (
              <>
                <div className="row">
                  <div
                    id="TooltipExample"
               
                    style={{ cursor: "pointer", margin: "0 1rem" }}
                  >
 <button
                    type="button"
                    onClick={goBack}
                    className="btn btn-primary"
                  >
                 Back
                  </button>                 
                  
                   </div>
          
                  <button
                    type="button"
                    onClick={AddProject}
                    className="btn btn-primary"
                  >
                    Add Project
                  </button>
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
                            style={{width:'130px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                              onClick={() =>
                                history.push(
                                  "/amx/folders?project_id=" + item.name
                                )
                              }
                            >
                                                      <img src={folderimage} style={{height:'100px',width:'100px'}}    alt="" />

                         
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
                    : 
                    
                    <span style={{ fontSize: "20px", margin:"1rem" }}>
                      {" "}
                      No Projects Added
                    </span>
                 
                   
                    }
                </div>

                <div
                  className={
                    addprojectopen == true ? "overlay show" : "overlay"
                  }
                >
                  {/* <!-- popup box start --> */}
                  <div className="popup-outer-process">
                    <div className="popup-box-process">
                      {/* <i id="close" className="bx bx-x close"></i> */}
                      <FontAwesomeIcon
                        onClick={CloseProject}
                        className="close"
                        icon={faClose}
                      />
                      <div className="profile-text-process">
                        {/* <img src="profile.jpg" alt="" />  */}
                        <div className="text-process">
                          <span className="name">Create Project</span>
                          {/* <span className="profession">Web & Web Designer</span> */}
                        </div>
                      </div>
                      <form action="#">
                        <div className="">
                          <div className="">
                            <div>
                              <div className="input-file-type">
                                <form onSubmit={handleSubmit}>
                                  <div class="form-group row">
                                    {/* <label
                                  for="staticEmail"
                                  class="col-sm-12 col-form-label"
                                >
                                  Project
                                </label>{" "}
                           */}

                                    <div class="col-sm-12">
                                      <span className="form-labels">
                                        <span className="asterisk-symbol">
                                          *
                                        </span>
                                        Enter Project Name:{" "}
                                      </span>

                                      <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Project Name"
                                        onChange={handleChange}
                                        required
                                      />
                                      {errors.name && (
                                        <span className="error-message">
                                          Project Name is required
                                        </span>
                                      )}
                                      <input
                                        type="hidden"
                                        class="form-control"
                                        id="user_id"
                                        name="user_id"
                                        value={userIdO}
                                        placeholder="user_id"
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="button">
                     
                          {disableButton ? (
                            <>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"5px"}}>
                            
                               <Spinner
                  size="md"
                  color="primary"
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                  }}
                ></Spinner>
                <span style={{ fontSize: "16px" }}>  Adding project ....</span>
                                    {/* <span>{downloadProgress}%</span>
                                <Progress animated value={downloadProgress} max="100"/> */}
                                {/* </div> */}
                                {/* <progress value={progress} max="100"></progress> */}
                                {/* <progress value={downloadProgress} max={100}></progress>
        <span>{downloadProgress}%
        </span> */}
                              </div>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              ADD
                            </Button>
                          )}
                          {/* <button className="send">ADD</button> */}
                        </div>
                      </form>
                    </div>
                  </div>
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

export default Parent;
