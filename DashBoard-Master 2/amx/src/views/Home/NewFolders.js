import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tooltip } from 'reactstrap';
import { faClapperboard, faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
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

function NewFolders() {
  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
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
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!folderData.name) {
      setErrors({
        name: !folderData.name,
      });
      return;
    }
    try {
      let payload = folderData;
      console.log(payload, "payload=====>");
      let data1 = await axios
        .put(
          "https://fibregrid.amxdrones.com/dronecount/projects/" +
            localStorage.getItem("project_id") +
            "/folders/" +
            localStorage.getItem("folder_id") +
            "/",
          folderData,
          config2
        )
        .then((res) => {
          const data2 = res.data;

          toast.success("New Folder added !", {
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
          CloseFolder();
          fetchData();
          //           CloseProject();
          //           GetAllProjects();
          // GetRecentProjects();
        })
        .catch((err) => {
          console.log(err);
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
            //             GetAllProjects();
            // GetRecentProjects();
            //             CloseProject();
            fetchData();
            CloseFolder();
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
  const [is_true_progress, setProgessState] = useState(false);

  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const paramValue_project_id = queryParams.get("project_id");

  const paramValue_folder_id = queryParams.get("folder_id");

  // console.log("paramValue_project_id==>", paramValue_project_id);
  // console.log("paramValue_folder_id==>", paramValue_folder_id);

  const [data, setData] = useState([]);

  const [project_id, setProjectID] = useState();
  const [folder_id, setFolderID] = useState();

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  
  const [newfolder, setNewFolder] = useState([]);
  const [percentage, setPercentage] = useState(0);

  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // const onFileChange = async (files) => {
  //   console.log(files);
  //   // setImageData(files)
  //   setFile(files[0]);
  // };
  const onFileChange = async (files) => {
    console.log(files);
    setFile(files); // Store the array of files instead of just the first file
  };

  let [totalbytes, setTotalbytes] = useState("");

  const sendBytes = async () => {
    const Bytedata = {
      user_id: localStorage.getItem("user_id"),
      total_bytes: localStorage.getItem("bytes_transferred"),
    };

    try {
      const response = await axios.post(
        "https://fibregrid.amxdrones.com/dronecount/storage/",
        Bytedata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
          },
        }
      );

      
      // if (response.status === 200) {
      //   // const data = response.data;
      //   const data = response.data;
      //   console.log(`total_bytes_after_upload==> ${data.bytes}`);
      //   localStorage.setItem("consumed_data", data.bytes);
        
      //   setTimeout(()=>{
      //   window.location.reload()
      //   },2000)
      //   // localStorage.setItem("consumed_data", "12345"); // Replace "12345" with a specific value for testing
      // }
      if (response.status === 200) {
        // const data = response.data;
        const tb=localStorage.getItem("bytes_transferred")
        console.log("bytes_transferred "+tb)
        console.log(`total_bytes_before_upload==> ${response.data.bytes}`);
        let sum=(JSON.parse(tb)+JSON.parse(response.data.bytes));
        console.log(`total_bytes_after_upload==> ${sum}`);
        localStorage.setItem("consumed_data", sum);
        
        setTimeout(()=>{
        window.location.reload()
        },2000)
        
        throw new Error("Error occurred during byte data update.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    setProgessState(true);
    if (!file || file.length === 0) {
      toast.warn("Upload Files first !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const storageRefs = file.map((singleFile) => {
      return ref(storage, `/amx/${singleFile.name}`);
    });

    const uploadTasks = storageRefs.map((storageRef, index) => {
      return uploadBytesResumable(storageRef, file[index]);
    });

    let completedUploads = 0; // Counter for completed uploads

    uploadTasks.forEach((uploadTask, index) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercentage(percent);
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(url, uploadTask.snapshot);

            const bytesTransferred = uploadTasks.reduce(
              (totalBytes, task) => totalBytes + task.snapshot.bytesTransferred,
              0
            );
            localStorage.setItem("bytes_transferred", bytesTransferred);

            const api_url =
              "https://fibregrid.amxdrones.com/dronecount/projects/" +
              localStorage.getItem("project_id") +
              "/folders/" +
              folder_id +
              "/upload/";
            const data = { name: file[index].name, file_path: url };

            const response = await fetch(api_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage
                  .getItem("amxtoken")
                  .replace(/"/g, ""),
              },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              console.log(await response.json());
              completedUploads++; // Add this line to increment completedUploads
             
              if (completedUploads === uploadTasks.length) {
                await sendBytes();// Call sendBytes function when all uploads are completed
                toast.success("New File added !", {
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
            } else {
              throw new Error("Error occurred during file upload.");
            }
          } catch (error) {
            console.error("error", error);
            console.log(error.message);
          }
        }
      );
    });
  };

 

   const [showfolderButton, setShowfolderButton] = useState(false);

  const [showfileButton, setShowfileButton] = useState(false);

  const [fileList, setFileList] = useState([]);

  const fetchData = async () => {
    if (paramValue_project_id) {
      console.log("project id");
      localStorage.setItem("project_id", paramValue_project_id);
      setProjectID(paramValue_project_id);
      setShowfolderButton(false);
      setShowfileButton(false);
      const myurl =
        "https://fibregrid.amxdrones.com/dronecount/pro/" +
        paramValue_project_id +
        "/?user_id=" +
        userId;
      try {
        const response = await fetch(myurl, {
          headers: {
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
          },
        });
        console.log("response==>", response);

        const jsonData = await response.json();
        // console.log("json data", jsonData);
        setData(jsonData);

        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (paramValue_folder_id) {
      console.log("folder id");
      setFolderID(paramValue_folder_id);
      setShowfileButton(true);
      setShowfolderButton(true);
      try {
        const response = await fetch(
          "https://fibregrid.amxdrones.com/dronecount/folders/" +
            paramValue_folder_id +
            "/items/?user_id=" +
            userId,
          {
            headers: {
              Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
            },
          }
        );
        console.log("response====>", response);

        const jsonData = await response.json();

        console.log("json data", jsonData);
        setData(jsonData.folders);

        setFileList(jsonData.files);

        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  let AddProject = async (e) => {
    setaddprojectopen(true);
  };

  let CloseProject = async (e) => {
    setFileOpen(false);
  };


  
  const reloadAndGetData = (item) => {
    console.log("=========...", item);
    history.push("/amx/folders?folder_id=" + item.id);
    localStorage.setItem("folder_id", item.id);
    window.location.reload();
  };

  const getFileExtension = (url) => {
    const splitUrl = url.split(".");
    return splitUrl[splitUrl.length - 1];
  };

  // const downloadFile = (fileUrl) => {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const downloadFileAtUrl = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));

        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  const renderFileElement = (name, url) => {
    const extension = getFileExtension(url);

    const downloadFile = (name, url) => {
      console.log(url);
      axios({
        url: url,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    };

    const handleView = () => {
      window.open(url, "_blank");
    };

    if (extension.split("?")[0] === "pdf") {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={pdfImage} alt="PDF" />
            </DropdownToggle>
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                Download
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else if (
      extension.split("?")[0] === "jpg" ||
      extension.split("?")[0] === "jpeg" ||
      extension.split("?")[0] === "png" ||
      extension.split("?")[0] === "gif"
    ) {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={imageLogo} alt="PDF" />
            </DropdownToggle>
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                Download
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    } else if (extension.split("?")[0] === "mp4") {
      return (
        <>
          <UncontrolledDropdown className="myCustomDropdown" direction="down">
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={mp4Logo} alt="MP4" />
            </DropdownToggle>
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                Download
              </DropdownItem>
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
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                Download
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      );
    }
  };

  return (
    <div>
      {/* <p>Data: {JSON.stringify(data)}</p> */}
      <BackgroundColorContext.Consumer>
        {({ color }) => (
          <>
            <ToastContainer />
            <div className={addfolderopen == true ? "overlay show" : "overlay"}>
              {/* <!-- popup box start --> */}
              <div className="popup-outer">
                <div className="popup-box">
                  {/* <i id="close" className="bx bx-x close"></i> */}
                  <FontAwesomeIcon
                    onClick={CloseFolder}
                    className="close"
                    icon={faClose}
                  />
                  <div className="profile-text">
                    {/* <img src="profile.jpg" alt="" />  */}
                    <div className="text">
                      <span className="name">Add Folder</span>
                      {/* <span className="profession">Web & Web Designer</span> */}
                    </div>
                  </div>
                  {/* <form> */}
                  {/* <div className="wraper-dashboard"> */}
                  {/* <div className="wraper-card-content-dashboard">
                    <header>Upload files </header>
                    <DropFileInput
                      onFileChange={(files) => onFileChange(files)}
                    />
                  </div> */}
                  {/* </div> */}
                  <span className="form-labels">
                    <span className="asterisk-symbol">*</span>Enter Folder Name:{" "}
                  </span>

                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Folder Name"
                    onChange={handleChange2}
                  />
                  {errors.name && (
                    <span className="error-message">
                      Folder Name is required
                    </span>
                  )}
                  <input
                    type="hidden"
                    class="form-control"
                    id="user_id"
                    name="user_id"
                    value={userId}
                    placeholder="user_id"
                    onChange={handleChange2}
                  />
                  {/* <textarea
                  spellcheck="false"
                  placeholder="Enter your message"
                ></textarea> */}
                  <div className="button">
                    <button id="close" onClick={CloseFolder} className="cancel">
                      Cancel
                    </button>
                    <button className="send" onClick={handleSubmit2}>
                      Create
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
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
              <h2 style={{ fontSize: "25px" }}></h2>
              <div className="main-panel" style={{ borderTop: "none" }}>
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
                  <div className="row">
                  <div 
              
              id="TooltipExample"
                    onClick={goBack}
                    style={{ cursor: "pointer" ,margin:"0 1rem"}}
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
                    {showfolderButton ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={AddFolder}
                        >
                          Add Folder
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div style={{}} className="row mt-4">
                    {data.map((item) => (
                      //  <div  className="row">
                      <>
                        {/* <Link to={item.link}> */}

                        <div onClick={reloadAndGetData.bind(null, item)}>
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
                            {item.name}
                          </h4>
                        </div>
                      </>
                    ))}
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

                    {fileList.map((item) => (
                      <>
                        {/* <a
                          href={item.path_of_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={item.name}
                        > */}
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
                                {renderFileElement(
                                  item.name,
                                  item.path_of_file
                                )}
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
                        {/* </a> */}
                      </>
                    ))}

                    {showfileButton ? (
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
                    )}
                  </div>
                        {/* <FolderUploadComponent /> */}
                  <div
                    className={
                      addpFileOpen == true ? "overlay show" : "overlay"
                    }
                  >
                    {/* <!-- popup box start --> */}
                    <div className="popup-outer">
                      <div className="popup-box">
                        {/* <i id="close" className="bx bx-x close"></i> */}
                        <FontAwesomeIcon
                          onClick={CloseProject}
                          className="close"
                          icon={faClose}
                        />
                        <div className="profile-text">
                          {/* <img src="profile.jpg" alt="" />  */}
                          <div className="text">
                            <span className="name">Upload files</span>

                            {/* <span className="profession">Web & Web Designer</span> */}
                          </div>
                        </div>

                        <div className="wraper-dashboard">
                          <div className="wraper-card-content-dashboard text-center">
                            {/* <input type="file" onChange={handleChange} /> */}
                            <DropFileInput
                              onFileChange={(files) => onFileChange(files)}
                            />
                            {is_true_progress ? (
                              <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                              />
                            ) : (
                              ""
                            )}
                            {/* <DropFileInput
                            //  onFileChange={(files) => onFileChange(files)}
                            /> */}
                          </div>
                        </div>
                        <div className="button">
                          <button
                            id="close"
                            onClick={CloseProject}
                            className="cancel"
                          >
                            Cancel
                          </button>
                          {/* <button className="send" onClick={UploadFile} >Upload</button> */}
                          <button className="send" onClick={handleUpload}>
                            Upload files
                          </button>
                       

                        </div>
                        {/* </form> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </BackgroundColorContext.Consumer>
    </div>
  );
}

export default NewFolders;
