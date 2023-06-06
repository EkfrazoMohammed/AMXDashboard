import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
// import { toast } from "react-toastify";

import "../projects/Project.css"
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "views/DropFileInput/DropFileInput";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ImageConfig } from "views/DropFileInput/config/ImageConfig";
// import "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/projects/TwoDview.css"
import { ToastContainer, toast } from 'react-toastify';
import drone from "../../assets/drone.png"

const folder_list = [
  {
    'project_name': '2D view',
    'folder_color': '#D65A47',
    'link': '/amx/twodview'
  },
  {
    'project_name': '3D view',
    'folder_color': 'rgb(64,153,173)',
    'link': '/amx/threedview'

  },
  {
    'project_name': 'DTM',
    'folder_color': 'rgb(239,185,93)',
    'link': '/amx/processdata'


  },
  {
    'project_name': 'DSM',
    'folder_color': 'rgb(55,109,236)',
    'link': '/amx/processdata'

  },
  {
    'project_name': 'NDVI',
    'folder_color': '#D65A47',
    'link': '/amx/processdata'

  }

]




function SubChild() {

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
  setImageData(files)
}
// "https://v2.convertapi.com/upload",

const UploadFile = async() => {
  console.log("imageData",imageData[0])
  const fromData = new FormData()
  fromData.append('file',imageData[0])
  console.log(fromData,'newFile====>')
  try {
      await axios.post(
        "https://fibregrid.amxdrones.com/dronecount/projects/27/folders/270/upload/",fromData
      ).then(res => {
        console.log(res,'res=======>')
        toast.success('New project added !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          icon: <img src={drone}/>
          });
          setaddprojectopen(false)
 
      })
      .catch(err => {
        if (err.response) {
            toast.error('Server down, Please try agin later !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <img src={drone}/>
                });
                setaddprojectopen(false)
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






  const [allprojectdata, SetAllProjectData] = React.useState({});
  let location = useLocation();

  useEffect(() => {
    GetAllProjectsData()
  }, [])

  let GetAllProjectsData = async () => {
    console.log(location.state.all_data, 'childProject')
    SetAllProjectData(location.state.all_data)
  }

  let [state, setState] = useState({
    project_name: "",
  });
  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const AddProject = (name) => {
    console.log("AddProject======")
    setaddprojectopen(true)
  };
  const CloseProject = (name) => {
    setaddprojectopen(false)
  };



  const OKProject = (name) => {
    setaddprojectopen(false)
  };
  console.log(addprojectopen, 'addprojectopen====>')

  // pop up endd=====

  let { project_name } = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
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
  const [popup, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popup);
  };
  const ClosePopup = () => {
    setPopup(false);
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />

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
            <div className="popup-outer" >
              <div className="popup-box">
                {/* <i id="close" className="bx bx-x close"></i> */}
                <FontAwesomeIcon onClick={CloseProject} className="close" icon={faClose} />
                <div className="profile-text" >
                  {/* <img src="profile.jpg" alt="" />  */}
                  <div className="text">
                    <span className="name" >Upload files</span>

                 
                    {/* <span className="profession">Web & Web Designer</span> */}
                  </div>
                </div>
                {/* <form action="#"> */}
                {/* <form > */}

                <div className="wraper-dashboard"  >
                  <div className="wraper-card-content-dashboard" >
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
                    <DropFileInput
                      onFileChange={(files) => onFileChange(files)}
                    />

                  </div>


                </div>
                {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                <div className="button">
                  <button id="close" onClick={CloseProject} className="cancel">Cancel</button>
                  <button className="send" onClick={UploadFile} >Upload</button>

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
              {allprojectdata.children ? allprojectdata.children.map((item) =>
                //  <div  className="row">
                <>
                  <div to={{}}>
                    <div className="file-cards">
                      <div style={{}} className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5">
                        {/* <div style={{justifyContent:"center"}} className="col-lg-2 col-sm-12 col-md-3"> */}
                        <div data={color} style={{ alignContent: "center" }} class="folder">

                          <div class="folder-inside" style={{}}>


                          </div>

                        </div>

                        {/* </div> */}

                      </div>

                    </div>
                    <h4 style={{ fontSize: 12, textAlign: 'center', paddingTop: '10px' }}>{item.name}</h4>

                  </div>
                </>

                // </div>
              )
                :
                null
              }
              {/* Filess..... */}
              {allprojectdata.files ? allprojectdata.files.map((item) =>
                //  <div  className="row">
                <>
                  <div to={{}}>
                    <img style={{ height: 130, width: 80, paddingTop: '40px', paddingLeft: '10px' }} src={ImageConfig[item.file.split('.')[1]] || ImageConfig['default']} alt="" />

                    {/* <div className="file-cards">
                      <div style={{}} className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5">
                        <div data={color} style={{ alignContent: "center" }} class="folder">

                          <div class="folder-inside" style={{ }}>


                          </div>

                        </div>

                      </div>

                    </div> */}
                    <h4 style={{ fontSize: 12, textAlign: 'center', paddingTop: '35px', paddingRight: '10px' }}>{item.name}</h4>
                    {/* <h4 style={{ textAlign: 'center', paddingTop: '40px' }}>{item.file.split('.')[1]}</h4> */}

                  </div>
                </>

                // </div>
              )
                :
                null
              }



            </div>


            {/* PLUS BUTTON START */}

            <div data={color} className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6">
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