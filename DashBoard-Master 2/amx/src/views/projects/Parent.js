import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "reactstrap";
import folderimage from "../../../src/views/assets/images/folder-png-3d.png";
import { Spinner } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import drone from "../../assets/drone.png";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const Parent = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(true);
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
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/create_project/",
        config
      );      
      setfolder_list(data.data.folders);
      setLoading(false);   
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  useEffect(() => {
    GetAllProjects();
  }, []);
  const [addprojectopen, setaddprojectopen] = React.useState(false);
  const [folder_list, setfolder_list] = React.useState([]);

  const AddProject = (name) => {
    setaddprojectopen(true);
  };
  const CloseProject = (name) => {
    setaddprojectopen(false);
    setTimeout(()=>{
      window.location.reload()
    },1000)
  };
  const [projectdata, setProjectData] = useState({
    project_name:"",
    user_id: userIdO,
  });
  const [errors, setErrors] = useState({
    project_name: false,
  });

  const handleChange = (e) => {
    setProjectData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectdata.project_name) {
      setErrors({
        project_name: !projectdata.project_name,
      });
      return;
    }
    try {
      let payload = projectdata;
      setDisableButton(true);
      const maxProgress = 100;
      const progressInterval = 10; 
      let currentProgress = 0;
      const progressUpdater = setInterval(() => {
        if (currentProgress < maxProgress) {
          currentProgress += progressInterval;
        } else {
          clearInterval(progressUpdater);
        }
      }, 300);
      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/create_project/",
          projectdata,
          {
            headers: {
              Authorization: amxtokenO,
            },
          }
        )
        .then((res) => {
          const data2 = res.data;
          setDisableButton(false);
      clearInterval(progressUpdater);
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
      clearInterval(progressUpdater);
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
            CloseProject();          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const history = useHistory();
  const PushToCreateProject = (item) => {
    history.push("/amx/child", { all_data: item });
  };
  const goBack = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />
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
                  <div id="TooltipExample" style={{ cursor: "pointer", margin: "0 1rem" }}>
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
                  {folder_list.length >= 1
                    ? folder_list.map(
                        (item) => (
                          <>
                            <div
                            style={{width:'130px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                              onClick={() =>
                                history.push(
                                  "/amx/folders?project_id=" + item.folder_name
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
                                {item.folder_name}
                              </h4>
                            </div>
                          </>
                        )
                      )
                    : 
                    <span style={{ fontSize: "20px", margin:"1rem" }}>
                      {" "}
                      No Projects Added
                    </span>
                 }
                </div>

                <div className={addprojectopen == true ? "overlay show" : "overlay"}>
                  <div className="popup-outer-process">
                    <div className="popup-box-process">
                      <FontAwesomeIcon
                        onClick={CloseProject}
                        className="close"
                        icon={faClose}
                      />
                      <div className="profile-text-process">
                        <div className="text-process">
                          <span className="name">Create Project</span>
                        </div>
                      </div>
                      <form action="#">
                        <div className="">
                          <div className="">
                            <div>
                              <div className="input-file-type">
                                <form onSubmit={handleSubmit}>
                                  <div class="form-group row">
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
                                        name="project_name"
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
                <span style={{ fontSize: "16px" }}>  Adding project ....</span></div>
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
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  data={color}
                  className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6"
                ></div>
              </>
            )}
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Parent;
