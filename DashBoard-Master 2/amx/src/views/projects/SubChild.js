import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
// import { toast } from "react-toastify";
import pdfImage from "../../../src/views/assets/images/fileimagesLogo/pdf.png";
import mp4Logo from "../../../src/views/assets/images/fileimagesLogo/mp4logo.png";
import fileImageLogo from "../../../src/views/assets/images/fileimagesLogo/textlogo.png";
import imageLogo from "../../../src/views/assets/images/fileimagesLogo/imgeLogo.png";
import backImage from "../../../src/views/assets/images/fileimagesLogo/backImage.png";
import "../projects/Project.css";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "views/DropFileInput/DropFileInput";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ImageConfig } from "views/DropFileInput/config/ImageConfig";
// import "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/projects/TwoDview.css"
import { ToastContainer, toast } from "react-toastify";
import drone from "../../assets/drone.png";
// import React, { useState } from 'react';
// import { storage } from '../../../src/firebaseConfig'
import storage from "../../../src/firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const folder_list = [
  {
    project_name: "2D view",
    folder_color: "#D65A47",
    link: "/amx/twodview",
  },
  {
    project_name: "3D view",
    folder_color: "rgb(64,153,173)",
    link: "/amx/threedview",
  },
  {
    project_name: "DTM",
    folder_color: "rgb(239,185,93)",
    link: "/amx/processdata",
  },
  {
    project_name: "DSM",
    folder_color: "rgb(55,109,236)",
    link: "/amx/processdata",
  },
  {
    project_name: "NDVI",
    folder_color: "#D65A47",
    link: "/amx/processdata",
  },
];

