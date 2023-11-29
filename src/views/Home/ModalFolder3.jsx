import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faClose } from "@fortawesome/free-solid-svg-icons";

import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

import { Tooltip,Spinner } from 'reactstrap';
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
import "../projects/Project.css";

import storage from "../../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { saveAs } from "file-saver";

import { CircularProgressbar } from "react-circular-progressbar";
import ModalFolders from "./ModalFolders";
import ModalFolders2 from "./ModalFolders2";

function ModalFolders3({ folderDataName }) {

  
  console.log(folderDataName)
  let userId = localStorage.getItem("user_id");
  // const userIdO = localStorage.getItem("user_id");
  const [folderData, setFolderData] = useState({
    name: "",
    user_id: userId,
  });
  const [errors, setErrors] = useState({
    name: false,
  });
  // console.log(folderData);
  const [addfolderopen, setaddfolderopen] = React.useState(false);
  const AddFolder = (name) => {
    console.log("AddFolder======");
    setaddfolderopen(true);
  };
  const CloseFolder = (name) => {
    setaddfolderopen(false);
  };
  const handleChange2 = (e) => {
    setFolderData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors({ ...errors, [e.target.name]: false });
  };

  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config2 = {
    headers: {
      Authorization: amxtokenO,
    },
  };
  const [nestedModalOpen, setNestedModalOpen] = useState(false);
  const [selectedSubFolderId, setSelectedSubFolderId] = useState(null);

  const handleNestedModalOpen = (subfolderId) => {
    setSelectedSubFolderId(subfolderId);
    
    setNestedModalOpen(true);
  };
  

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // const paramValue_project_id = queryParams.get("project_id");
  const paramValue_project_id = localStorage.getItem('project_id');

  const paramValue_folder_id = localStorage.getItem("folder_name");

  // console.log("paramValue_project_id==>", paramValue_project_id);
  // console.log("paramValue_folder_id==>", paramValue_folder_id);

  const [data, setData] = useState([]);

  const [project_id, setProjectID] = useState();
  const [folder_id, setFolderID] = useState();

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(0);

  

  
  
  const [showfolderButton, setShowfolderButton] = useState(false);

  const [showfileButton, setShowfileButton] = useState(false);

  const [fileList, setFileList] = useState([]);
  
  const fetchData = async () => {
    setLoading(true); // Start loading

    if (paramValue_project_id) {
      console.log("project id");
      localStorage.setItem("project_id", paramValue_project_id);
      setProjectID(paramValue_project_id);
      setShowfolderButton(false);
      setShowfileButton(false);
      const myurl =
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders" +
        "/?user_id=" +
        userId+
        "&project_name="
        +paramValue_project_id ;
        
      try {
        const response = await fetch(myurl, {
          headers: {
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
          },
        });
        console.log("response==>", response);

        const jsonData = await response.json();
        console.log("json data", jsonData);
        // setData(jsonData);
       
      
        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false); // Finish loading, whether successful or not
      }
    }

    if (paramValue_folder_id) {
      console.log("folder id");
      setFolderID(paramValue_folder_id);
      setShowfileButton(true);
      setShowfolderButton(true);
      try {
        // const response = await fetch(
        //   "https://fibregrid.amxdrones.com/dronecount/folders/" +
        //     paramValue_folder_id +
        //     "/items/?user_id=" +
        //     userId,
        //   {
        //     headers: {
        //       Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
        //     },
        //   }
        // );
        // /dronecount/v2/get-folders/?user_id=61&folder_name=PROCESSED DATA (29a3ddff-5c87-4126-bf1c-aa38638a6e60)
        const response = await fetch(
          "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/?user_id=" 
          +userId+
          "&folder_name="+paramValue_folder_id ,
           
          {
            headers: {
              Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
            },
          }
        );
        console.log("response====>", response);

        const jsonData = await response.json();

        console.log("json data", jsonData);
        const excludedPatterns = [
          /\(\w+-\w+\)/, // Matches patterns like "(49cb3faf-f3...)"
      ];
     
//       const allowedExtensions = ['jpg', 'jpeg', 'mp3', 'mp4', 'zip', 'laz'];

//       function shouldRenderFolder(fileName) {
//           return allowedExtensions.includes(getFileExtension(fileName)) ?
//                  false :
//                  (fileName.includes("(") && fileName.includes(")") &&
//                   !excludedPatterns.some(pattern => pattern.test(fileName)));
//       }
      
//       function shouldRenderFile(fileName) {
//           return allowedExtensions.includes(getFileExtension(fileName)) ||
//                  (!shouldRenderFolder(fileName) && getFileExtension(fileName) !== '');
//       }

// function getFileExtension(fileName) {
//   const splitFileName = fileName.split(".");
//   return splitFileName[splitFileName.length - 1];
// }
const allowedExtensions = ['csv','pdf','jpg','png', 'jpeg', 'mp3', 'mp4', 'zip', 'laz',"js",'md',"kml","svg","json","xml"];

// Filter files based on extensions
// const files11 = jsonData.filter(item => allowedExtensions.includes(getFileExtension(item.name)));
const files11 = jsonData.filter(item => {
  const extension = getFileExtension(item.name);
  return allowedExtensions.includes(extension);
});
// Filter folders (remaining items) based on exceptions
// const folders11 = jsonData.filter(item => !files11.includes(item));
const folders11 = jsonData.filter((item) => {
  // Check if JSON data of folders is not just a dot (.) and not in the files11 array
  return item.name !== '.' && !files11.includes(item);
});

setData(folders11)
      console.log(folders11)
      setFileList(files11)
      console.log(files11)
      // // Filter folders and files based on their extension names
      // const folders11 = jsonData.filter(item => shouldRenderFolder(item.name));
      // const files11 = jsonData.filter(item => shouldRenderFile(item.name));
      

      
      
      
        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false); // Finish loading, whether successful or not
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [folderDataName]);
  const [showModal, setShowModal] = useState(false); // Initialize showModal with false

  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleSomeAction = (folderData) => {
    localStorage.setItem("folder_name",folderData)
    setSelectedFolder(folderData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFolder(null);
  };
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const [addpFileOpen, setFileOpen] = React.useState(false);

  const [folder_list1, setfolder_list] = React.useState([]);

  const PushToCreateProject = (item) => {
    history.push("/amx/child", { all_data: item });
  };

  let openFIlePopUp = async (e) => {
    setFileOpen(true);
  };



  const getFileExtension = (url) => {
    const splitUrl = url.split(".");
    return splitUrl[splitUrl.length - 1];
  };
 
 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [selectedFolderName, setSelectedFolderName] = useState(null);

  // const [addfolderopen, setaddfolderopen] = useState(false);
  const reloadAndGetData = (item) => {
    setSelectedFolderName(item.name);
    setSelectedFolderId(item.id);
    localStorage.setItem("folder_id",item.id)

    setModalOpen(true);
    console.log(item)
  };
  const renderFileElement = (name, url) => {
    const extension = getFileExtension(url);
  
    const downloadFile = (name, url) => {
      console.log(url)
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    };
  
    const handleView = () => {
      window.open(url, '_blank');
    };
  
    if (extension.split('?')[0] === 'pdf') {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={pdfImage} alt="PDF" />
            </DropdownToggle>
            <DropdownMenu style={{ width: 'auto' }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>Download</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else if (
      extension.split('?')[0] === 'jpg' ||
      extension.split('?')[0] === 'jpeg' ||
      extension.split('?')[0] === 'png' ||
      extension.split('?')[0] === 'gif'
    ) {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={imageLogo} alt="PDF" />
            </DropdownToggle>
            <DropdownMenu style={{ width: 'auto' }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>Download</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else if (extension.split('?')[0] === 'mp4') {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={mp4Logo} alt="MP4" />
            </DropdownToggle>
            <DropdownMenu style={{ width: 'auto' }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>Download</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={fileImageLogo} alt="fileImageLogo" />
            </DropdownToggle>
            <DropdownMenu style={{ width: 'auto' }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>Download</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    }
  };
  
  const [nameKml,setNameKml]=useState('KML file');
  
 const [saving,setSaving]=useState(false);
  const handleSaveFile = async () => {
    try {
      
      setSaving(true)
      const kmlDataURL = localStorage.getItem("new_kml_file");
  
      // Convert the data URL back to a Blob
      const response = await fetch(kmlDataURL);
      const kmlBlob = await response.blob();
  
      const api_url =
        "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/?user_id=" +
        userId +
        "&folder_name=" +
        paramValue_folder_id;
  
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('folder_name', paramValue_folder_id);
  
      // Append the file Blob
      formData.append('upload_file', kmlBlob, `${nameKml}.kml`);
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
      };
  
      const uploadResponse = await axios.post(api_url, formData, {
        headers: headers,
      });
  
      if (uploadResponse.status === 200) {
        console.log("File uploaded successfully!");
        // toast.success("New KML File added !", {
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
        
        setSaving(false)
        closeAll();
        setTimeout(()=>{
          window.location.reload();

        },3000)
        // Rest of your success handling code...
      } else {
        console.error("File upload failed.");
       
        setSaving(false)
          // toast.error("File upload failed, Please try agin later !", {
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
          closeAll();
          setTimeout(()=>{
            window.location.reload();
  
          },3000)
      }
    } catch (error) {
      console.error("error", error);
      
      setSaving(true)
      console.error(
        "error.response.data.message:",
        error.response.data.message
      );
      if (
        error &&
        error.response.data.message ===
          "File name already exists in the specified location"
      ) {
        // toast.error("File name already exists!", {
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
        console.log(error.response.data.message)
      } else {
        toast.error("Failed to upload files, Try again!", {
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
      // if (error.response) {
      //   toast.error("Server down, Please try agin later !", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     icon: <img src={drone} />,
      //   });
 
      //   // closeAll();
      //   // setTimeout(()=>{
      //   //   window.location.reload();

      //   // },3000)
      // }
      // Handle catch error...
    }
  };
  
  // const handleSaveFile = async () => {

  //   try {
  //     console.log('savie1')
  //     const kmlfilepath = localStorage.getItem("new_kml_file")
  //     console.log(kmlfilepath)

  //     const api_url =
  //       "https://fibregrid.amxdrones.com/dronecount/projects/" +
  //       localStorage.getItem("project_id") +
  //       "/folders/" +
  //       localStorage.getItem("folder_id") +
  //       "/upload/";
  //     const data = { name: nameKml, file_path: kmlfilepath };

  //     const response = await fetch(api_url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage
  //           .getItem("amxtoken")
  //           .replace(/"/g, ""),
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log(await response.json());
  //       await sendBytes();
  //       // closeAll();
  //       toast.success("New KML File Saved !", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         icon: <img src={drone} />,
  //       });
  //       setTimeout(()=>{
  //         window.location.reload();

  //       },4000)

  //     }
  //   } catch (error) {
  //     console.error("error", error);
  //     toast.error("Unable to save file!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       icon: <img src={drone} />,
  //     });
  //   }
  // }
  const closeAll = () => {
    setShowModal(false);
    setSelectedFolder(null);
    setNestedModalOpen(false);
    setSelectedSubFolderId(null);
    localStorage.removeItem("folder_name")
  };
  return (
    <div>
      {/* <p>Data: {JSON.stringify(data)}</p> */}
      <BackgroundColorContext.Consumer>
        {({ color }) => (
          <>
         
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
             

             <div style={{}} className="row mt-4">
                    {data.map((item) => (
                      //  <div  className="row">
                      <>
                        {/* <Link to={item.link}> */}

                        <div onClick={reloadAndGetData.bind(null, item)}>
                          <div className="file-cards" onClick={() => handleSomeAction(item.name)}>
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
                           {/* {item.id}-    */}
                           {item.name.split("(")[0].trim()}
                          </h4>
                        </div>
                      </>
                    ))}
                      <Modal isOpen={showModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>{selectedFolderName}</ModalHeader>
        <ModalBody>
          {/* Render the FolderContentModal with selected folder data */}
          {selectedFolder && <ModalFolders3 folderDataName={selectedFolder} />}
        </ModalBody>
        {/* <ModalFooter>
          <div className="modal-footer-save-file-container">
          <label className="save-file-label-style"
                         
                        >
                         Save File as:
                         </label>
          <input 
                            type="text"
                            class="form-control save-file-input-style"
                             placeholder="Save As"
                            name="kml_file"
                            onChange={(e)=>{setNameKml(e.target.value)}}
                          />
                           
           
                          </div>
            {' '}{' '}
            <div style={{display:"flex",gap:"1rem"}}>
            <Button color="primary" onClick={handleSaveFile}>
             Save File here
            </Button>
            <Button color="secondary" onClick={closeAll}>
              Cancel
            </Button>
            </div>
        </ModalFooter> */}
          <ModalFooter>
          <div className="modal-footer-save-file-container">
          <label className="save-file-label-style"
                         
                        >
                         Save File as:
                         </label>
          <input 
                            type="text"
                            class="form-control save-file-input-style"
                             placeholder="Save As"
                            name="kml_file"
                            onChange={(e)=>{setNameKml(e.target.value)}}
                          />
                           
           
                          </div>
            {' '}{' '}
            <div style={{display:"flex",gap:"1rem"}}>
              {saving ? <>
               <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>


               <Button color="primary" disabled onClick={handleSaveFile} style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>
             {/* Save File here */}

             <Spinner
                        size="md"
                        color="secondary"
                        style={{
                        height: "15px",
                        width: "15px",
                 
                      }}
                        
                      >
            </Spinner>
                      <span>
             Saving file
             </span>
            </Button>
            </div> </> :<>
              <Button color="primary" onClick={handleSaveFile}>
             Save File here

          
            </Button>
              </> }
            {/* <Button color="primary" onClick={handleSaveFile}>
             Save File here
            </Button> */}
            <Button color="secondary" onClick={closeAll}>
              Cancel
            </Button>
            </div>
        </ModalFooter>
      </Modal>
                    {/* {fileList.map((item) => (
                      <>
                        <a
                          href={item.path_of_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={item.name}
                        >
                          <div>
                            <div className="file-cards">
                              <div
                                style={{}}
                                className="col-lg-1 col-sm-2 col-md-2 mb-5 mt-5 w-100"
                              >
                                <div
                                  style={{ alignContent: "center" }}
                                  class="file"
                                >
                                  {renderFileElement(item.path_of_file)}
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
                              {item.name.length > 15
                                ? `${item.name.slice(0, 15)}...`
                                : item.name}
                            </h4>
                          </div>
                        </a>
                      </>
                    ))} */}

                    

                    {/* {showfileButton ? (
                      <div className="p-4">
                        <button
                          data={color}
                          type="file"
                          className="header-content-btn1"
                          onClick={openFIlePopUp}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>  
              
            </div>
          </>
        )}
      </BackgroundColorContext.Consumer>
    </div>
  );
}
export default ModalFolders3;
