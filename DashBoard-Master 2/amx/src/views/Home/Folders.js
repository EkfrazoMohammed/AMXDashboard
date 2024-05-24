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
import folderimage from "../../../src/views/assets/images/folder-png-3d.png"
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import drone from "../../assets/drone.png";
import "../projects/Project.css";

import storage from "../../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { saveAs } from "file-saver";

import { CircularProgressbar } from "react-circular-progressbar";

function Folders() {
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [uploadingfolder, setUploadingfolder] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleBack = () => setTooltipOpen(!tooltipOpen);

  const [tooltipOpenFile, setTooltipOpenFile] = useState(false);
  const toggleFile = () => setTooltipOpenFile(!tooltipOpenFile);

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
  const [addfolderopen, setaddfolderopen] = React.useState(false);
  const AddFolder = (name) => {
    console.log("AddFolder======");
    setaddfolderopen(true);
  };
  const CloseFolder = (name) => {
    setaddfolderopen(false);
    setTimeout(()=>{
      window.location.reload()
    },1000)
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
    if (!folderData.folder_name) {
      setErrors({
        folder_name: !folderData.folder_name,
      });
      return;
    }
    try {
      setSaveFolder(true);
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
          setSaveFolder(false);

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
          setSaveFolder(false);
          if (err.response) {
            if (
              err.response.data.message ===
              "Folder name already exists in the specified location"
            ) {
              toast.error("Folder name already exists !", {
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
              setSaveFolder(false);
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
            }
            fetchData();
            CloseFolder();
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [is_true_progress, setProgessState] = useState(false);

  const goBack = () => {
    window.history.back();

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const paramValue_project_id = queryParams.get("project_id");

  const paramValue_folder_id = queryParams.get("folder_id");

  const [data, setData] = useState([]);

  const [project_id, setProjectID] = useState();
  const [folder_id, setFolderID] = useState();

  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");

  const [newfolder, setNewFolder] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [selectedFile, setSelectedFiles] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState(null);

  const [displayFileButton, setDisplayFileButton] = useState(true);
  const [displayFolderButton, setDisplayFolderButton] = useState(true);

  // const onFileChange = (files) => {
  //   console.log(files.length);
  //   if (files.length === 1 && files[0].type === "") {

  //     setSelectedFolder(files[0]);

  //     setSelectedFiles(null);

  //     setDisplayFolderButton(true);
  //   } else {

  //     setSelectedFolder(null);
  //     setSelectedFiles(files);
  //     setDisplayFolderButton(false);
  //   }
  // };

  console.log(selectedFile);
  console.log(selectedFolder);

  // const onFolderChange = (folder) => {
  //   // Check if a single folder is selected
  //   console.log(folder);
  //   if (folder.length === 1 && folder[0].type === "") {
  //     // Handle folder selection
  //     setSelectedFolder(folder[0]);

  //     setSelectedFiles(null); // Clear previously selected files
  //   } else {
  //     // Handle individual file selection
  //     setSelectedFolder(null); // Clear selected folder
  //     setSelectedFiles(folder); // Store the array of files
  //   }
  // };

  const onFileChange = (files) => {
    // Check if files contain at least one file (not a folder)
    const hasFiles = files.some((file) => file.type !== "");

    setSelectedFiles(files);
    setSelectedFolder(hasFiles ? null : files[0]); // Select a folder if it's the only item
    setSelectedFolder(hasFiles ? null : 0); // Select a folder if it's the only item

    // Show/hide the "Upload Folders" button based on the selection
    setDisplayFolderButton(!hasFiles);
  };

  const onFolderChange = (folder) => {
    // Check if a single folder is selected
    if (folder.length === 1 && folder[0].type === "") {
      // Handle folder selection

      console.log(folder[0]);
      setSelectedFolder([folder[0]]); // Set selectedFolder as an array containing the selected folder
      setSelectedFiles(null); // Clear previously selected files
    } else {
      // Handle individual file selection
      setSelectedFolder(folder); // Set selectedFolder as an array containing selected files
      setSelectedFiles(null); // Clear selected files
    }
  };

  const handleUpload = async () => {
    setProgessState(true);
    console.log(selectedFile);
    if (!selectedFile || selectedFile.length === 0) {
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
    for (let index = 0; index < selectedFile.length; index++) {
      const singleFile = selectedFile[index];
      console.log(singleFile);
      const new_api_url =
        "https://fibregrid.amxdrones.com/dronecount/v2/upload-file/";
      const formData = new FormData();

      // Append the fields to the FormData object
      formData.append("user_id", userId);
      formData.append("folder_name", folderIdo);
      formData.append("upload_file", singleFile);

      console.log(formData);
      setUploading(false);
      try {
        setUploading(true);
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

          if (completedUploads === selectedFile.length) {
            // await sendBytes();
            setUploading(false);
            toast.success("New File added !", {
              // ... (your toast options)
            });
            setTimeout(() => {
              window.location.reload();
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
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        }
      } catch (error) {
        setUploading(false);
        console.error("Error:", error);
        console.error(
          "error.response.data.message:",
          error.response.data.message
        );
        if (
          error &&
          error.response.data.message ===
            "File name already exists in the specified location"
        ) {
          toast.error("File name already exists!", {
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
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      }
    }
  };

  const handleFolderChange = (folder, name) => {
    console.log(folder);
    console.log(name);
    setSelectedFolder(folder);
    setSelectedFolderName(name);
  };

  const handleUpload2 = async () => {
    if (!selectedFolder) {
      // alert("Please select a folder to upload.");
      toast.info("Please select a folder!", {
        // ... (your toast options)
      });
      return;
    }
    console.log(selectedFolder);
    const new_api_url =
      "https://fibregrid.amxdrones.com/dronecount/api/upload_folder_zip/";
    const formData = new FormData();

    // Append the fields to the FormData object
    formData.append("user_id", userId);
    formData.append("folder_name", folderIdo);
    formData.append("folder", selectedFolder);

    console.log(formData);
    setUploadingfolder(false);
    try {
      setUploadingfolder(true);

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
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);

        // await sendBytes();
        setUploadingfolder(false);
        setSelectedFolder(null);
        toast.success("New Folder added !", {
          // ... (your toast options)
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setUploadingfolder(false);
        setSelectedFolder(null);
        throw new Error("Error occurred during folder upload.");
        toast.error("Failed to upload folder!", {
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
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setUploadingfolder(false);
      setSelectedFolder(null);
      console.error("Error:", error);
      toast.error("Failed to upload folder, Try again!", {
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
        window.location.reload();
      }, 3000);
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
        setLoading(false
          ); // Finish loading, whether successful or not
      }
    }

    if (paramValue_folder_id) {
      setFolderID(paramValue_folder_id);
      console.log(paramValue_folder_id);
      localStorage.setItem("folder_id", paramValue_folder_id);
      setShowfileButton(true);
      setShowfolderButton(true);
      if (paramValue_folder_id.startsWith("KML")) {
        // Folder name starts with "KML," show an alert
        console.log("Found a folder starting with 'KML'");
        setShowfileButton(false);
      }

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

        // Matches patterns like "(49cb3faf-f3...)"
        const excludedPatterns = [/\(\w+-\w+\)/];

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
          "kmz",
          "xml",
          "svg",
          "json",
          "bin",
          "txt"
        ];

        const files11 = jsonData.filter((item) => {
          const match = item.name.match(/^(.*?)\s*\([^)]*\)\s*$/);
          const filename = match ? match[1] : item.name;
          // console.log("files11=>", filename);
          const extensionMatch = filename.match(/\.([^.]+)$/);
          const extension = extensionMatch ? extensionMatch[1] : "";
          // console.log(extension)
          // Exclude items with empty or only a dot (.) in the name
          if (!filename || filename.trim() === ".") {
            return false;
          }

          return allowedExtensions.includes(extension.toLowerCase()); // Convert to lowercase for case-insensitive comparison
        });

        const folders11 = jsonData.filter((item) => {
          // Check if JSON data of folders is not just a dot (.) and not in the files11 array
          return item.name !== "." && !files11.includes(item);
        });

        setData(folders11);
        // console.log(folders11);
        setFileList(files11);
        // console.log(files11);
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

  const [saveFolder, setSaveFolder] = useState(false);

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

    window.location.reload();
  };

  const reloadAndGetData = (item) => {
    console.log("=========...", item);
    history.push("/amx/folders?folder_id=" + item.name);
    localStorage.setItem("folder_id", item.name);
    window.location.reload();
  };

  const getFileExtension = (fileName) => {
    if (fileName) {
      const splitFileName = fileName.split(".");
      return splitFileName[splitFileName.length - 1];
    }
    return "";
  };

  const renderFileElement = (name, item) => {

  
    const url = item.url;
    console.log(item.name)


    // const filename = "(a79c0cbf)mysore.kml";

    // Extract text between parentheses
    const extractedName = item.name.match(/\((.*?)\)/)[1]; // Extracts the text inside parentheses
    
    // Remove text within parentheses and the extension
    const nameWithoutExtension = item.name.replace(/\([^)]*\)|\.[^.]+$/, '');
    
    console.log(nameWithoutExtension); // Output: mysore
    

    const extension = getFileExtension(item.name.replace(/\s\([^)]*\)/, ""));
console.log("extension",extension)
    const downloadFile = (name, url) => {
      axios({
        url: url,
        method: "GET",
        responseType: "blob",
      }) .then(response => {
        // const blob = new Blob([response.data]);
         // Get the content type from the response headers
         const contentType = response.headers['content-type'];
    
         // Create a Blob with the correct content type
         const blob = new Blob([response.data], { type: contentType });
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = nameWithoutExtension;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectURL);
      })
      .catch(error => console.error('Error downloading file:', error));
        // .then((response) => {
        //   const blob = new Blob([response.data]);
        //   const link = document.createElement("a");
        //   link.href = window.URL.createObjectURL(blob);
        //   link.setAttribute("download", name);
        //   link.style.display = "none";
        //   document.body.appendChild(link);
        //   link.click();
        //   document.body.removeChild(link);
        // })
        // .catch((error) => {
        //   console.error("Error downloading file:", error);
        // });
    };

    const handleView = () => {
      window.open(url, "_blank");
    };

    const deleteFile = async () => {
      try {
        console.log("Deleting file:", item.name);

        const payload = {
          user_id: userId,
          file_name: item.name,
        };

        const response = await axios.delete(
          "https://fibregrid.amxdrones.com/dronecount/delete/",
          {
            data: payload,
          }
        );

        console.log("File deletion response:", response.data);
        toast.success(
          item.name.replace(/\s\([^)]*\)/, "") + " deleted successfully!",
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error("Error deleting file:", err);
        if (err.response.data.message) {
          toast.error(err.response.data.message + "!", {
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
        }
      }
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
              <DropdownItem onClick={() => deleteFile()}>Delete</DropdownItem>
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
            <DropdownToggle
              data-toggle="dropdown"
              tag="span"
              className="text-info"
            >
              <img src={imageLogo} alt="png" />
            </DropdownToggle>
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={handleView}>View</DropdownItem>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                Download
              </DropdownItem>

              <DropdownItem onClick={() => deleteFile()}>Delete</DropdownItem>
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

              <DropdownItem onClick={() => deleteFile()}>Delete</DropdownItem>
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

              <DropdownItem onClick={() => deleteFile()}>Delete</DropdownItem>
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

                  <span className="form-labels">
                    <span className="asterisk-symbol">*</span>Enter Folder Name:{" "}
                  </span>

                  <input
                    type="text"
                    class="form-control"
                    id="folder_name"
                    name="folder_name"
                    placeholder="Enter Folder Name"
                    onChange={handleChange2}
                  />
                  {errors.folder_name && (
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

                  <div className="button">
                    <button id="close" onClick={CloseFolder} className="cancel">
                      Cancel
                    </button>
                    {saveFolder ? (
                      <>
                        <button
                          color="secondary"
                          disabled
                          className="send"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Spinner
                            size="md"
                            color="secondary"
                            style={{
                              height: "12px",
                              width: "12px",
                            }}
                          ></Spinner>
                          <span> Creating Folder</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="send" onClick={handleSubmit2}>
                          Create Folder
                        </button>
                      </>
                    )}
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
                   
                      style={{ cursor: "pointer", margin: "0 1rem" }}
                    >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={goBack}
                        >
                          Back
                        </button>
                      {/* <img src={backImage} alt="" height={25} /> */}
                    </div>
             
                     
                   
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
                     <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'75vh',width:'100%',justifyContent:'center',overflow:'hidden'}}>

                     <img src="https://cdnl.iconscout.com/lottie/premium/thumb/loading-5966360-4958661.gif" width='60px' alt="" />
                      <span style={{ fontSize: "20px" }}>
                        {" "}
                        Fetching Data
                      </span>
                    </div>
                  ) : data.length === 0 && fileList.length === 0 ? (
                    <>
                      <div style={{}} className="row mt-4 flex-column ml-2">
                        <div style={{ fontSize: "20px" }}>
                          {" "}
                          No Folders / Files
                        </div>
                        <div className="row">
                          {showfileButton ? (
                            <div style={{padding:"1rem 1rem 1rem 0"}}>
                              <button
                                data={color}
                                type="file"
                                id="TooltipExampleFile2"
                                className="header-content-btn1"
                                onClick={openFIlePopUp}
                                style={{margin:"1rem .5rem"}}
                              >
                                +
                              </button>
                              <Tooltip
                                autohide={true}
                                flip={true}
                                isOpen={tooltipOpenFile}
                                target="TooltipExampleFile2"
                                toggle={toggleFile}
                                placement="top"
                              >
                                <div>Add folders/files</div>
                              </Tooltip>
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
                                      <div
                                        class="folder-inside"
                                        style={{}}
                                      >

                                      </div>
                                    </div>

                                
                                  </div>
                                </div> */}
                              <div  style={{width:'130px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer'}} onClick={reloadAndGetData.bind(null, item)}>
                                 <img src={folderimage} style={{height:'100px',width:'100px'}}    alt="" />
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

                        {fileList.map((item) => (
                          <div key={item.id}>
                            {" "}
                            {/* Assuming item has a unique ID */}
                            <div className="file-cards">
                              <div className="col-lg-1 col-sm-2 col-md-2 mb-5 mt-5 w-100">
                                <div className="file">
                                  {item.name &&
                                    renderFileElement(
                                      getFileExtension(item.name),
                                      item
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
                              {/* {item.name.replace(/\s\([^)]*\)/, '') && item.name.replace(/\s\([^)]*\)/, '').length > 15
                                  ? `${item.name.replace(/\s\([^)]*\)/, '').slice(0, 15)}...`
                                  : item.name.replace(/\s\([^)]*\)/, '')} */}
                              {/* {item.name.replace(/\s\([^)]*\)/g, "").length > 15
                                ? `${item.name
                                    .replace(/\s\([^)]*\)/g, "")
                                    .slice(0, 15)}...`
                                : item.name.replace(/\s\([^)]*\)/g, "")} */}

{item.name.replace(/\s*\([^)]*\)/g, '').length > 15
    ? `${item.name.replace(/\s*\([^)]*\)/g, '').slice(0, 15)}...`
    : item.name.replace(/\s*\([^)]*\)/g, '')}
                            </h4>
                          </div>
                        ))}

                        {showfileButton ? (
                          <div className="p-4">
                            <button
                              data={color}
                              type="file"
                              id="TooltipExampleFile2"
                              className="header-content-btn1"
                              onClick={openFIlePopUp}
                            >
                              +
                            </button>
                            <Tooltip
                              autohide={true}
                              flip={true}
                              isOpen={tooltipOpenFile}
                              target="TooltipExampleFile2"
                              toggle={toggleFile}
                              placement="top"
                            >
                              <div>Add folders/files</div>
                            </Tooltip>
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
                            <span className="name">Upload Files </span>

                            {/* <span className="profession">Web & Web Designer</span> */}
                          </div>
                        </div>

                        <div className="wraper-dashboard">
                        <div className="wraper-card-content-dashboard text-center">
                            {/* <input type="file" onChange={handleChange} /> */}
                            <DropFileInput
                              onFileChange={(files) => onFileChange(files)}
                              onFolderChange={(folder, name) =>
                                handleFolderChange(folder, name)
                              }
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
                             onFileChange={(files) => onFileChange(files)}
                            /> */}
                          </div>
                        </div>
                        <div className="button">
                         
                          {selectedFile != null && selectedFile.length > 0 ? (
                            <>
                              {uploading ? (
                                <>
                                  <button
                                    color="primary"
                                    disabled
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <Spinner
                                      size="md"
                                      color="secondary"
                                      style={{
                                        height: "15px",
                                        width: "15px",
                                      }}
                                    ></Spinner>
                                    <span>Uploading files</span>
                                  </button>
                                </>
                              ) : (
                                <>
                                 <button className="send" onClick={handleUpload}>
                            Upload Files
                          </button>

                                  {/* <button
                                    className="send"
                                    onClick={handleUpload}
                                  >
                                    Upload Files
                                  </button> */}
                                </>
                              )}
                            </>
                          ) : null}

                          {selectedFolder !== null ? (
                            <>
                              {uploadingfolder ? (
                                <>
                                  <button
                                    color="primary"
                                    disabled
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <Spinner
                                      size="md"
                                      color="secondary"
                                      style={{
                                        height: "15px",
                                        width: "15px",
                                      }}
                                    ></Spinner>
                                    <span>Uploading folder</span>
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="send"
                                    onClick={handleUpload2}
                                  >
                                    Upload Folder
                                  </button>
                                </>
                              )}
                            </>
                          ) : null}

                          <button
                            id="close"
                            onClick={CloseProject}
                            className="cancel"
                          >
                            Cancel
                          </button>

                          {/* {displayFolderButton ||
                          fileList.length === 0 ? (
                            <>
                              <button className="send" onClick={handleUpload2}>
                                Upload Folders
                              </button>
                            </>
                          ) : null} */}
                        </div>
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
