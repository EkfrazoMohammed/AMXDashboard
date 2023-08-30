import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../projects/Project.css";
import { backgroundColors } from "contexts/BackgroundColorContext";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JSZip from "jszip";
import { Tooltip, Spinner } from "reactstrap";
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

import { ToastContainer, toast } from "react-toastify";

import drone from "../../assets/drone.png";
import "../projects/Project.css";

import storage from "../../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { saveAs } from "file-saver";

import { CircularProgressbar } from "react-circular-progressbar";

function Folders() {
  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  let userId = localStorage.getItem("user_id");
  const [folderList, setFolderList] = useState([]);
  let folderIdo = localStorage.getItem("folder_id");
 
  const [folderData, setFolderData] = useState({
    upload_to_folder: folderIdo,
    user_id: userId,
    folder_name: "",
  });
  const [errors, setErrors] = useState({
    folder_name: false,
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

  // console.log(folderData)
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config2 = {
    headers: {
      Authorization: amxtokenO,
    },
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!folderData.folder_name) {
      setErrors({
        folder_name: !folderData.folder_name,
      });
      return;
    }
    try {
      let payload = folderData;
      console.log(payload, "payload=====>");

      let data1 = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/v2/create-folder/",
          payload,
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
      
            fetchData();
            CloseFolder();
           
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

  const [selectedFile, setSelectedFiles] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // const onFileChange = async (files) => {
  //   console.log(files);
  //   setFile(files); // Store the array of files instead of just the first file
  // };
  const onFileChange = (files) => {
    // Check if a single folder is selected
    if (files.length === 1 && files[0].type === "") {
      // Handle folder selection
      setSelectedFolder(files[0]);
      setSelectedFiles(null); // Clear previously selected files
    } else {
      // Handle individual file selection
      setSelectedFolder(null); // Clear selected folder
      setSelectedFiles(files); // Store the array of files
    }
  };
  
  const handleFolderChange = (folder) => {
    // Handle folder change here
    setSelectedFolder(folder);
    setSelectedFiles([]); // Clear previously selected files
  };
  
  // const handleFolderChange = (folder) => {
  //   // Handle folder change here
  //   setSelectedFolder(folder);
  //   setSelectedFiles([]); // Clear previously selected files
  // };
  
  
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

      if (response.status === 200) {
        // const data = response.data;
        const tb = localStorage.getItem("bytes_transferred");
        console.log("bytes_transferred " + tb);
        console.log(`total_bytes_before_upload==> ${response.data.bytes}`);
        let sum = JSON.parse(tb) + JSON.parse(response.data.bytes);
        console.log(`total_bytes_after_upload==> ${sum}`);
        localStorage.setItem("consumed_data", sum);

        setTimeout(() => {
          window.location.reload();
        }, 2000);

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

    let completedUploads = 0; // Counter for completed uploads
    for (let index = 0; index < file.length; index++) {
      const singleFile = file[index];
      const new_api_url =
        "https://fibregrid.amxdrones.com/dronecount/v2/upload-file/";
      const formData = new FormData();

      // Append the fields to the FormData object
      formData.append("user_id", userId);
      formData.append("folder_name", folderIdo);
      formData.append("upload_file", singleFile);

      console.log(formData);
      try {
        const response = await axios.post(new_api_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
          },
          // Implement the progress event to calculate and display the percentage
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
            setPercentage(percentCompleted);
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          completedUploads++;

          if (completedUploads === file.length) {
            // await sendBytes();
            toast.success("New File added !", {
              // ... (your toast options)
            });
            setTimeout(() => {
              // window.location.reload();
            }, 3000);
          }
        } else {
          throw new Error("Error occurred during file upload.");
          toast.error("Failed to upload files!", {
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
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
        }
      } catch (error) {
        console.error("Error:", error);
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
        setTimeout(() => {
          // window.location.reload();
        }, 3000);
      }
    }
  };
  

  
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
        userId +
        "&project_name=" +
        paramValue_project_id;

      try {
        const response = await fetch(myurl, {
          headers: {
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
          },
        });
        console.log("response==>", response);

        const jsonData = await response.json();
        console.log("json data", jsonData);
        setData(jsonData);

        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Finish loading, whether successful or not
      }
    }

    if (paramValue_folder_id) {
      console.log("folder id");
      setFolderID(paramValue_folder_id);
      setShowfileButton(true);
      setShowfolderButton(true);
      try {
    const response = await fetch(
          "https://fibregrid.amxdrones.com/dronecount/v2/get-folders/?user_id=" +
            userId +
            "&folder_name=" +
            paramValue_folder_id,

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

        const allowedExtensions = [
          "html",
          "css",
          "csv",
          "pdf",
          "jpg",
          "png",
          "jpeg",
          "mp3",
          "mp4",
          "zip",
          "laz",
          "js",
          "md",
          "kml",
          "svg",
          "json",
          "xml",
        ];
        const getFileExtension = (fileName) => {
          if (fileName) {
            const splitFileName = fileName.split(".");
            return splitFileName[splitFileName.length - 1];
          }
          return "";
        };
        // Filter files based on extensions
        // const files11 = jsonData.filter(item => allowedExtensions.includes(getFileExtension(item.name)));
        const files11 = jsonData.filter((item) => {
          const extension = getFileExtension(item.name);
          return allowedExtensions.includes(extension);
        });
        // Filter folders (remaining items) based on exceptions
        const folders11 = jsonData.filter((item) => !files11.includes(item));

        setData(folders11);
        console.log(folders11);
        setFileList(files11);
        console.log(files11);
        // // Filter folders and files based on their extension names
        // const folders11 = jsonData.filter(item => shouldRenderFolder(item.name));
        // const files11 = jsonData.filter(item => shouldRenderFile(item.name));

        // dataArr = jsonData
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Finish loading, whether successful or not
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    history.push("/amx/folders?folder_id=" + item.name);
    localStorage.setItem("folder_id", item.name);
    window.location.reload();
  };



 
  

  const handleUpload2 = async () => {
    if (!selectedFolder) {
      alert("Please select a folder to upload.");
      return;
    }
  
    const zip = new JSZip();
    const folderName = selectedFolder.name;
    const folderFiles = Array.from(selectedFolder);
  
    // Read and add each file to the ZIP
    for (const file of folderFiles) {
      const fileContent = await readFileAsArrayBuffer(file);
      zip.file(file.name, fileContent); // Use file name instead of webkitRelativePath
    }
  
    const zipBlob = await zip.generateAsync({ type: "blob" });
  
    // Display the Blob in the console
    console.log("ZIP Blob:", zipBlob);
  
    // Create a FormData object and append the ZIP Blob to it
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("folder_name", folderIdo);
    formData.append("folder", zipBlob, `${folderName}.zip`);
  
    // Now you can initiate the actual upload using Axios
    try {
      const response = await axios.post(
        "https://fibregrid.amxdrones.com/dronecount/v2/upload_folder_zip/",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
            "Content-Type": "multipart/form-data", // Important for file upload
          },
        }
      );
  
      if (response.status === 200) {
        console.log("File upload successful:", response.data);
        // Handle success here
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error here
    }
  };
  

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
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
                      <span style={{ fontSize: "20px" }}>
                        {" "}
                        Fetching Folders
                      </span>
                    </>
                  ) : data.length === 0 && fileList.length === 0 ? (
                    <>
                      <div style={{}} className="row mt-4">
                        <span style={{ fontSize: "20px" }}>
                          {" "}
                          No Folders / Files
                        </span>
                        <div>
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
                      </div>
                    </>
                  ) : (
                    <>
                      {/* data.length > 0 && ( */}
                      <div style={{}} className="row mt-4">
                        {data.length === 0 ? (
                          <p></p>
                        ) : (
                          data.map((item) => (
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
                                      <div
                                        class="folder-inside"
                                        style={{}}
                                      ></div>
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
                                  {item.name.split("(")[0].trim()}
                                </h4>
                              </div>
                            </>
                          ))
                        )}
              

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
                      {/* ) */}
                    </>
                  )}
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
                              onFolderChange={(folder) => handleFolderChange(folder)}
                            />
                            {is_true_progress ? (
                              <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                              />
                            ) : (
                              ""
                            )}
                          
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
                            Upload Files
                          </button>

                          <button className="send" onClick={handleUpload2}>
    Upload Folders
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
//   const handleUpload = async () => {
  //     setProgessState(true);
  //     if (!file || file.length === 0) {
  //       toast.warn("Upload Files first !", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       return;
  //     }
  // console.log(file)
  //     const storageRefs = file.map((singleFile) => {
  //       return ref(storage, `/file/${singleFile.name}`);
  //     });

  //     const uploadTasks = storageRefs.map((storageRef, index) => {
  //       return uploadBytesResumable(storageRef, file[index]);
  //     });

  //     let completedUploads = 0; // Counter for completed uploads

  //     uploadTasks.forEach((uploadTask, index) => {
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const percent = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           setPercentage(percent);
  //           setPercent(percent);
  //         },
  //         (err) => console.log(err),
  //         async () => {
  //           try {
  //             // const url = await getDownloadURL(uploadTask.snapshot.ref);
  //             // console.log(url, uploadTask.snapshot);

  //             // const bytesTransferred = uploadTasks.reduce(
  //             //   (totalBytes, task) => totalBytes + task.snapshot.bytesTransferred,
  //             //   0
  //             // );
  //             // localStorage.setItem("bytes_transferred", bytesTransferred);

  //             // const api_url =
  //             //   "https://fibregrid.amxdrones.com/dronecount/projects/" +
  //             //   localStorage.getItem("project_id") +
  //             //   "/folders/" +
  //             //   folder_id +
  //             //   "/upload/";

  //             const new_api_url =
  //             "https://fibregrid.amxdrones.com/dronecount/v2/upload-file/ ";

  //             // const data = { name: file};
  //             const d2={
  //               user_id:userId,
  //               folder_name:folderIdo,
  //               upload_file:file
  //             }

  //             const response = await fetch(new_api_url, {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: localStorage
  //                   .getItem("amxtoken")
  //                   .replace(/"/g, ""),
  //               },
  //               body: JSON.stringify(d2),
  //               // body: JSON.stringify(data),
  //             });

  //             if (response.ok) {
  //               console.log(await response.json());
  //               completedUploads++; // Add this line to increment completedUploads

  //               if (completedUploads === uploadTasks.length) {
  //                 await sendBytes();// Call sendBytes function when all uploads are completed
  //                 toast.success("New File added !", {
  //                   position: "top-right",
  //                   autoClose: 5000,
  //                   hideProgressBar: false,
  //                   closeOnClick: true,
  //                   pauseOnHover: true,
  //                   draggable: true,
  //                   progress: undefined,
  //                   theme: "light",
  //                   icon: <img src={drone} />,
  //                 });
  //               }
  //             } else {
  //               throw new Error("Error occurred during file upload.");
  //             }
  //           } catch (error) {
  //             console.error("error", error);
  //             console.log(error.message);
  //           }
  //         }
  //         // async () => {
  //         //   try {
  //         //     const url = await getDownloadURL(uploadTask.snapshot.ref);
  //         //     console.log(url, uploadTask.snapshot);

  //         //     const bytesTransferred = uploadTasks.reduce(
  //         //       (totalBytes, task) => totalBytes + task.snapshot.bytesTransferred,
  //         //       0
  //         //     );
  //         //     localStorage.setItem("bytes_transferred", bytesTransferred);

  //         //     // const api_url =
  //         //     //   "https://fibregrid.amxdrones.com/dronecount/projects/" +
  //         //     //   localStorage.getItem("project_id") +
  //         //     //   "/folders/" +
  //         //     //   folder_id +
  //         //     //   "/upload/";

  //         //     const new_api_url =
  //         //     "https://fibregrid.amxdrones.com/dronecount/projects/" +
  //         //     localStorage.getItem("project_id") +
  //         //     "/folders/" +
  //         //     folder_id +
  //         //     "/upload/";
  //         //     const data = { name: file[index].name, file_path: url };

  //         //     const response = await fetch(new_api_url, {
  //         //       method: "POST",
  //         //       headers: {
  //         //         "Content-Type": "application/json",
  //         //         Authorization: localStorage
  //         //           .getItem("amxtoken")
  //         //           .replace(/"/g, ""),
  //         //       },
  //         //       body: JSON.stringify(data),
  //         //     });

  //         //     if (response.ok) {
  //         //       console.log(await response.json());
  //         //       completedUploads++; // Add this line to increment completedUploads

  //         //       if (completedUploads === uploadTasks.length) {
  //         //         await sendBytes();// Call sendBytes function when all uploads are completed
  //         //         toast.success("New File added !", {
  //         //           position: "top-right",
  //         //           autoClose: 5000,
  //         //           hideProgressBar: false,
  //         //           closeOnClick: true,
  //         //           pauseOnHover: true,
  //         //           draggable: true,
  //         //           progress: undefined,
  //         //           theme: "light",
  //         //           icon: <img src={drone} />,
  //         //         });
  //         //       }
  //         //     } else {
  //         //       throw new Error("Error occurred during file upload.");
  //         //     }
  //         //   } catch (error) {
  //         //     console.error("error", error);
  //         //     console.log(error.message);
  //         //   }
  //         // }
  //       );
  //     });
  //   };
