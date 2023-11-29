import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faClose } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Tooltip,Spinner } from 'reactstrap';
import pdfImage from "../../../src/views/assets/images/fileimagesLogo/pdf.png";
import mp4Logo from "../../../src/views/assets/images/fileimagesLogo/mp4logo.png";
import fileImageLogo from "../../../src/views/assets/images/fileimagesLogo/textlogo.png";
import imageLogo from "../../../src/views/assets/images/fileimagesLogo/imgeLogo.png";
import backImage from "../../../src/views/assets/images/fileimagesLogo/backImage.png";
import DropFileInput from "views/DropFileInput/DropFileInput";
import ModalFolders from "views/Home/ModalFolders";
import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";

import drone from "../../assets/drone.png";


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalFolders2 from "views/Home/ModalFolders2";
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
const ModalParent = ({ nestedToggle }) => {
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
  
  // const handleSomeAction = () => {
  //   // Perform some action here
  //   // ...
  //   // Then close the Modal dynamically using nestedToggle
  //   nestedToggle();
  // };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleView = () => {
    // Handle view action here
  };

  const handleDownload = () => {
    // Handle download action here
  };

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

  const [loading,setLoading]=useState(true)
  let GetAllProjects = async () => {
    
    setLoading(true)
    try {
      // let data = await axios.get(
      //   "https://fibregrid.amxdrones.com/dronecount/projects/",
      //   config
      // );
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/",
        config
      );
      console.log(data.data[0].folder_structure, "projectdata====>");
      setfolder_list(data.data[0].folder_structure);
   
      setLoading(false)
    } catch (error) {
      console.log(error);
      
    setLoading(true)
    }
  };
  const [storagedata, setstoragedata] = useState();
  const GetstorageData = async () => {


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
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    GetAllProjects();
    GetstorageData();
  
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

  const [projectdata, setProjectData] = useState({
    name: "",
    user_id: userIdO,
  });
  const [errors, setErrors] = useState({
    name: false,
  });
  const handleChange = (e) =>{
    setProjectData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors({ ...errors, [e.target.name]: false });
  }


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
      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/projects/",
          projectdata,
          config
        )
        .then((res) => {
          const data2 = res.data;
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
          if (err.response) {
            if (err.response.data.error === 'Project with the same name already exists') {
              toast.error("Project with the same name already exists. Please try again later!", {
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
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const [showModal, setShowModal] = useState(false); // Initialize showModal with false

  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleSomeAction = (folderData) => {
    localStorage.setItem("project_id",folderData)
    setSelectedFolder(folderData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFolder(null);
  };
  // const handleSomeAction = (id) => {
  //   // Perform the navigation using history.push
  //   history.push("/amx/savefolders?project_id=" + id);

  //   // Set the state to open the modal
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   // Close the Modal
  //   setShowModal(false);
  // };
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
          {loading ? <>
        
        <Spinner size="md" 
        color="primary" style={{
            'height': '2rem',
            'width': '2rem'
          }}>
       
        </Spinner>
        <span style={{ fontSize: "20px" }}>
          {' '} Fetching Projects
        </span>
               </>:
               <>
            <div style={{}} className="row">
              {folder_list1.length >= 1
                ? folder_list1.map(
                    (item) => (
                      <>
               
                        <div
                          // onClick={() =>
                          //   history.push("/amx/savefolders?project_id=" + item.id)
                          // }
                        onClick={() => handleSomeAction(item.name)}
                          // onClick={handleSomeAction(item.id)}
                        >
                          <div className="file-cards">
                            <div
                              style={{}}
                              className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5"
                            >
                              <div
                                data={color}
                                style={{ alignContent: "center" }}
                                class="folder"
                              >
                                 <div class="folder-inside" style={{}}></div>
                              </div>

                            </div>
                          </div>
                          <h4
                            style={{
                              fontSize: 12,
                              textAlign: "center",
                              paddingTop: "10px",
                            }}
                          >
                              {/* <button >{item.name}</button> */}
                              {/* {item.id}- */}
                            {item.name.split("(")[0].trim()}
                          </h4>
                        </div>
                      </>
                    )

                  )
                : null}


            </div>
            </>}
            <Modal isOpen={showModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Select Folders</ModalHeader>
        <ModalBody>
          {/* Render the FolderContentModal with selected folder data */}
          {/* ModalParent modalbody */}
          {selectedFolder && <ModalFolders folderDataName={selectedFolder} />}
        </ModalBody>
        <ModalFooter>
        {/* <ModalFooter>
            <Button color="primary" >
              Do Something
            </Button>{' '}
            <Button color="secondary" >
              Cancel
            </Button>
          </ModalFooter> */}
        </ModalFooter>
      </Modal>
            <div
              className={addprojectopen == true ? "overlay show" : "overlay"}
            >
              <div className="popup-outer-process">
                <div className="popup-box-process">
                  <FontAwesomeIcon
                    onClick={CloseProject}
                    className="close"
                    icon={faClose}
                  />
                  <div className="profile-text-process">
                     <div className="text-process">
                      <span className="name">Create Projects</span>
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
                                <span className="form-labels"><span className="asterisk-symbol">*</span>Enter Project Name: </span>
            
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
          <span className="error-message">Project Name is required</span>
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
                              <div class="form-group row">
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                     <div className="button">
                      <button
                        id="close"
                        onClick={handleSubmit}
                        className="cancel"
                        class="btn btn-primary"
                      >
                        ADD
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* <div
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
             

           
            </div> */}
          
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
};
export default ModalParent;
