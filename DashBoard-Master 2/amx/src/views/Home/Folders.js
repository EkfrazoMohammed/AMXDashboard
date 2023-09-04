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

// import { toast } from "react-toastify";
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
  // const userIdO = localStorage.getItem("user_id");
  // const [folderData, setFolderData] = useState({
  //   name: "",
  //   user_id: userId,
  // });
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
      // let data1 = await axios
      //   .put(
      //     "https://fibregrid.amxdrones.com/dronecount/projects/" +
      //       localStorage.getItem("project_id") +
      //       "/folders/" +
      //       localStorage.getItem("folder_id") +
      //       "/",
      //     folderData,
      //     config2
      //   )
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
          //           CloseProject();
          //           GetAllProjects();
          // GetRecentProjects();
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if(err.response.data.message==="Folder name already exists in the specified location"){
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
            }else{
              
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
 const [selectedFile, setSelectedFiles] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState(null);
  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // const onFileChange = async (files) => {
  //   console.log(files);
  //   // setImageData(files)
  //   setFile(files[0]);
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
  const onFolderChange = (folder) => {
    // Check if a single folder is selected
    if (folder.length === 1 && folder[0].type === "") {
      // Handle folder selection
      setSelectedFolder(folder[0]);
      
      setSelectedFiles(null); // Clear previously selected files
    } else {
      // Handle individual file selection
      setSelectedFolder(null); // Clear selected folder
      setSelectedFiles(folder); // Store the array of files
    }
  };
  // const handleFolderChange = async (files) => {
  //   const zip = new JSZip();

  //   // Create a zip file and add each selected file to it
  //   for (const file of files) {
  //     const arrayBuffer = await file.arrayBuffer();
  //     zip.file(file.name, arrayBuffer);
  //   }

  //   // Generate the zip data
  //   const zipData = await zip.generateAsync({ type: 'blob' });
  //   console.log(zipData)

  //   // Create a Blob URL for the zip data
  //   const blobUrl = URL.createObjectURL(zipData);

  //   console.log(blobUrl)
  //   // Create a temporary link element for downloading
  //   // const downloadLink = document.createElement('a');
  //   // downloadLink.href = blobUrl;
  //   // downloadLink.download = 'files.zip';
  //   // downloadLink.click();

  //   // // Clean up the Blob URL
  //   // URL.revokeObjectURL(blobUrl);
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

          if (completedUploads === selectedFile.length) {
            // await sendBytes();
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
          setTimeout(() => {
            window.location.reload();
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
          window.location.reload();
        }, 3000);
      }
    }
  };


  const handleFolderChange = (folder,name) => {
    console.log(folder);
    console.log(name)
    setSelectedFolder(folder);
    setSelectedFolderName(name)
  };
  
  console.log(selectedFolder)
  
  const handleUpload2 = async () => {
    if (!selectedFolder) {
      alert("Please select a folder to upload.");
      return;
    }
  console.log(selectedFolder)
  // zip.loadAsync(selectedFolder)
  // .then(zipFile => {
  //   // Iterate through each file in the ZIP archive
  //   zipFile.forEach((relativePath, zipEntry) => {
  //     // Get the parent folder name
  //     const parentFolder = relativePath.split('/')[0];
      
  //     // Now you can use 'parentFolder' as needed
  //     console.log("Parent Folder:", parentFolder);
  //   });
  // })
  // .catch(error => {
  //   console.error("Error reading ZIP file:", error);
  // });
  const new_api_url =
  "https://fibregrid.amxdrones.com/dronecount/api/upload_folder_zip/";
const formData = new FormData();

// Append the fields to the FormData object
formData.append("user_id", userId);
formData.append("folder_name", folderIdo);
formData.append("folder", selectedFolder);

console.log(formData);
try {
  setSelectedFolder(null)
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
  console.log(response)
  if (response.status === 200) {
    console.log(response.data);
   

      // await sendBytes();
      toast.success("New Folder added !", {
        // ... (your toast options)
      });
      setTimeout(() => {
        // window.location.reload();
      }, 3000);
   
  } 
  else {
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
  setSelectedFolder(null)
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
        setLoading(false); // Finish loading, whether successful or not
      }
    }

    if (paramValue_folder_id) {
      setFolderID(paramValue_folder_id);
      console.log(paramValue_folder_id)
      setShowfileButton(true);
      setShowfolderButton(true);
      if (paramValue_folder_id.startsWith("KML")) {
        // Folder name starts with "KML," show an alert
        console.log("Found a folder starting with 'KML'");
        setShowfileButton(false);
      }
   
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

        //       const allowedExtensions = ['jpg', 'jpeg', 'mp3', 'mp4', 'zip', 'laz'];

       
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

        // Filter files based on extensions
        // const files11 = jsonData.filter(item => allowedExtensions.includes(getFileExtension(item.name)));
        // const files11 = jsonData.filter((item) => {
        //   console.log("files11=>",item.name.replace(/\s\([^)]*\)/, ''))
        //   const extension = getFileExtension(item.name.replace(/\s\([^)]*\)/, ''));
        //   console.log(extension)
        //   return allowedExtensions.includes(extension);
        // });
        // Filter files based on extensions
const files11 = jsonData.filter((item) => {
  const match = item.name.match(/^(.*?)\s*\([^)]*\)\s*$/);
  const filename = match ? match[1] : item.name;
  // console.log("files11=>", filename);
  const extensionMatch = filename.match(/\.([^.]+)$/);
  const extension = extensionMatch ? extensionMatch[1] : '';
  // console.log(extension)
  return allowedExtensions.includes(extension.toLowerCase()); // Convert to lowercase for case-insensitive comparison
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
 

  const getFileExtension = (fileName) => {
    if (fileName) {
      const splitFileName = fileName.split(".");
      return splitFileName[splitFileName.length - 1];
    }
    return "";
  };
  const downloadFileAtUrl = (url) => {
    console.log(url)
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        console.log(blobURL)

        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  const renderFileElement = (name, item) => {
    const url=item.url;
   
    // console.log(item.url)
    const extension = getFileExtension(name.replace(/\s\([^)]*\)/, ''));

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

    const deleteFile = async () => {
      try {
        console.log('Deleting file:', item.name);
    
        const payload = {
          user_id: userId,
          file_name: item.name
        };
    
        const response = await axios.delete("https://fibregrid.amxdrones.com/dronecount/delete/", {
  data: payload
});

        console.log('File deletion response:', response.data);
        toast.success(item.name.replace(/\s\([^)]*\)/, '')+ " deleted successfully!", {
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
        setTimeout(()=>{
          window.location.reload()
        },1000)
      } catch (err) {
        console.error('Error deleting file:', err);
        if(err.response.data.message){
          toast.error(err.response.data.message+"!", {
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
        }else{
          
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
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img src={imageLogo} alt="png" />
            </DropdownToggle>
            <DropdownMenu style={{ width: "auto" }}>
              <DropdownItem onClick={() => downloadFile(name, url)}>
                       
                Download
              </DropdownItem>
              <DropdownItem onClick={handleView}>View</DropdownItem>
               
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
                        

                          {fileList.map((item) => (
                            <div key={item.id}>
                              {" "}
                              {/* Assuming item has a unique ID */}
                              <div className="file-cards">
                                <div className="col-lg-1 col-sm-2 col-md-2 mb-5 mt-5 w-100">
                                  <div className="file">
                                    {item.name &&
                                      renderFileElement(
                                        getFileExtension(item.name)
                                        ,
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
                                {item.name.replace(/\s\([^)]*\)/, '') && item.name.replace(/\s\([^)]*\)/, '').length > 15
                                  ? `${item.name.replace(/\s\([^)]*\)/, '').slice(0, 15)}...`
                                  : item.name.replace(/\s\([^)]*\)/, '')}
                              </h4>
                            </div>
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
                              onFolderChange={(folder,name) => handleFolderChange(folder,name)}
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
