import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

import axios from "axios";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";

import drone from "../../assets/drone.png";
import "../projects/Project.css";

import storage from "../../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { CircularProgressbar } from "react-circular-progressbar";

function Folders() {
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
  console.log("paramValue_folder_id==>", paramValue_folder_id);

  const [data, setData] = useState([]);

  const [project_id, setPorjectID] = useState();
  const [folder_id, setFolderID] = useState();

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(0);

  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }

  const onFileChange = async (files) => {
    console.log(files);
    // setImageData(files)
    setFile(files[0]);
  };

  let [totalbytes, setTotalbytes] = useState("");
  


  function sendBytes(){
    let Bytedata = {
      user_id: localStorage.getItem("user_id"),
      total_bytes: localStorage.getItem('byte_transfered'),
    };
    
    fetch("https://fibregrid.amxdrones.com/dronecount/storage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Bytedata),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);

        // alert("success", url)
        window.location.reload();
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error("error", error);
        alert("eroror");
      });
  };

  const handleUpload = () => {
    setProgessState(true);
    if (!file) {
      alert("Please upload an file first!");
    }

    const storageRef = ref(storage, `/amx/${file.name}`);

    console.log("storageRef==>", storageRef);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log("snapshot==>>", snapshot.totalBytes);

       

        // percentage = percent
        setPercentage(percent);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url, uploadTask.snapshot);

          // setTotalbytes(uploadTask.snapshot.totalBytes);
          localStorage.setItem('byte_transfered', uploadTask.snapshot.totalBytes)
          
          // alert(url)

          const api_url =
            "https://fibregrid.amxdrones.com/dronecount/projects/" +
            localStorage.getItem("project_id") +
            "/folders/" +
            folder_id +
            "/upload/";
          const data = { name: file.name, file_path: url };

          fetch(api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((responseData) => {
              // Handle the response data
              console.log(responseData);
              

              // alert("success", url)
              sendBytes();
              
              // window.location.reload();
            })
            .catch((error) => {
              // Handle any error that occurs during the request
              console.error("error", error);
              alert("eroror");
            });
        });
      }
    );
  };

  const [showButton, setShowButton] = useState(false);

  const [fileList, setFileList] = useState([]);

  const fetchData = async () => {
    if (paramValue_project_id) {
      console.log("project id");
      localStorage.setItem("project_id", paramValue_project_id);
      setPorjectID(paramValue_project_id);
      setShowButton(false);

      try {
        const response = await fetch(
          "https://fibregrid.amxdrones.com/dronecount/pro/" +
            paramValue_project_id +
            "/"
        );
        // console.log("response==>", response)

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
      setShowButton(true);
      try {
        const response = await fetch(
          "https://fibregrid.amxdrones.com/dronecount/folders/" +
            paramValue_folder_id +
            "/items/"
        );
        console.log("response====>", response)

        const jsonData = await response.json();

        // console.log("json data", jsonData);
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

  let handleSubmit = async (e) => {};

  let openFIlePopUp = async (e) => {
    setFileOpen(true);
  };

  let AddProject = async (e) => {
    setaddprojectopen(true);
  };

  let CloseProject = async (e) => {
    setFileOpen(false);
  };

  const reloadAdGetData = (item) => {
    console.log("=========...", item);
    history.push("/amx/folders?folder_id=" + item.id);
    localStorage.setItem("folder_id", item.id);
    window.location.reload();
  };

  const getFileExtension = (url) => {
    const splitUrl = url.split(".");
    return splitUrl[splitUrl.length - 1];
  };

  const renderFileElement = (url) => {
    const extension = getFileExtension(url);

    // alert(extension.split('?')[0])

    if (extension.split("?")[0] === "pdf") {
      // return <embed src={url} width="500" height="375" type="application/pdf" />;
      return <img src={pdfImage} />;
    } else if (
      extension.split("?")[0] === "jpg" ||
      extension.split("?")[0] === "jpeg" ||
      extension.split("?")[0] === "png" ||
      extension.split("?")[0] === "gif"
    ) {
      return <img src={imageLogo} />;
    } else if (extension.split("?")[0] === "mp4") {
      return <img src={mp4Logo} />;
    } else {
      return <img src={fileImageLogo} />;
    }
  };

  return (
    <div>
      {/* <p>Data: {JSON.stringify(data)}</p> */}
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
              <h2 style={{ fontSize: "25px" }}></h2>
              <div className="main-panel">
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
                      className="col-1"
                      onClick={goBack}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={backImage} alt="" height={25} />
                    </div>
                  </div>
                  <div style={{}} className="row mt-4">
                    {data.map((item) => (
                      //  <div  className="row">
                      <>
                        {/* <Link to={item.link}> */}
                        <div onClick={reloadAdGetData.bind(null, item)}>
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

                    {fileList.map((item) => (
                      <>
                        <a
                          href={item.path_of_file}
                          target="_blank"
                          rel="noopener noreferrer"
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
                                  {/* <img src={pdfImage} />  */}

                                  {/* <div class="folder-inside" style={{}}></div> */}
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
                              {item.name}
                            </h4>
                          </div>
                        </a>
                      </>
                    ))}

                    {showButton ? (
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
                            Upload
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

export default Folders;