function SubChild() {

  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  // Upload Starts

  const [imageData, setImageData] = useState();

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileData = reader.result;
      setImageData(fileData);
    };
  }
  // script

  const onFileChange = async (files) => {
    setImageData(files);
  };
  // "https://v2.convertapi.com/upload",

  const UploadFile = async () => {
    console.log("imageData", imageData[0]);
    const fromData = new FormData();
    fromData.append("file", imageData[0]);
    console.log(fromData, "newFile====>");
    try {
      await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/projects/27/folders/270/upload/",
          fromData
        )
        .then((res) => {
          console.log(res, "res=======>");
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
          setaddprojectopen(false);
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
            setaddprojectopen(false);
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

  const [allprojectdata, SetAllProjectData] = React.useState({});
  let location = useLocation();

  useEffect(() => {
    GetAllProjectsData();
  }, []);

  let GetAllProjectsData = async () => {
    console.log(location);
    console.log(location.state.all_data, "childProject");
    SetAllProjectData(location.state.all_data);
  };

  let [state, setState] = useState({
    project_name: "",
  });
  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const AddProject = (name) => {
    console.log("AddProject======");
    setaddprojectopen(true);
  };
  const CloseProject = (name) => {
    setaddprojectopen(false);
  };

  const OKProject = (name) => {
    setaddprojectopen(false);
  };
  console.log("addprojectopen====>", addprojectopen);

  // pop up endd=====

  let { project_name } = state;
  // let handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };
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
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = state;
      console.log(payload);
      let data = await axios.post(
        "http://127.0.0.1:8000/dronecount/projects/",
        payload
      );
      console.log(data);
      toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [percentage, setPercentage] = useState(0);

  const [popup, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popup);
  };
  const ClosePopup = () => {
    setPopup(false);
  };

  // const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState(0);

  const handleFileChange = (files) => {
    setFiles(files);
    console.log(files);
  };

  const handleUpload = async () => {
    setProgessState(true);

    if (!files || files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `/amx/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("bytesTransferred:", snapshot.bytesTransferred);
          console.log("totalBytes:", snapshot.totalBytes);

          let percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          console.log("percent:", percent);
          setPercentage(percent);
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);
            alert(downloadURL);

            // Make the API request for each uploaded file
            const response = await axios.post("API_URL", { data: "example" });
            const data = response.data;
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }
      );
    }
  };

  // const handleUpload = async () => {
  //   setProgessState(true);

  //   if (!file || file.length === 0) {
  //     alert("Please upload an image first!");
  //     return;
  //   }

  //   console.log(file);

  //   const storageRef = ref(storage, `/amx/${file[0].name}`);
  //   console.log(storageRef);

  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   console.log(uploadTask);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       console.log("bytesTransferred:", snapshot.bytesTransferred);
  //       console.log("totalBytes:", snapshot.totalBytes);

  //       let percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );

  //       console.log("percent:", percent);
  //       setPercentage(percent);
  //       setPercent(percent);
  //     },
  //     (err) => console.log(err),
  //     async () => {
  //       try {
  //         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //         console.log(downloadURL);
  //         alert(downloadURL);

  //         // Make the API request
  //         const response = await axios.post("API_URL", { data: "example" });
  //         const data = response.data;
  //         console.log(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   );
  // };

  //   const handleUpload = () => {

  //     setProgessState(true)
  //     if (!file) {
  //         alert("Please upload an image first!");
  //     }
  //     console.log(file)

  //     const storageRef = ref(storage, `/amx/${file.name}`);

  //     // progress can be paused and resumed. It also exposes progress updates.
  //     // Receives the storage reference and the file to upload.
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {

  //             let percent = Math.round(
  //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //             );

  //             console.log("percent==>>",percent)

  //             // percentage = percent
  //             setPercentage(percent)

  //             // update progress
  //             setPercent(percent);
  //         },
  //         (err) => console.log(err),
  //         () => {
  //             // download url
  //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //                 console.log(url);
  //                 alert(url)

  //                 const postData = async () => {
  //                   try {
  //                     const response = await axios.post('API_URL', { data: 'example' }); // Replace with the data you want to send
  //                     const data = response.data;
  //                     // Process the response data
  //                     console.log(data);
  //                   } catch (error) {
  //                     // Handle the error
  //                     console.error(error);
  //                   }
  //                 };

  //             });
  //         }
  //     );
  // };

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />
          {/* <div className="row">
                    <div
                      className="col-1"
                      onClick={goBack}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={backImage} alt="" height={25} />
                    </div>
                  </div> */}
          {/* pop UP */}

          {/* <div className={addprojectopen == true ? "overlay show" : "overlay"}>

            <div className="popup-outer-process" >
              <div className="popup-box-process">
                <FontAwesomeIcon onClick={CloseProject} className="close" icon={faClose} />
                <div className="profile-text-process" >
                  <div className="text-process">
                    <span className="name">Create Projects</span>
                  </div>
                </div>
                <form action="#">
                  <div className="">

                    <div className="" >
                      <div>




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
                         
                          </form>
                        </div>
                        <br />
                        <br />



                      </div>
                      <header>

                      </header>


                    </div>


                  </div>
                  <textarea spellcheck="false" placeholder="Enter your message"></textarea>
                  <div className="button">
                    <button id="close" onClick={CloseProject} className="cancel" class="btn btn-primary">ADD</button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          {/* popup end */}

          {/* POP UP 2 */}
          <div className={addprojectopen == true ? "overlay show" : "overlay"}>
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
                {/* <form action="#"> */}
                {/* <form > */}

                <div className="wraper-dashboard">
                  <div className="wraper-card-content-dashboard text-center">
                    {/* <header>Upload files </header> */}
                    {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                    {/* <input
                                  type="text"
                                  class="form-control"
                                  id="name"
                                  name="project_name"
                                  placeholder="Name"
                                  value={project_name}
                                  onChange={handleChange}
                                /> */}
                    {/* <input type="file" onChange={handleChange} /> */}
                    {/* {
                  is_true_progress ? 
                  <CircularProgressbar value={percentage} text={`${percentage}%`} />
                  : ""
                 } */}

                    {is_true_progress ? (
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      />
                    ) : (
                      ""
                    )}
                    {/* <CircularProgressbar value={percentage} text={`${percentage}%`} />  */}
                    {/* <DropFileInput
                     onFileChange={(files) => onFileChange(files)}
                      
                    /> */}
                    <DropFileInput onFileChange={handleFileChange} />
                  </div>
                </div>
                {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                <div className="button">
                  <button id="close" onClick={CloseProject} className="cancel">
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

          {/* POP UP 2 ENDS here */}

          <div className="content">
            <h2 style={{ fontSize: "25px" }}>{allprojectdata.name}</h2>

            <div style={{}} className="row">
              {/* folders... */}
              {allprojectdata.children
                ? allprojectdata.children.map(
                    (item) => (
                      //  <div  className="row">
                      <>
                        <div to={{}}>
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
                    )

                    // </div>
                  )
                : null}
              {/* Filess..... */}
              {allprojectdata.files
                ? allprojectdata.files.map(
                    (item) => (
                      //  <div  className="row">
                      <>
                        {/* <div
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
                        {/* </div> */}
                        {/* </div> */}
                        <div
                          style={{}}
                          className="col-lg-1 col-sm-2 col-md-2 mb-5 mt-5 w-100"
                        >
                          {/* <img
                            style={{
                              height: 130,
                              width: 80,
                              paddingTop: "40px",
                              paddingLeft: "10px",
                            }}
                            src={
                              ImageConfig[item.file.split(".")[1]] ||
                              ImageConfig["default"]
                            }
                            alt=""
                          /> */}
                          <a href={item.path_of_file} target="_blank">
                            {renderFileElement(item.path_of_file)}
                          </a>
                          {/* <div className="file-cards">
                      <div style={{}} className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5">
                        <div data={color} style={{ alignContent: "center" }} class="folder">

                          <div class="folder-inside" style={{ }}>


                          </div>

                        </div>

                      </div>

                    </div> */}
                          <h4
                            style={{
                              fontSize: 12,
                              textAlign: "center",
                              paddingTop: "35px",
                              paddingRight: "10px",
                            }}
                          >
                            {item.name}
                          </h4>
                          {/* <h4 style={{ textAlign: 'center', paddingTop: '40px' }}>{item.file.split('.')[1]}</h4> */}
                        </div>
                      </>
                    )

                    // </div>
                  )
                : null}
            </div>

            {/* PLUS BUTTON START */}

            <div
              data={color}
              className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6"
            >
              {/* <button
                data={color}
                type="file"
                className="header-content-btn1"
                onClick={AddProject}
              >
                +
              </button> */}

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

            {/* PLUS BUTTON END */}

            {/* <div className="row folder-name">
          <Link to="/amx/twodview" className="col-lg-2 col-sm-2 col-md-2">
            2D VIEW
          </Link>
          <Link to="/amx/threedview" className="col-lg-2 col-sm-2 col-md-2">
            3D VIEW
          </Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">DTM</Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">DSM</Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">NDVI</Link>
        </div> */}
            {/* <div data={color} className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6">
              <button
                data={color}
                type="file"
                className="header-content-btn1"
                onClick={AddProject}
              >
                +
              </button> */}

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
            {/* </div> */}
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default SubChild;
