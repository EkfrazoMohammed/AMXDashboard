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
import folderimage from "../../../src/views/assets/images/folder-blue-color.png"
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
const ParentProject = () => {
  let [state, setState] = useState({
    name: "",
  });
  
  let  userId= localStorage.getItem("user_id");
  let GetAllProjects = async () => {
    try {
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/projects/",
        {
          params: {
            user_id: userId,
          },
        }
      );
      //   console.log(data, "projectdata====>");
      console.table(data.data);
      setfolder_list(data.data);
      toast.success("Your project folder updated !", {
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
      // toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
      // CloseProject()
    } catch (error) {
      console.log(error);
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

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = state;
      console.log(payload, "payload=====>");
      let data = await axios
        .post("https://fibregrid.amxdrones.com/dronecount/projects/", payload)
        .then((res) => {
          const data2 = res.data;
          console.log(data2);
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
          // GetAllProjects()
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Server down, Please try agin later !", {
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
            // GetAllProjects()
            CloseProject();
            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log(err.response.data); // 👉️ {... response data here}
          }
        });
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
            <div className="row">
                    <div
                      className="col-1"
                      onClick={goBack}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={backImage} alt="" height={25} />
                    </div>
                  </div>
            <div style={{}} className="row">
              {folder_list1.length >= 1
                ? folder_list1.map(
                    (item) => (
                      //  <div  className="row">
                      <>
                        {/* <Link to={item.link}> */}
                        <div style={{width:'130px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer'}} onClick={() => PushToCreateProject(item)}>
                          {/* <div className="file-cards">
                            <div
                              style={{}}
                              className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5"
                            >
                              <div
                                data={color}
                                style={{ alignContent: "center" }}
                                class="folder"
                              >
                                sdsdsdsds
                                <div class="folder-inside" style={{}}>
                                 
                                </div>
                              </div>

                           
                            </div>
                          </div> */}

                          <h4
                            style={{
                              fontSize: 12,
                              textAlign: "center",
                              paddingTop: "10px",
                            }}
                          >
                            {item.name}
                          </h4>
                        </div>
                      </>
                    )

                    // </div>
                  )
                : null}
            </div>

            <div
              className={addprojectopen == true ? "overlay show" : "overlay"}
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
                      <span className="name">Create Projects</span>
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
                                <label
                                  for="staticEmail"
                                  class="col-sm-3 col-form-label"
                                >
                                  Project
                                </label>{" "}
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <div class="col-sm-12"></div>
                              </div>
                            </form>
                          </div>
                          <br />
                          <br />
                        </div>
                        <header></header>
                      </div>
                    </div>
                    {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                    <div className="button">
                      <button
                        id="close"
                        onClick={handleSubmit}
                        className="cancel"
                        class="btn btn-primary"
                      >
                        ADD
                      </button>
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
              <button
                data={color}
                type="file"
                className="header-content-btn1"
                onClick={AddProject}
              >
                +
              </button>

              {/* <div>
            {popup ? (
              <div className="main-pop-up">
                <div className="pop-up-employee-file">
                  <div className="header-employee-pop">
                    <h3 className="project-name-1">PROJECTS</h3>
                    <button
                      className="pop-up-closer-button"
                      onClick={ClosePopup}
                    >
                      X
                    </button>
                  </div>
                  <div className="input-file-type">
                    <form onSubmit={handleSubmit}>
                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-sm-3 col-form-label"
                          
                        >
                          Project
                        </label>{' '}
                        <div class="col-sm-9">
                          <input 
                            type="text"
                            class="form-control"
                            id="name"
                            name="project_name"
                            placeholder="Name"
                            value={project_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-12"></div>
                      </div>
                      <div className="text-center1">
                        <button className="handleSubmit">SUBMIT</button>
                      </div>
                    </form>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            ) : (
              ""
            )}
          </div> */}
            </div>

            {/* <div style={{  height: '30px',marginTop:'20px'  }} className="row">
        <div className="col-lg-2 col-sm-2 col-md-2" style={{ alignItems: "center" , marginLeft:"18px"}}>
          RAW DATA
         </div>
        <Link to="/amx/processdata" style={{ alignItems: "center",marginLeft:"20px" }} className="col-lg-2 col-sm-2 col-md-2">
          PROCESSED DATA
        </Link>
        <div style={{ alignItems: "center" ,marginLeft:"20px"}} className="col-lg-2 col-sm-2 col-md-2">DGPS DATA</div>
        <div style={{ alignItems: "center",marginLeft:"20px"}} className="col-lg-2 col-sm-2 col-md-2">VIDEO</div>
        <div style={{ alignItems: "center",marginLeft:"20px" }} className="col-lg-2 col-sm-2 col-md-2">ADDITIONAL DATA</div> 
      </div> */}
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default ParentProject;
